/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
process.env.POSTGRES_DATABASE = 'test_origins_tests';
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('knex');
const server = require('../../src/index');
const dbConfig = require('../../src/config/knexfile');

const db = knex(dbConfig);

chai.should();
chai.use(chaiHttp);

const video = {
  id: 1,
  nom: 'test',
  description: 'test',
  url: 'test',
};
const tag = {
  id: 1,
  valeur: 'test',
};

describe('VideoTagAssociation', () => {
  before(async () => {
    await db.schema.createTable('video', (table) => {
      table.increments();
      table.string('nom').notNullable();
      table.string('description');
      table.string('url').notNullable();
      table.timestamps();
    });
    await db.schema.createTable('tag', (table) => {
      table.increments();
      table.string('valeur').notNullable();
      table.timestamps();
    });
    await db.schema.createTable('videoTagAssociation', (table) => {
      table.increments();
      table.integer('idVideo', 10).unsigned().references('id').inTable('video')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('idTag', 10).unsigned().references('id').inTable('tag')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
    // Seeding the tables for the tests
    await db('video').insert(video);
    await db('tag').insert(tag);
  });
  describe('/GET VideoTagAssociation', () => {
    it('it should return an empty array', (done) => {
      chai.request(server).get('/api/video-tag-association/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          res.body.should.be.eql([]);
          done();
        });
    });
  });

  describe('/POST VideoTagAssociation', () => {
    it('it should get an object VideoTagAssociation', (done) => {
      const videoTagAssociation = {
        idTag: tag.id,
        idVideo: video.id,
      };
      chai.request(server).post('/api/video-tag-association/').send(videoTagAssociation)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.idTag.should.be.eql(1);
          res.body.idVideo.should.be.eql(1);
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/POST VideoTagAssociation', () => {
    it('it should get a 400 response', (done) => {
      // Wrong tag schema
      const videoTagAssociation = {
        idTag: tag.id,
      };
      chai.request(server).post('/api/video-tag-association/').send(videoTagAssociation)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/DELETE VideoTagAssociation', () => {
    it('it should get an object VideoTagAssociation', (done) => {
      const id = '1';
      chai.request(server).delete(`/api/video-tag-association/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({ id });
          done();
        });
    });
  });

  describe('/DELETE VideoTagAssociation', () => {
    it('it should get a 404 response', (done) => {
      const id = 1;
      chai.request(server).delete(`/api/video-tag-association/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  after(async () => {
    await db.schema.dropTableIfExists('videoTagAssociation');
    await db.schema.dropTableIfExists('video');
    await db.schema.dropTableIfExists('tag');
  });
});
