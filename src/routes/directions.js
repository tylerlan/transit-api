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
    alternatives: request.alternatives === 'true' || false,
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

  const currentTimeInSeconds = Math.round(Date.now() / 1000);

  return googleMapsClient.directions(apiQuery).asPromise()
    .then((response) => {
      if (response.json.status !== 'OK') {
        return res.sendStatus(404);
      }

      if (apiQuery.alternatives) {
        response.json.routes.sort((a, b) => (
          ((a.legs[0].arrival_time.value - currentTimeInSeconds) + a.legs[0].departure_time.value) -
          ((b.legs[0].arrival_time.value - currentTimeInSeconds) + b.legs[0].departure_time.value)
        ));
      }

      return res.send(response.json.routes.slice(0, 2));
    })
    .catch(err => err);
});

module.exports = router;
