import { gql } from "@apollo/client";   


// login will accept email and password
// in return we expect users data and token
export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password)  {
            token
            user {
                _id
                username
            }
        }
    }


`;