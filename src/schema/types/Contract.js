import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Contract {
    id: Int!,
    code: String
    when: String
    finish: String
    first: Company
    second: Company
  }

  extend type Query {
    readContract(id: Int!): Contract
    contracts : [Contract]
  }

  extend type Mutation {
    createContract( code:  String, when: String, finish: String, first: Int, second: Int): Int
    updateContract( id: Int!, code:  String, when: String, finish: String, first: Int, second: Int): Contract
  }
`;

export const resolvers = {
  Query: {
    readContract: async (root, { id }, { models }) => models.Contract.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    contracts: async (root, undefined, { models }) => models.Contract.all(),
  },
  Mutation: {
    createContract: async (root, { code, when, finish }, { models }) => {
      const contract = await models.Contract.create({
        code, when, finish,
      });
      return contract.id;
    },
    updateContract: async (root, {
      id, code, when, finish,
    }, { models }) => {
      const contract = await models.Contract.update({
        id, code, when, finish,
      });
      if (!contract) {
        throw new Error('No contract with that id');
      }
    },
  },
};
