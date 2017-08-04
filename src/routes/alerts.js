const express = require('express');
const Alerts = require('../models/Alerts')
const router = express.Router();

router.get('/alerts', (req, res) => {
    let alerts = new Alerts();

    alerts.getAlerts()
    .then(alerts => {
      res.json(alerts)
    })
    .catch(err => {
      res.status(500).send(`server error: ${err}`);
    });
});

module.exports = router;
