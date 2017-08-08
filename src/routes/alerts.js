const express = require('express');
const Alerts = require('../models/Alerts');

const router = express.Router();

router.get('/alerts', (req, res) => {
  const alerts = new Alerts();

  alerts.getAlerts()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(`server error: ${err}`);
    });
});

module.exports = router;
