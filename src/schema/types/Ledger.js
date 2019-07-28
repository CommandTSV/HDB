import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Ledger {
    id: Int
    Product: Product!
    when: String
    state: State
  }

  extend type Query {
    getLedger(product: Int!): [Ledger]
  }

  extend type Mutation {
    storeLedger(product: Int!, state: String!): Int
  }
`;

export const resolvers = {
  Query: {
    getLedger: async (root, { product }, { models }) => models.Ledger.get({ product }),
  },
  Mutation: {
    storeLedger: async (root, {
      product,
      state,
    }, { models }) => models.Ledger.store({
      product,
      state,
    }),
  },
};
