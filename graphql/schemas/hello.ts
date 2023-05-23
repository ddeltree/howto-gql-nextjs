import { gql } from '@apollo/client';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
export default typeDefs;
