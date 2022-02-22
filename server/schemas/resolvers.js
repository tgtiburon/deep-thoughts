const { User, Thought } = require("../models");
// built in error handling from GraphQL
const { AuthenticationError } = require("apollo-server-express");
// import the jsonwebtoken config
const { signToken } = require("../utils/auth");

const resolvers = {
  // we pass in parent as a placeholder so we can access username
  // we use ternary operator  if there is a username return that object
  // else return an empty object.

  Query: {
    // Get me
    me: async (parent, args, context) => {
      // Is the user authorized
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    // get all users
    users: async () => {
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

    // get user by username
  },
  Mutation: {
    // create a new user with passed args
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
        return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $push: { reactions: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );
        return updatedThought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // looks for incoming friendId and adds to friends[] 
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // addToSet so we don't get dupes
          { $addToSet: { friends: friendId } },
          { new: true } 
        ).populate('friends');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials.");
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
