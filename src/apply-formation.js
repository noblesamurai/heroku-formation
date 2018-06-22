const path = require('path');
const promisePoller = require('promise-poller').default;
const checkFormation = require('./check-formation');

/**
 * @private
* @param {object} formation { quantity: 2, type: 'standard-1' }
*/
function scale (heroku, app, formation) {
  const p = path.join('/apps', app, 'formation');
  return heroku.patch(p, {
    body: { updates: formation }
  });
}

function waitForScale (heroku, app, formation) {
  return promisePoller({
    taskFn: checkFormation.bind(null, heroku, app, formation),
    strategy: 'linear-backoff'
  });
}
/**
 * @module heroku-formation
 */

/**
 * @alias applyFormation
 * @async
 * Given an app and dyno formation, scale it and wait until formation in place.
 * @param {string} app app name
 * @param {formation} object
 * @return {Promise} fulfilled when scale complete.
 */
module.exports = function applyFormation (heroku, app, formation) {
  return Promise.all(Object.keys(formation).map(async dyno => {
    await scale(heroku, dyno, formation);
    return waitForScale(heroku, dyno, formation);
  }));
};
