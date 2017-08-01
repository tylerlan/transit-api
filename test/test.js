/* eslint-disable no-undef, no-unused-expressions */
const { expect } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../index.js');


describe('the api', () => {
  it('should work', () => {
    expect(true).to.be.ok;
  });
});


suite('directions route', () => {
  test('GET /directions without parameters should return 400 Bad Request', (done) => {
    request(server)
      .get('/directions')
      .expect(400, done);
  });

  test('GET /directions without destination parameter should return 400 Bad Request', (done) => {
    request(server)
      .get('/directions?origin=here')
      .expect(400, done);
  });

  test('GET /directions without origin parameter should return 400 Bad Request', (done) => {
    request(server)
      .get('/directions?destination=there')
      .expect(400, done);
  });

  test('GET /directions with origin and destination should return 200 OK', (done) => {
    request(server)
      .get('/directions?origin=here&destination=there')
      .expect(200, done);
  });
});
