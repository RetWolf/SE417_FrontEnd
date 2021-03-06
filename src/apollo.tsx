import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "https://se417-api.mattconway.dev/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
