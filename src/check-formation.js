const path = require('path');
const validateFormation = require('../lib/validate-formation');
/**
 * @module heroku-formation
 */

/**
 * @async
 * @alias checkFormation
 * @see https://devcenter.heroku.com/articles/platform-api-reference#formation
 * Check whether app is in requested formation.
 * @param {Heroku} heroku
 * @param {string} app
 * @param {Array.<object>} formation
 * @return {Promise.<Boolean>}
 */
module.exports = async function checkFormation (heroku, app, formation) {
  validateFormation(formation);
  const response = await heroku.get(path.join('/apps', app, 'dynos'));
  return formation.reduce((acc, dynoFormation) => {
    if (!acc) return false;
    const upCount = response.filter(d =>
      d.type === dynoFormation.type && d.state === 'up'
    ).length;
    return dynoFormation.quantity === upCount;
  }, true);
};
