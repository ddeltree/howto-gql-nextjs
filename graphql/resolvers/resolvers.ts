/** Typed resolvers */
import { Resolvers } from '../types/graphql';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'Apollo Server is up & running on /graphql',
  },
  Mutation: {
    doSideEffect: () => true,
  },
};
export default resolvers;
