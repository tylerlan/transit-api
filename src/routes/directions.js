const express = require('express');
const router = express.Router();



router.get('/directions', (req, res) => {
  let returnObject = {origin: req.query.origin, destination: req.query.destination, time: req.query.time}
  res.status(200).send(returnObject);
})

module.exports = router;
