'use client';
import { useQuery, gql } from '@apollo/client';

// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const GET_DATA = gql`
  query Query {
    hello
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main>
      <div>{data.hello}</div>
    </main>
  );
}
