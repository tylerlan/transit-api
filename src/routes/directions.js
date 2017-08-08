const express = require('express');
const Directions = require('../models/Directions');

const router = express.Router();
const directions = new Directions();

// only expose these Google Directions API query parameters for now
const validQueryParameters = ['origin', 'destination', 'alternatives'];

router.get('/directions', (req, res) => {
  const request = req.query;

  // remove invalid and empty query parameters
  Object.keys(request).forEach((parameter) => {
    if (!validQueryParameters.includes(parameter) || request[parameter] === '') {
      delete request[parameter];
    }
  });

  if (request.origin === undefined || request.destination === undefined) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('The origin and desination parameters are required');
  }

  const apiQuery = {
    origin: request.origin,
    destination: request.destination,
    mode: 'transit',
    alternatives: request.alternatives === 'true' || false,
  };

  return directions.getDirections(apiQuery)
    .then(routes => res.json(routes))
    .catch((err) => {
      res.status(500).send(`server error: ${err}`);
    });
});


module.exports = router;
