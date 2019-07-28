import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('batch').where({ id });
    if (items && items.length !== 0) return { ...items[0], company: (await knex.select().from('company').where({ id: items[0].company }))[0] };
    return null;
  },
  async all() {
    return knex.select().from('batch')
      .then(items => items.map(async row => ({ ...row, company: (await knex.select().from('company').where({ id: row.company }))[0] })));
  },
  async create(data) {
    return knex.insert(data).into('batch');
  },
  async update({
    id, name, code, company,
  }) {
    knex('batch')
      .where({ id })
      .update({ name, code, company });
    return {
      id, name, code, company,
    };
  },
};
