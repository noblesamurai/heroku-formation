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
  const response = await heroku.get(path.join('/apps', app, 'formation'));
  return formation.reduce((acc, dynoFormation) => {
    if (!acc) return false;
    return dynoFormation.quantity === response.find(a => a.type === dynoFormation.type).quantity;
  }, true);
};
