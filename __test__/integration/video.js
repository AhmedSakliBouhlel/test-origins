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

describe('Video', () => {
  before(async () => {
    await db.schema.createTable('video', (table) => {
      table.increments();
      table.string('nom').notNullable();
      table.string('description');
      table.string('url').notNullable();
      table.timestamps();
    });
  });
  describe('/GET Video', () => {
    it('it should get an empty array', (done) => {
      chai.request(server).get('/api/video/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          res.body.should.be.eql([]);
          done();
        });
    });
  });

  describe('/POST Video', () => {
    it('it should get an object Video', (done) => {
      const video = {
        nom: 'test',
        description: 'test',
        url: 'test',
      };
      chai.request(server).post('/api/video/').send(video)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.nom.should.be.eql('test');
          res.body.description.should.be.eql('test');
          res.body.url.should.be.eql('test');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/POST Video', () => {
    it('it should get a 400 response', (done) => {
      // Wrong video schema
      const video = {
        nom: 'test',
      };
      chai.request(server).post('/api/video/').send(video)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/PUT Video', () => {
    it('it should get an object Video', (done) => {
      const id = 1;
      const video = {
        nom: 'testUpdated',
        description: 'testUpdated',
        url: 'testUpdated',
      };
      chai.request(server).put(`/api/video/${id}`).send(video)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.nom.should.be.eql('testUpdated');
          res.body.description.should.be.eql('testUpdated');
          res.body.url.should.be.eql('testUpdated');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/PUT Video', () => {
    it('it should get a 400 response', (done) => {
      const id = 1;
      // Wrong video schema
      const video = {
        nom: 'testUpdated',
      };
      chai.request(server).put(`/api/video/${id}`).send(video)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/PUT Video', () => {
    it('it should get a 404 response', (done) => {
      // Non existing video id
      const id = 999;
      const video = {
        nom: 'testUpdated',
        description: 'testUpdated',
        url: 'testUpdated',
      };
      chai.request(server).put(`/api/video/${id}`).send(video)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/DELETE Video', () => {
    it('it should get an object Video', (done) => {
      const id = '1';
      chai.request(server).delete(`/api/video/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({ id });
          done();
        });
    });
  });

  describe('/DELETE Video', () => {
    it('it should get a 404 response', (done) => {
      const id = 1;
      chai.request(server).delete(`/api/video/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  after(async () => {
    await db.schema.dropTableIfExists('video');
  });
});
