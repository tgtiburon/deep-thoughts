// import the gql tagged template function

const { gql } = require("apollo-server-express");

// create our typeDefs

// retrieve an array of [Thought]
// thoughts(username: String) allows us to pass a parameter

// thought(_id: ID!): Thought  ! means the data must exist
// We don't need this for thought's because with nothing specified
// it will just return all thoughts
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;
// Auth must return a token but can also contain
// any other user data

// explort the typeDefs
module.exports = typeDefs;
