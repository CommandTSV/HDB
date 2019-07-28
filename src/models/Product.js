import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('product').where({ id });
    if (items && items.length !== 0) return { ...items[0], batch: (await knex.select().from('batch').where({ id: items[0].batch }))[0] };
    return null;
  },
  async findByProduct({ product }) {
    return knex.select().from('product_product').where({ product }).join('product', 'product.id', '=', 'product_product.component')
      .then(items => items.map(async row => this.findById({ id: row.component })));
  },
  async all() {
    return knex.select().from('product')
      .then(items => items.map(async row => ({ ...row, batch: (await knex.select().from('batch').where({ id: row.batch }))[0] })));
  },
  async create(data) {
    return knex.insert(data).into('product');
  },
  async update({
    id, name, product, kind,
  }) {
    await knex('product')
      .where({ id })
      .update({ name, product, kind });
    return this.findById({ id });
  },
};
