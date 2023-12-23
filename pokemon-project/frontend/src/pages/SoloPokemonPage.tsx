import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SINGLE_POKEMON_BY_NAME } from '../utils/Queries';

type NextEvolution = {
    num: string;
    name: string;
  };
  
  type PokemonProps = {
    id: number;
    num: string;
    name: string;
    type: string[];
    weaknesses: string[];
    img: string;
    next_evolution: NextEvolution[];
  };

export default function SoloPokemonPage() {
  const { pokemonName } = useParams(); //Henter ut /:pokemonName-verdien. F eks hvis verdien er pokemon/1 blir 1 hentet ut. Denne iden eller navnet brukes så i en ny query der man kan hente ut mer informasjon.

  const { data, loading, error } = useQuery(SINGLE_POKEMON_BY_NAME, {
    variables: { name: pokemonName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // If data is loaded, access the singlePokemonByName field in the response
  const pokemon : PokemonProps = data?.singlePokemonByName;


  //Endre på stylingen

  return (
    <div style={{ fontFamily: "Verdana, sans-seriff" }}>

        <Link to="/" style={{ marginTop: '20px', textDecoration: 'none' }}>
            <button style={{ padding: '10px 20px', fontSize: '16px' }}>
            Return
            </button>
        </Link>
        
        <h1 style={{textAlign: "center"}}>Pokémon Details</h1>

            <div style={{display: "flex", justifyContent: "center"}}>
                {pokemon ? (
                    <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.img} alt={pokemon.name} style={{ width: '250px', height: 'auto' }}/>
                    <p>Number: {pokemon.num}</p>
                    <p>Type: {pokemon.type.join(', ')}</p>
                    <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
                    {pokemon.next_evolution && (
                        <div>
                        <h3>Next Evolution:</h3>
                        <ul>
                            {pokemon.next_evolution.map((evo: NextEvolution) => (
                            <li key={evo.num}>
                                {evo.name} (#{evo.num})
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>
                ) : (
                    <p>Pokémon not found.</p>
                )}

            </div>
    </div>
  );
}
