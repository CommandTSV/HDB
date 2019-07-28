import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Material {
    id: Int!
    name: String!
    kind: Kind!
    quantity: String
    contract: Contract
  }


  extend type Query {
    readMaterial(id: Int!): Material
    materials : [Material]
    productMaterials(product: Int!): [Material]
  }

  extend type Mutation {
    createMaterial(name: String!, kind: Int!, contract: Int): Int
    updateMaterial(id: Int!, name:  String, contract: Int, kind: Int): Material
  }
`;

export const resolvers = {
  Query: {
    readMaterial: async (root, { id }, { models }) => models.Material.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    materials: async (root, undefined, { models }) => models.Material.all(),
    productMaterials: async (root, { product }, { models }) => models.Material
      .findByProduct({ product }),
  },
  Mutation: {
    createMaterial: async (root, { name, kind, contract }, { models }) => {
      const material = await models.Material.create({
        name, kind, contract,
      });
      return material.id;
    },
    updateMaterial: async (root, {
      id, name, kind, contract,
    }, { models }) => {
      const material = await models.Material.update({
        id, name, kind, contract,
      });
      if (!material) {
        throw new Error('No material with that id');
      }
    },
  },
};
