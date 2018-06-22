const path = require('path');
module.exports = async function checkFormation (heroku, app, formation) {
  const response = await heroku.get(path.join('/apps', app, 'formation'));
  return formation.reduce((acc, dynoFormation) => {
    if (!acc) return false;
    return dynoFormation.quantity === response.find(a => a.type === dynoFormation.type).quantity;
  }, true);
};
