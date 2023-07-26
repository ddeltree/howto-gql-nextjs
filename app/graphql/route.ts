import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';

import resolvers from '@/graphql/resolvers/resolvers';
import mutations from '@/graphql/schemas/mutations';
import queries from '@/graphql/schemas/queries';

const server = new ApolloServer({
  resolvers,
  typeDefs: [queries, mutations],
  introspection: true,
  plugins: [ApolloServerPluginUsageReportingDisabled()],
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

export async function OPTIONS() {
  const response = new Response(undefined, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  return response;
}
