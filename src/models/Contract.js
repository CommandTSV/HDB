import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('contract').where({ id });
    if (items && items.length !== 0) return { ...items[0], first: (await knex.select().from('company').where({ id: items[0].first }))[0], second: (await knex.select().from('company').where({ id: items[0].second }))[0] };
    return null;
  },
  async all() {
    return knex.select().from('contract')
      .then(items => items.map(async row => ({ ...row, first: (await knex.select().from('company').where({ id: row.first }))[0], second: (await knex.select().from('company').where({ id: row.second }))[0] })));
  },
  async create(data) {
    return knex.insert(data).into('contract');
  },
  async update({
    id, code, when, finish,
  }) {
    knex('contract')
      .where({ id })
      .update({ code, when, finish });
    return {
      id, code, when, finish,
    };
  },
};
