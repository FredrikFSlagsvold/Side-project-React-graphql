import { useQuery } from "@apollo/client"
import PokemonCard from "../components/PokemonCard"
import { InView } from "react-intersection-observer";
import { POKEMON_BY_SEARCH } from '../utils/Queries';
import { useEffect } from "react";

type MovieSearchProps = {
    text: String,
    filter: String,
    offset: number,
    limit: number
}


type PokemonProps ={
    id: number
    num: number
    name: String
    type: [String]
    weaknesses: [String]
    img: string
}

export default function PokemonPage({text, filter, offset, limit}: MovieSearchProps){

    //Hvis man skal bruke GET_ALL_POKEMON må man bytte fra data.pokemonBySearch til data.pokemon (fieldet tilhørende querien). 
    //Det gjelder også for inView-delen for at pagineringen skal fungere.

    const { loading, error, data, refetch, fetchMore } = useQuery(POKEMON_BY_SEARCH, {
        variables: {
            text: text,
            filter: filter,
            offset: offset,
            limit: limit
        }
    });

    useEffect(() => {
        refetch()
    }, [text])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>

    console.log(data)

    return (

        <div style={{
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            width: "100%"
            }}>
                
            {data?.pokemonBySearch?.map(({id, name, num, type, weaknesses, img}: PokemonProps) => { 
                return(
                    <PokemonCard id={id} num={num} name={name} type={type} weaknesses={weaknesses} img={img}/>
                )})}
            {(
                <InView onChange={async (inView) => {
                    const currentLength = data.pokemonBySearch.length || 0;
                    if (inView) {
                        await fetchMore({
                            variables: {
                                offset: currentLength,
                                limit: limit,
                                text: text,
                                filter: filter
                            }
                        })
                    }
                }}
                />
            )}

        </div>
    )
}