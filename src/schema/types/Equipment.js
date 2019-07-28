import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Equipment {
    id: Int!,
    name: String
    details: String
    company: Company
  }

  extend type Query {
    readEquipment(id: Int!): Equipment
    equipment : [Equipment]
  }

  extend type Mutation {
    createEquipment( name:  String, details: String, company: Int): Int
    updateEquipment( id: Int!, name:  String, details: String, company: Int): Equipment
  }
`;

export const resolvers = {
  Query: {
    readEquipment: async (root, { id }, { models }) => models.Equipment.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    equipment: async (root, undefined, { models }) => models.Equipment.all(),
  },
  Mutation: {
    createEquipment: async (root, { name, details, company }, { models }) => {
      const equipment = await models.Equipment.create({
        name, details, company,
      });
      return equipment.id;
    },
    updateEquipment: async (root, {
      id, name, details, company,
    }, { models }) => {
      const equipment = await models.Equipment.update({
        id, name, details, company,
      });
      if (!equipment) {
        throw new Error('No equipment with that id');
      }
    },
  },
};
