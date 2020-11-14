const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
// eslint-disable-next-line
process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const request = require('supertest');

const app = require('../../app.js');
const db = require('../../db/db');

// eslint-disable-next-line
describe('Devices Routes', () => {
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
  //1- create device Api
  // eslint-disable-next-line
  describe('Create Device Route', () => {
    // eslint-disable-next-line
    it('OK, Create device Works', (done) => {
      request(app)
        .post('/api/devices/')
        .set(
          'Authorization',
          'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .send({
          sensorType: 'hygrometer',
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Device created successfully');
          assert.property(body, 'device');
          done();
        })
        .catch((error) => done(error));
    });

    // eslint-disable-next-line
    it('Failed, User Not Authorized to create device', (done) => {
      request(app)
        .post('/api/devices/')
        .set(
          'Authorization',
          'Baerer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .send({
          sensorType: 'hygrometer',
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Not Authorized');
          done();
        })
        .catch((error) => done(error));
    });
  });

  //   /////////////////////////////////////////////////////////////////////////////

  //2- Get user devices Api
  // eslint-disable-next-line
  describe('Get user devices Route', () => {
    // eslint-disable-next-line
    it('OK, Get User devices successfully', (done) => {
      request(app)
        .get('/api/devices')
        .set(
          'Authorization',
          'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .send({})
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Devices fetched succesfully');
          assert.property(body, 'devices');
          done();
        })
        .catch((error) => done(error));
    });

    // eslint-disable-next-line
    it('Failed, User not Authorized to get devices', (done) => {
      request(app)
        .get('/api/devices')
        .set(
          'Authorization',
          'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsF'
        )
        .send({})
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Not Authorized');
          done();
        })
        .catch((error) => done(error));
    });
  });

  //   /////////////////////////////////////////////////////////////////////////////

  //3- Get device data Api
  // eslint-disable-next-line
  describe('Get device data Route', () => {
    // eslint-disable-next-line
    it('OK, Get device data successfully', (done) => {
      request(app)
        .get('/api/devices/5f7bea8f1d6ede56f4ce69c8')
        .set(
          'Authorization',
          'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .query({ deviceId: '5f7bea8f1d6ede56f4ce69c8' })
        .send({})
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Success');
          assert.property(body, 'deviceData');
          done();
        })
        .catch((error) => done(error));
    });

    // eslint-disable-next-line
    it('Failed, User not Authorized to get device data', (done) => {
      request(app)
        .get('/api/devices/:deviceId')
        .query({ deviceId: '5f7bea8f1d6ede56f4ce69c8' })
        .set(
          'Authorization',
          'Baerer eyJbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .send({})
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Not Authorized');
          done();
        })
        .catch((error) => done(error));
    });
  });

  //   /////////////////////////////////////////////////////////////////////////////

  //4- Add device data Api
  // eslint-disable-next-line
  describe('Add device data Route', () => {
    // eslint-disable-next-line
    it('OK, Add device data successfully', (done) => {
      request(app)
        .post('/api/devices/5f7bea8f1d6ede56f4ce69c8')
        .set(
          'Authorization',
          'Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .query({ deviceId: '5f7bea8f1d6ede56f4ce69c8' })
        .send({
          typeOfData: 'humidity',
          value: 20,
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Device data added succesfully');
          assert.property(body, 'storedData');
          done();
        })
        .catch((error) => done(error));
    });

    // eslint-disable-next-line
    it('Failed, User not Authorized to add device data', (done) => {
      request(app)
        .get('/api/devices/5f7bea8f1d6ede56f4ce69c8')
        .query({ deviceId: '5f7bea8f1d6ede56f4ce69c8' })
        .set(
          'Authorization',
          'Baerer eyJbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjdhMGZjZTA5NzYzMjI3ZTBjZDNkZjAiLCJlbWFpbCI6ImFobWVkQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk1NjM2MywiZXhwIjoxNjAyMDQyNzYzfQ.9tCw-cGdZW7w3y2xR-GCuS76ve_JFoL8939tVdgmsFo'
        )
        .send({
          typeOfData: 'humidity',
          value: 20,
        })
        .then((res) => {
          const body = res.body;
          assert.property(body, 'message');
          assert.equal(body.message, 'Not Authorized');
          done();
        })
        .catch((error) => done(error));
    });
  });
});
