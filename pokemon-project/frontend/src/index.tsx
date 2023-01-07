import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemon: offsetLimitPagination(), //egentlig unødvendig da queryen "pokemon" ikke brukes.
        pokemonBySearch: offsetLimitPagination(),
      }
    }
  }
})

const client = new ApolloClient ({
  uri: "http://localhost:5001/pokemon",
  cache,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
