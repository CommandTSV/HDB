import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Company {
    id: Int!,
    country: String
    city: String
    address: String
    vat: String
    name: String
  }

  extend type Query {
    readCompany(id: Int!): Company
    companys : [Company]
  }

  extend type Mutation {
    createCompany( code:  String, country: String
      city: String
      address: String
      vat: String
      name: String): Int
    updateCompany(id: Int!, country: String
      city: String
      address: String
      vat: String
      name: String): Company
  }
`;

export const resolvers = {
  Query: {
    readCompany: async (root, { id }, { models }) => models.Company.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    companys: async (root, undefined, { models }) => models.Company.all(),
  },
  Mutation: {
    createCompany: async (root, {
      country,
      city,
      address,
      vat,
      name,
    }, { models }) => {
      const company = await models.Company.create({
        country,
        city,
        address,
        vat,
        name,
      });
      return company.id;
    },
    updateCompany: async (root, {
      id, country,
      city,
      address,
      vat,
      name,
    }, { models }) => {
      const company = await models.Company.update({
        id,
        country,
        city,
        address,
        vat,
        name,
      });
      if (!company) {
        throw new Error('No company with that id');
      }
    },
  },
};
