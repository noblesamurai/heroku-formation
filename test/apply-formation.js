const nock = require('nock');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const applyFormation = proxyquire('../src/apply-formation', {
  'promise-poller': {
    default: async (config) => {
      while (!await config.taskFn()) {}
      return true;
    }
  }
});

describe('apply-formation', function () {
  let success;
  before(function () {
    success = nock('https://api.heroku.com')
      .patch('/apps/exampleApp/formation')
      .reply(200)
      .get('/apps/exampleApp/formation')
      .times(3)
      .reply(200, [{ type: 'web', quantity: 0 }])
      .get('/apps/exampleApp/formation')
      .reply(200, [{ type: 'web', quantity: 1 }]);
  });
  after(function () {
    nock.cleanAll();
  });
  it('requests the formation and waits for it to apply', async function () {
    await applyFormation(this.heroku, 'exampleApp', [{ type: 'web', quantity: 1 }]);
    expect(success.isDone()).to.equal(true);
  });
});
