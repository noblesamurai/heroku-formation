const nock = require('nock');
const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const applyFormation = proxyquire('../src/apply-formation', {
  'promise-poller': {
    default: async (config) => {
      while (!await config.taskFn().then(() => true).catch(_err => false)) {}
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
      .get('/apps/exampleApp/dynos')
      .times(3)
      .reply(200, [{ type: 'web', state: 'starting' }])
      .get('/apps/exampleApp/dynos')
      .reply(200, [{ type: 'web', state: 'up' }]);
  });
  after(function () {
    nock.cleanAll();
  });
  it('requests the formation and waits for it to apply', async function () {
    await applyFormation(this.heroku, 'exampleApp', [{ type: 'web', quantity: 1 }]);
    expect(success.isDone()).to.equal(true);
  });

  describe('multiple dyno types', function () {
    before(function () {
      success = nock('https://api.heroku.com')
        .patch('/apps/exampleApp/formation')
        .reply(200)
        .get('/apps/exampleApp/dynos')
        .times(3)
        .reply(200, [
          {
            name: 'web.1',
            size: 'standard-1x',
            state: 'up',
            type: 'web',
            updated_at: '2012-01-01t12:00:00z'
          },
          {
            name: 'worker.1',
            size: 'performance-m',
            state: 'starting',
            type: 'worker',
            updated_at: '2012-01-01t12:00:00z'
          }
        ])
        .get('/apps/exampleApp/dynos')
        .reply(200, [
          {
            name: 'web.1',
            size: 'standard-1x',
            state: 'up',
            type: 'web',
            updated_at: '2012-01-01t12:00:00z'
          },
          {
            name: 'worker.1',
            size: 'performance-m',
            state: 'up',
            type: 'worker',
            updated_at: '2012-01-01t12:00:00z'
          }
        ]);
    });
    it('requests the formation and waits for it to apply', async function () {
      await applyFormation(this.heroku, 'exampleApp', [{ type: 'web', quantity: 1 }, { type: 'worker', quantity: 1 }]);
      expect(success.isDone()).to.equal(true);
    });
  });
});
