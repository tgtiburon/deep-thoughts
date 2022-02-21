const express = require("express");

// import apollo server
const { ApolloServer } = require("apollo-server-express");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

// Connect o db through connection.js
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
  });
  //Start the Apollo Server
  await server.start();

  // integrate our Apollo Server with the Express application as middlware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  // Creates a special /graphql endpoint on our express server
  console.log(`Use GraphQL at http://localhost: ${PORT}${server.graphqlPath}`);
};

//Initialize the apollo server
startServer();

// setup express to use urls
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// once connected to db start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
