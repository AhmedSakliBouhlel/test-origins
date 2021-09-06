const db = require('../../config/db');

class VideoTagAssociation {
  constructor({
    id, idTag, idVideo, createdAt, updatedAt,
  }) {
    this.id = id;
    this.idTag = idTag;
    this.idVideo = idVideo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async find(query) {
    let videoTagAssociations = await db('videoTagAssociation').select().where(query);
    videoTagAssociations = videoTagAssociations.map(
      (videoTagAssociation) => new VideoTagAssociation(videoTagAssociation),
    );
    return videoTagAssociations;
  }

  static async findByIdAndDelete(id) {
    const rows = await db('videoTagAssociation').where({ id }).del();
    if (!rows) return null;
    return new VideoTagAssociation({ id });
  }

  async insert() {
    this.createdAt = new Date();
    this.updatedAt = null;
    const toInsert = { ...this };
    await db('videoTagAssociation').insert(toInsert);
    const [{ id }] = await db('videoTagAssociation').select('id')
      .where({ idVideo: toInsert.idVideo, idTag: toInsert.idTag });
    this.id = id;
    return this;
  }
}

module.exports = VideoTagAssociation;
