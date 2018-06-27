const path = require('path');
/**
 * @module heroku-formation
 */

/**
 * @async
 * @alias checkFormation
 * Check whether app is in requested formation.
 * @param {Heroku} heroku
 * @param {string} app
 * @param {object} formation
 * @return {Promise.<Boolean>}
 */
module.exports = async function checkFormation (heroku, app, formation) {
  const response = await heroku.get(path.join('/apps', app, 'dynos'));
  return formation.reduce((acc, dynoFormation) => {
    if (!acc) return false;
    const upCount = response.filter(d =>
      d.type === dynoFormation.type && d.state === 'up'
    ).length;
    return dynoFormation.quantity === upCount;
  }, true);
};
