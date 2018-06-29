const expect = require('chai').expect;
const validateFormation = require('../../lib/validate-formation');
describe('validate-formation', function () {
  it('validates formation', function () {
    expect(() => validateFormation({})).to.throw();
    expect(() => validateFormation([{ type: 'web', quantity: 1 }])).to.not.throw();
  });
});
