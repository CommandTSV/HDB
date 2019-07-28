import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('kind').where({ id });
    if (items && items.length !== 0) return items[0];
    return null;
  },
  async all() {
    return knex.select().from('kind');
  },
  async create(data) {
    return knex.insert(data).into('kind');
  },
  async update({ id, name }) {
    knex('kind')
      .where({ id })
      .update({ name });
    return { id, name };
  },
};
