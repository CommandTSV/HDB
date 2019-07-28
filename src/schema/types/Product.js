import { gql } from 'apollo-server-koa';

export const typeDef = gql`
enum State {
  made
  sold
  resold
  used
  rejected
  recycled
}
type Product {
    id: Int!
    when: String!
    batch: Batch!
    state: State!
  }
 

  extend type Query {
    readProduct(id: Int!): Product
    products : [Product]
    productProducts(product: Int!): [Product]
  }

  extend type Mutation {
    createProduct(batch: Int!, state: State!): Int
    updateProduct(id: Int!, batch: Int!, state: State!): Product
  }
`;

export const resolvers = {
  Query: {
    readProduct: async (root, { id }, { models }) => models.Product.findById({ id }),
    // eslint-disable-next-line no-shadow-restricted-names
    products: async (root, undefined, { models }) => models.Product.all(),
    productProducts: async (root, { product }, { models }) => models.Product
      .findByProduct({ product }),
  },
  Mutation: {
    createProduct: async (root, { batch, state }, { models }) => {
      const product = await models.Product.create({
        batch, state,
      });
      return product.id;
    },
    updateProduct: async (root, {
      id, batch, state,
    }, { models }) => {
      const product = await models.Product.update({
        id, batch, state,
      });
      if (!product) {
        throw new Error('No product with that id');
      }
    },
  },
};
