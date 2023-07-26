import { gql } from '@apollo/client';

const queries = gql`
  type Query {
    hello: String!
  }
`;

export default queries;
