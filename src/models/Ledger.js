import knex from '../sql/connector';

export default {
  async get({ product }) {
    return knex.select().from('ledger').where({ product }).orderBy('when', 'asc');
  },
  async store(data) {
    return knex.insert(data).into('ledger');
  },
};
