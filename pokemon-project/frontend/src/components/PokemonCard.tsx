import React from "react"

type PokemonProps ={
    id: number,
    num: number,
    name: String,
    type: [String],
    weaknesses: [String],
    img: string
}

export default function PokemonCard({id, num, name, type, weaknesses, img}: PokemonProps){

    return (
        <div style={{
            height: "640px", 
            width: "200px",
            fontFamily: "Verdana, sans-seriff",
            margin: "20px",
            }}>

            <h1>{name}</h1>
            <img src={img} style={{
                height: "150px",
                width: "150px"
            }}/>

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
    )

}