const joi = require('joi');

module.exports = function (formation) {
  joi.assert(formation, joi.array().items(
    joi.object().keys({
      type: joi.string().error(val => `need string for type got ${val}`),
      quantity: joi.number()
    }).options({ stripUnknown: true })
  ));
};
