const { expect } = require('chai');
const { suite, test } = require('mocha');
const sinon = require('sinon');
const Alerts = require('../src/models/Alerts');

const alerts = new Alerts();


suite('alerts route', () => {
  sinon.stub(alerts, 'getAlerts').callsFake(() => 200);

  test('GET /alerts should return 200 OK', () => {
    expect(alerts.getAlerts()).to.equal(200);
  });
});
