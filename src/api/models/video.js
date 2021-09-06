const db = require('../../config/db');

class Video {
  constructor({
    id, nom, description, url, createdAt, updatedAt,
  }) {
    this.id = id;
    this.nom = nom;
    this.url = url;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async find(query) {
    let videos = await db('video').select().where(query);
    videos = videos.map((video) => new Video(video));
    return videos;
  }

  static async findByIdAndUpdate(id, payload) {
    const updatedAt = new Date();
    const update = { ...payload, updatedAt };
    const rows = await db('video').where({ id }).update(update);
    if (!rows) return null;
    const [video] = await Video.find({ id });
    return video;
  }

  static async findByIdAndDelete(id) {
    const rows = await db('video').where({ id }).del();
    if (!rows) return null;
    return new Video({ id });
  }

  static async findByTag(tagValue) {
    const [tag] = await db('tag').select().where({ valeur: tagValue });
    const videoTagAssociations = await db('videoTagAssociation').select().where({ idTag: tag.id });
    const videos = await Promise.all(videoTagAssociations.map(
      (videoTagAssociation) => db('video').select().where({ id: videoTagAssociation.idVideo }),
    ));
    return videos.map((video) => new Video({ ...video }));
  }

  async insert() {
    this.createdAt = new Date();
    this.updatedAt = null;
    const toInsert = { ...this };
    await db('video').insert(toInsert);
    const [{ id }] = await db('video').select('id')
      .where({ nom: toInsert.nom, description: toInsert.description, url: toInsert.url });
    this.id = id;
    return this;
  }
}

module.exports = Video;
