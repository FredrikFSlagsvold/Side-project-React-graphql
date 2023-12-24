import React from "react"
import { Link } from "react-router-dom"
import '../styles/PokemonStyles.css';


type PokemonProps ={
    id: number,
    num: number,
    name: String,
    type: String[],
    weaknesses: String[],
    img: string
}

export default function PokemonCard({id, num, name, type, weaknesses, img}: PokemonProps){

    return (
        <div className="pokemonCard">

            <Link to={`/pokemon/${name}`} className="pokemonLink">
                <div>

                    <h1>{name}</h1>
                    <img src={img} alt={"img"} className="pokemonCard img"/>

                    <h3>No: {num}</h3>
                    <h3>Types: </h3>
                    {type.map((type: String) => { 
                        return (
                            <p>{type}</p>
                    )})}

                    <h3>weaknesses: </h3>
                    {weaknesses.map((weakness: String) => {
                        return (
                            <p>{weakness}</p>
                    )})}
                </div>
            </Link>
        </div>
    )

}