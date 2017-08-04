const express = require('express');
const Directions = require('../models/Directions')


const router = express.Router();

router.get('/directions', (req, res) => {
  const request = req.query;
  let directions = new Directions();

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

    directions.getDirections(apiQuery)
    .then(directions => res.json(directions))
    .catch(err => {
      res.status(500).send(`server error: ${err}`)
    })
  });


module.exports = router;
