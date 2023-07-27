import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServerPluginUsageReportingDisabled } from '@apollo/server/plugin/disabled';

import queryResolvers from '@/graphql/resolvers/queryResolvers';
import mutationResolvers from '@/graphql/resolvers/mutationResolvers';
import mutations from '@/graphql/schemas/mutations';
import queries from '@/graphql/schemas/queries';

const server = new ApolloServer({
  resolvers: [queryResolvers, mutationResolvers],
  typeDefs: [queries, mutations],
  introspection: true,
  plugins: [ApolloServerPluginUsageReportingDisabled()],
});

const handler = startServerAndCreateNextHandler(server);
export const GET = handler;
export const POST = handler;
