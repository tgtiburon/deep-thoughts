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

// template literal to query user
export const QUERY_USER = gql `
    query user($username: String!) {
        user(username: $username)  {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
            }
        }
    }

`;

// Query all user data
export const QUERY_ME = gql `
    {
        me {
            _id
            username
            email
            friendCount
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
                reactions {
                    _id
                    createdAt
                    reactionBody
                    username
                }
            }
            friends {
                _id
                username
            }
        }
    }
`;

// Basic info about user for homepage
export const QUERY_ME_BASIC = gql `
    {
        me {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
        }
    }

`;