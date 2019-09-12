import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import CreateView from "./create";
import ListView from "./list";
import EditView from "./edit";

import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4567/graphql",
  link: createHttpLink({ uri: 'http://localhost:4567/graphql' }),
  cache: new InMemoryCache(),
  defaultOptions: {}
});

function App() {
  return (
      <div className="App">
        <ApolloProvider client={client}>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/create/">Create</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={ListView} />
              <Route path="/create/" component={CreateView} />
              <Route path="/edit/:bookId" component={EditView} />
            </div>
          </Router>
        </ApolloProvider>
      </div>
  );
}

export default App;
