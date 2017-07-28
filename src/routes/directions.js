const express = require('express');
const router = express.Router();



router.get('/directions', (req, res) => {
  res.status(200).send(`origin: ${req.query.origin} <br/> distination: ${req.query.destination} <br/> time: ${req.query.time}`)
})

module.exports = router;
