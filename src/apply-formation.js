const path = require('path');
const promisePoller = require('promise-poller').default;
const checkFormation = require('./check-formation');
const validateFormation = require('../lib/validate-formation');

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
    taskFn: async () => {
      const result = await checkFormation(heroku, app, formation);
      return result ? Promise.resolve() : Promise.reject(new Error('got false'));
    },
    strategy: 'linear-backoff',
    retries: 6
  });
}
/**
 * @module heroku-formation
 */

/**
 * @async
 * @alias applyFormation
 * Given an app and dyno formation, scale it and wait until formation in place.
 * @param {string} app app name
 * @param {Array.<object>} formation [{ type: 'web', quantity: 1}, { type: 'worker', quantity: 2}]
 * @return {Promise} fulfilled when scale complete.
 */
module.exports = async function applyFormation (heroku, app, formation) {
  validateFormation(formation);
  await scale(heroku, app, formation);
  return waitForScale(heroku, app, formation);
};
