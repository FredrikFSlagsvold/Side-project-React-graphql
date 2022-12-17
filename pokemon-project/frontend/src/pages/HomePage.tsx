import { useQuery, gql } from "@apollo/client"
import PokemonCard from "../components/PokemonCard"
import { InView } from "react-intersection-observer";
import { GET_ALL_POKEMON } from '../utils/Queries';


type PokemonProps ={
    id: number
    num: number
    name: String
    type: [String]
    weaknesses: [String]
    img: string
}

export default function HomePage(){

    const { loading, error, data, fetchMore } = useQuery(GET_ALL_POKEMON, {
        variables: {
            offset: 0,
            limit: 20
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
                
            {data?.pokemon?.map(({id, name, num, type, weaknesses, img}: PokemonProps) => { 
                return(
                    <PokemonCard id={id} num={num} name={name} type={type} weaknesses={weaknesses} img={img}/>
                )})}
            {(
                <InView onChange={async (inView) => {
                    const currentLength = data.pokemon.length || 0;
                    if (inView) {
                        await fetchMore({
                            variables: {
                                offset: currentLength,
                                limit: 20,
                            }
                        })
                    }
                }}
                />
            )}

        </div>
    )
}