import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const users = await knex.select().from('user').where({ id });
    if (users && users.length !== 0) return users[0];
    return null;
  },
  async login({ domain, username }) {
    const users = await knex.select().from('user').where({ domain, username });
    if (users && users.length !== 0) return users[0];
    return null;
  },
  async all() {
    return knex.select().from('user');
  },
  async create(data) {
    return knex.insert(data).into('user');
  },

};
