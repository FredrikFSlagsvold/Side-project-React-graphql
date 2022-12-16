import { useQuery, gql } from "@apollo/client"
import PokemonCard from "../components/PokemonCard"


type PokemonProps ={
    id: number
    num: number
    name: String
    type: [String]
    weaknesses: [String]
    img: string
}


const GET_ALL_POKEMON = gql`
{
    pokemon{
        id
        num
        name
        type
        weaknesses
        img
    }
}
`;

export default function HomePage(){

    const { loading, error, data } = useQuery(GET_ALL_POKEMON);

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
    </div>
    )
}