import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Batch {
    id: Int!,
    name: String
    code: String
    company: Company
  }

  extend type Query {
    readBatch(id: Int!): Batch
    batches : [Batch]
  }

  extend type Mutation {
    createBatch( name:  String, code: String, company: Int): Int
    updateBatch( id: Int!, name:  String, code: String, company: Int): Batch
  }
`;

export const resolvers = {
  Query: {
    readBatch: async (root, { id }, { models }) => models.Batch.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    batches: async (root, undefined, { models }) => models.Batch.all(),
  },
  Mutation: {
    createBatch: async (root, { name, code, company }, { models }) => {
      const batch = await models.Batch.create({
        name, code, company,
      });
      return batch.id;
    },
    updateBatch: async (root, {
      id, name, code, company,
    }, { models }) => {
      const batch = await models.Batch.update({
        id, name, code, company,
      });
      if (!batch) {
        throw new Error('No batch with that id');
      }
    },
  },
};
