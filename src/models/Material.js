import knex from '../sql/connector';

export default {
  async findById({ id }) {
    const items = await knex.select().from('material').where({ id });
    if (items && items.length !== 0) return { ...items[0], kind: (await knex.select().from('kind').where({ id: items[0].kind }))[0], material: (await knex.select().from('contract').where({ id: items[0].contract }))[0] };
    return null;
  },
  async findByProduct({ product }) {
    return knex.select().from('material_product').where({ product }).join('material', 'material.id', '=', 'material_product.material')
      .then(items => items.map(async row => ({ ...row, kind: (await knex.select().from('kind').where({ id: row.kind }))[0], contract: (await knex.select().from('contract').where({ id: row.contract }))[0] })));
  },
  async all() {
    return knex.select().from('material')
      .then(items => items.map(async row => ({ ...row, kind: (await knex.select().from('kind').where({ id: row.kind }))[0], contract: (await knex.select().from('contract').where({ id: row.contract }))[0] })));
  },
  async create(data) {
    return knex.insert(data).into('material');
  },
  async update({
    id, name, material, kind,
  }) {
    await knex('material')
      .where({ id })
      .update({ name, material, kind });
    return this.findById({ id });
  },
};
