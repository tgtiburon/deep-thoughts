const { User, Thought } = require("../models");
// built in error handling from GraphQL
const { AuthenticationError } = require('apollo-server-express');
// import the jsonwebtoken config
const { signToken }  = require('../utils/auth');


const resolvers = {
  // we pass in parent as a placeholder so we can access username
  // we use ternary operator  if there is a username return that object
  // else return an empty object.

  Query: {
    // get all thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};

      // if we pass username it finds that users thoughts
      // otherwise it returns all
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // get thought by id
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async (parent, {}) => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },

    // get user by username
  },
  Mutation: {
    // create a new user with passed args
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });


        if(!user)   {
            throw new AuthenticationError('Incorrect credentials.');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");

        }
        const token = signToken(user);

        return { token, user }; 
    },
  },
};

module.exports = resolvers;
