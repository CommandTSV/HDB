import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Kind {
    id: Int!
    name: String!
  }

  extend type Query {
    readKind(id: Int!): Kind
    kinds : [Kind]
  }

  extend type Mutation {
    createKind(name: String!): Int
    updateKind(id: Int!, name:  String!): Kind
  }
`;

export const resolvers = {
  Query: {
    readKind: async (root, { id }, { models }) => models.Kind.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    kinds: async (root, undefined, { models }) => models.Kind.all(),
  },
  Mutation: {
    createKind: async (root, { name }, { models }) => {
      const kind = await models.Kind.create({
        name,
      });
      return kind.id;
    },
    updateKind: async (root, { id, name }, { models }) => {
      const kind = await models.Kind.update({ id, name });
      if (!kind) {
        throw new Error('No kind with that id');
      }
    },
  },
};
