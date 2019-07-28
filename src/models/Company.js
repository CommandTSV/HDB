import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('company').where({ id });
    if (items && items.length !== 0) return items[0];
    return null;
  },
  async all() {
    return knex.select().from('company');
  },
  async create(data) {
    return knex.insert(data).into('company');
  },
  async update({
    id, country,
    city,
    address,
    vat,
    name,
  }) {
    knex('company')
      .where({ id })
      .update({
        country,
        city,
        address,
        vat,
        name,
      });
    return {
      id,
      country,
      city,
      address,
      vat,
      name,
    };
  },
};
