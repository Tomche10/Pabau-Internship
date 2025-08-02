import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AppRouter from "./AppRouter";
import "./App.css";

function App() {
  const client = new ApolloClient({
    uri: "https://graphql-api-brown.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
