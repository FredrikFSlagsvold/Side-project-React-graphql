import { useQuery, gql } from "@apollo/client"
import PokemonCard from "../components/PokemonCard"
import { InView } from "react-intersection-observer";
import { GET_ALL_POKEMON, POKEMON_BY_SEARCH } from '../utils/Queries';

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

    const { loading, error, data, fetchMore } = useQuery(POKEMON_BY_SEARCH, {
        variables: {
            text: text,
            filter: filter, //name
            offset: offset, //0
            limit: limit //15
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>

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