import { ApolloServer } from '@apollo/server';
import { gql } from '@apollo/client';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Apollo Server is up & running on /graphql',
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: Request) {
  const response = await handler(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function POST(request: Request) {
  const response = await handler(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}
