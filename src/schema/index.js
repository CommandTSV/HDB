import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-koa';
import merge from 'lodash/merge';
import { typeDef as User, resolvers as UserResolvers } from './types/User';
import { typeDef as Kind, resolvers as KindResolvers } from './types/Kind';
import { typeDef as Material, resolvers as MaterialResolvers } from './types/Material';
import { typeDef as Contract, resolvers as ContractResolvers } from './types/Contract';
import { typeDef as Company, resolvers as CompanyResolvers } from './types/Company';
import { typeDef as Equipment, resolvers as EquipmentResolvers } from './types/Equipment';
import { typeDef as Batch, resolvers as BatchResolvers } from './types/Batch';
import { typeDef as Product, resolvers as ProductResolvers } from './types/Product';
import { typeDef as Ledger, resolvers as LedgerResolvers } from './types/Ledger';


const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    null: Boolean
  }
`;

const SchemaDefinition = gql`
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
};

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    User,
    Kind,
    Material,
    Contract,
    Company,
    Equipment,
    Batch,
    Product,
    Ledger,
  ],
  resolvers: merge(
    resolvers,
    UserResolvers,
    KindResolvers,
    MaterialResolvers,
    ContractResolvers,
    CompanyResolvers,
    EquipmentResolvers,
    BatchResolvers,
    ProductResolvers,
    LedgerResolvers,
  ),
});
