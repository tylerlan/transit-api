require('dotenv').config();

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise,
});

class Directions {


  getDirections(apiQuery) {
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

      return response.json.routes.slice(0, 2);
    })
    .catch(err => err);
  }
}

module.exports = Directions;
