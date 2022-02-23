import React from "react";

import {
  ApolloClient, // constructor function to help initialize connection to GraphQL API server
  InMemoryCache, // cache api response data to perform requests efficiently
  ApolloProvider, // Provides data to other components
  createHttpLink, // middleware for outbound network requests
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';

// renamed it as Router to be easier to work with
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

// Link to GraphQL
const httpLink = createHttpLink({
  uri: "/graphql",
});

//Use setContext to retrieve the token from local storage;
// Also sets the HTTP headers of every request to include it
// we used '_' as the first parameter because header has to be
// 2nd
const authLink = setContext((_,{ headers })=> {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, authorization: token ? `Bearer ${token}` : '', 
    },
  };
});

// Instantiate ApolloClient and connect to the graphql
// We installed authLink to provide token in every request

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // Make a new cache item
  cache: new InMemoryCache(),
});

// JSX tags will have access to the server's api data through the
// client we setup
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
