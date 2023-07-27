/** Typed resolvers */
import { Resolvers } from '../types/graphql';

const resolvers: Resolvers = {
  Mutation: {
    doSideEffect: () => true,
  },
};
export default resolvers;
