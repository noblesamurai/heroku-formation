const expect = require('chai').expect;
describe('heroku-formation', function () {
  it('exports correct functions', function () {
    const module = require('..');
    expect(module).to.have.all.keys('applyFormation', 'checkFormation');
  });
});
