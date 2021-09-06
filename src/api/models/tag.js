const db = require('../../config/db');

class Tag {
  constructor({
    id, valeur, createdAt, updatedAt,
  }) {
    this.id = id;
    this.valeur = valeur;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async find(query) {
    let tags = await db('tag').select().where(query);
    tags = tags.map((tag) => new Tag(tag));
    return tags;
  }

  static async findByIdAndUpdate(id, payload) {
    const updatedAt = new Date();
    const update = { ...payload, updatedAt };
    const rows = await db('tag').where({ id }).update(update);
    if (!rows) return null;
    const [tag] = await Tag.find({ id });
    return tag;
  }

  static async findByIdAndDelete(id) {
    const rows = await db('tag').where({ id }).del();
    if (!rows) return null;
    return new Tag({ id });
  }

  async insert() {
    this.createdAt = new Date();
    this.updatedAt = null;
    const toInsert = { ...this };
    await db('tag').insert(toInsert);
    const [{ id }] = await db('tag').select('id')
      .where({ valeur: toInsert.valeur });
    this.id = id;
    return this;
  }
}

module.exports = Tag;
