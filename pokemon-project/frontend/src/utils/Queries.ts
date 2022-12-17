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