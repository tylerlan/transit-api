const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const directions = require('./src/routes/directions');
const alerts = require('./src/routes/alerts');

app.use(directions);
app.use(alerts);

app.get('/', (req, res) => {
  res.send('aok');
});

app.use((req, res) => {
  res.sendStatus(404);
});

if (!module.parent) {
  app.listen(PORT, () => {
    /* eslint-disable no-console */
    console.log(`Express server listening on port ${PORT}`);
  });
}

module.exports = app;
