/** Typed resolvers */
import { Resolvers } from '../types/graphql';

const resolvers: Resolvers = {
  Query: {
    hello: () => 'Apollo Server is up & running on /graphql',
  },
};
export default resolvers;
