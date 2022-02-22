import React from 'react';


import {
  ApolloClient, // constructor function to help initialize connection to GraphQL API server
  InMemoryCache,// cache api response data to perform requests efficiently
  ApolloProvider, // Provides data to other components
  createHttpLink,// middleware for outbound network requests
} from '@apollo/client';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';


// Link to GraphQL 
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Instantiate ApolloClient and connect to the graphql
const client = new ApolloClient({
  link: httpLink,
  // Make a new cache item
  cache: new InMemoryCache(),
});


// JSX tags will have acess to the server's api data through the 
// client we setup
function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
      </ApolloProvider>
  );
}

export default App;
