const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
// eslint-disable-next-line
process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const request = require('supertest');

const app = require('../../app.js');
const db = require('../../db/db');

// eslint-disable-next-line
describe('Auth Routes', () => {
  // eslint-disable-next-line
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((error) => done(error));
  });

  // eslint-disable-next-line
  after((done) => {
    db.disconnect()
      .then(() => done())
      .catch((error) => done(error));
  });
  //1- register Api
  // eslint-disable-next-line
  describe('Register Route', () => {
    // eslint-disable-next-line
    it('OK, Register User Works', (done) => {
      request(app)
        .post('/api/auth/register')
        .send({
          username: 'sama',
          email: 'sama@gmail.com',
          password: '55555',
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.property(body, 'token');
          done();
        })
        .catch((error) => {
          console.log(error);
          done(error);
        });
    });

    // eslint-disable-next-line
    it('Failed, Email is Already exsit', (done) => {
      request(app)
        .post('/api/auth/register')
        .send({
          username: 'fatema',
          email: 'fatema@gmail.com',
          password: '55555',
          confirmPassword: '55555',
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Email has already exist.');
          done();
        })
        .catch((error) => done(error));
    });
  });

  /////////////////////////////////////////////////////////////////////////////

  //2- Login Api
  // eslint-disable-next-line
  describe('Login Route', () => {
    // eslint-disable-next-line
    it('OK, Login User Works', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'mariam@gmail.com',
          password: '55555',
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.property(body, 'token');
          done();
        })
        .catch((error) => done(error));
    });

    // eslint-disable-next-line
    it('Failed, Invalid Credentials', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          email: 'fatema@gmail.com',
          password: '5555',
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Invalid credentials.');
          done();
        })
        .catch((error) => done(error));
    });
  });
});
