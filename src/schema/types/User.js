import { gql } from 'apollo-server-koa';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const typeDef = gql`
  enum Role {
    user
    admin
    superadmin
  }
  type User {
    id: Int
    password: String!
    username: String
    domain: Int
    firstName: String
    lastName: String
    role: Role
  }

  extend type Query {
    getUser(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    login(domain: Int, username: String!, password: String!): String
    signUp(username:  String!, password: String!, domain: Int, firstName: String, lastName: String, role: String): String
  }
`;

export const resolvers = {
  Query: {
    getUser: async (root, { id }, { models }) => models.User.findById(id),
    // eslint-disable-next-line no-shadow-restricted-names
    users: async (root, undefined, { models }) => models.User.all(),
  },
  Mutation: {
    signUp: async (root, {
      username,
      password,
      domain,
      firstName,
      lastName,
      role = 'user',
    }, { models }) => {
      const user = await models.User.create({
        username,
        password: await bcrypt.hash(password, 10),
        domain,
        firstName,
        lastName,
        role,
      });

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    },
    login: async (root, { domain, username, password }, { models }) => {
      const user = await models.User.login({ domain, username });

      if (!user) {
        throw new Error('No user with that id');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    },
  },
};
