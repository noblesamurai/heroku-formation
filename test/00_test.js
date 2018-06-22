const chai = require('chai');
chai.use(require('dirty-chai'));
const Heroku = require('heroku-client');

before(function () {
  const heroku = new Heroku();
  this.heroku = heroku;
});
