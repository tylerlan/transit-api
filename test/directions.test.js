/* eslint-disable no-undef, no-unused-expressions */
const { expect } = require('chai');
const { suite, test } = require('mocha');
const sinon = require('sinon')
const request = require('supertest');
const server = require('../index.js');
const Directions = require('../src/models/Directions');
const directions = new Directions;


suite('directions route', () => {

  sinon.stub(directions, 'getDirections').callsFake(function fakeFn(origin, destination, time) {
    console.log(origin, destination);
    if (!origin || !destination) return 400;
      return 200;
  });

  test('GET /directions without parameters should return 400 Bad Request', () => {
    expect(directions.getDirections()).to.equal(400)
  });

  test('GET /directions without destination parameter should return 400 Bad Request', () => {
    expect(directions.getDirections('here', undefined)).to.equal(400)
  });

  test('GET /directions without origin parameter should return 400 Bad Request', () => {
    expect(directions.getDirections(undefined, 'there')).to.equal(400)
  });

  test('GET /directions with origin and destination should return 200 OK', () => {
    expect(directions.getDirections('here', 'there')).to.equal(200)
  });
});
