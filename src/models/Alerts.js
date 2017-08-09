const fetch = require('node-fetch');
const key = process.env.FIVE_ONE_ONE_API_KEY;
require('dotenv').config();
function findLineNumberSingular(str) {
  const lineIndex = str.search('Line ');
  const sliced = str.slice(lineIndex + 5);
  const index = sliced.search(' ');
  const result = sliced.substring(0, index);
  return result;
}

function findLines(desc) {
  if (desc.match(/lines [A-Z0-9]{1,3}.+? and [A-Z0-9]{1,3}/)) return desc.match(/lines [A-Z0-9]{1,3}.+?and [A-Z0-9]{1,3}/)[0].replace('lines ', '').replace('and ', '').split(/,{0,} /);
  findLineNumberSingular(desc);
}

class Alerts {
  getAlerts() {
    return fetch(`http://api.511.org/transit/servicealerts?api_key=${key}&format=json`)
      .then(response => response.text())
      .then((json) => {
        const data = JSON.parse(json.slice(1));
        const alerts = {};
        let id = 1;
        data._entity.forEach((alert) => {
          const subject = alert._alert._header_text._translation[0]._text;
          const description = alert._alert._description_text._translation[0]._text;
          alerts[id] = { subject,
            description,
            affectedLines: findLines(description),
          };
          id += 1;
        });
        return alerts;
      })
      .catch(err => err);
  }
}

module.exports = Alerts;
