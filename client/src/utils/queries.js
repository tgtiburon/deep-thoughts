import { gql } from '@apollo/client';



// Template literal to query thoughts
export const QUERY_THOUGHTS = gql `
    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }

`;

// Template literal to query a single thought
export const QUERY_THOUGHT = gql`
    query thought($id: ID!) {
        thought(_id: $id) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }



`;