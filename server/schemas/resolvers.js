const { User, Thought } = require('../models');

const resolvers = {
    // we pass in parent as a placeholder so we can access username
    // we use ternary operator  if there is a username return that object
    // else return an empty object.


    Query: {
        // get all thoughts
        thoughts: async(parent, { username })=> {
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
        users: async(parent, { }) => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }

        // get user by username
    }
};



module.exports = resolvers;