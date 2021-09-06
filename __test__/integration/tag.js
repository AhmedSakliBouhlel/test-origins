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

describe('Tag', () => {
  before(async () => {
    await db.schema.createTable('tag', (table) => {
      table.increments();
      table.string('valeur').notNullable();
      table.timestamps();
    });
  });
  describe('/GET Tag', () => {
    it('it should get an empty array', (done) => {
      chai.request(server).get('/api/tag/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          res.body.should.be.eql([]);
          done();
        });
    });
  });

  describe('/POST Tag', () => {
    it('it should get an object tag', (done) => {
      const tag = {
        valeur: 'test',
      };
      chai.request(server).post('/api/tag/').send(tag)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.valeur.should.be.eql('test');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/POST Tag', () => {
    it('it should get a 400 response', (done) => {
      // Wrong tag schema
      const tag = {
      };
      chai.request(server).post('/api/tag/').send(tag)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/PUT Tag', () => {
    it('it should get an object tag', (done) => {
      const id = 1;
      const tag = {
        valeur: 'testUpdated',
      };
      chai.request(server).put(`/api/tag/${id}`).send(tag)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.valeur.should.be.eql('testUpdated');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/PUT Tag', () => {
    it('it should get a 400 response', (done) => {
      const id = 1;
      // Wrong tag schema
      const tag = {
      };
      chai.request(server).put(`/api/tag/${id}`).send(tag)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/PUT Tag', () => {
    it('it should get a 404 response', (done) => {
      // Non existing tag id
      const id = 999;
      const tag = {
        valeur: 'testUpdated',
      };
      chai.request(server).put(`/api/tag/${id}`).send(tag)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/DELETE Tag', () => {
    it('it should get an object tag', (done) => {
      const id = '1';
      chai.request(server).delete(`/api/tag/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({ id });
          done();
        });
    });
  });

  describe('/DELETE Tag', () => {
    it('it should get a 404 response', (done) => {
      const id = 1;
      chai.request(server).delete(`/api/tag/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  after(async () => {
    await db.schema.dropTableIfExists('tag');
  });
});
