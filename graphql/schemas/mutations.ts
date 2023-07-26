import { gql } from '@apollo/client';

const mutations = gql`
  type Mutation {
    doSideEffect: Boolean!
  }
`;

export default mutations;
