const express = require('express');

const router = express.Router();
require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise,
});

router.get('/directions', (req, res) => {
  const request = req.query;

  if (request.origin === undefined || request.origin.length === 0 ||
      request.destination === undefined || request.destination.length === 0) {
    return res.sendStatus(400);
  }

  const apiQuery = {
    origin: request.origin,
    destination: request.destination,
    mode: request.mode || 'transit',
    alternatives: request.alternatives || false,
  };

  if (request.arrival_time === undefined) {
    if (request.departure_time) {
      apiQuery.departure_time = request.departure_time;
    }
  } else {
    apiQuery.arrival_time = request.arrival_time;
  }

  if (request.mode === 'transit' && request.transit_mode) {
    apiQuery.transit_mode = request.transit_mode;
  }

  return googleMapsClient.directions(apiQuery).asPromise()
    .then((response) => {
      if (response.json.status !== 'OK') {
        return res.sendStatus(404);
      }

      return res.send(response.json.routes);
    })
    .catch(err => err);
});

module.exports = router;
