const fetch = require('node-fetch');
const key = process.env.FIVE_ONE_ONE_API_KEY

require('dotenv').config();



class Alerts {
  getAlerts() {
    return fetch(`http://api.511.org/transit/servicealerts?api_key=${key}&format=json`)
    .then(response => {
      return response.text();
    })
    .then(json => {
      let data = JSON.parse(json.slice(1))
      let alerts = {};
      let id = 1;
      data._entity.forEach(alert => {
        alerts[id] = { subject: alert._alert._header_text._translation[0]._text,
          description: alert._alert._description_text._translation[0]._text
        }
        id++
      })
      return alerts;
    })
    .catch(err => err)
  }
}

module.exports = Alerts
