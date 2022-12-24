import { gql } from '@apollo/client';

export const GET_ALL_POKEMON = gql`
    query($offset: Int, $limit: Int){
        pokemon(offset: $offset, limit: $limit){
            id
            num
            name
            type
            weaknesses
            img
        }
    }
`;

export const POKEMON_BY_SEARCH = gql`
    query($offset: Int, $limit: Int, $filter: String, $text: String){
        pokemonBySearch(offset: $offset, limit: $limit, filter: $filter, text: $text){
        id
        num
        name
        type
        weaknesses
        img
        }
    }
`;

export const POKEMON_BY_TYPESEARCH = gql`
    query($offset: Int, $limit: Int, $type: String){
        pokemonByTypeSearch(offset: $offset, limit: $limit, type: $type){
        id
        num
        name
        type
        weaknesses
        img
        }
    }
`;