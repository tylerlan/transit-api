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
  test('GET /directions', (done) => {
    request(server)
      .get('/directions?origin=work&destination=home&time=1800')
      .expect(200,
        {
          origin: 'work',
          destination: 'home',
          time: '1800',
        }, done);
  });
});
