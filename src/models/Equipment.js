import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('equipment').where({ id });
    if (items && items.length !== 0) return { ...items[0], company: (await knex.select().from('company').where({ id: items[0].company }))[0] };
    return null;
  },
  async all() {
    return knex.select().from('equipment')
      .then(items => items.map(async row => ({ ...row, company: (await knex.select().from('company').where({ id: row.company }))[0] })));
  },
  async create(data) {
    return knex.insert(data).into('equipment');
  },
  async update({
    id, name, details, company,
  }) {
    knex('equipment')
      .where({ id })
      .update({ name, details, company });
    return {
      id, name, details, company,
    };
  },
};
