const nock = require('nock');
const expect = require('chai').expect;
const checkFormation = require('../src/check-formation');

describe('check-formation', function () {
  after(function () {
    nock.cleanAll();
  });

  describe('returns true', function () {
    before(function () {
      nock('https://api.heroku.com')
        .get('/apps/example/dynos')
        .reply(200, [
          {
            name: 'web.1',
            size: 'standard-1X',
            state: 'up',
            type: 'web',
            updated_at: '2012-01-01T12:00:00Z'
          },
          {
            name: 'web.2',
            size: 'standard-1X',
            state: 'up',
            type: 'web',
            updated_at: '2012-01-01T12:00:00Z'
          }
        ]);
    });
    it('if app has requested formation', async function () {
      const result = await checkFormation(this.heroku, 'example', [{ type: 'web', quantity: 2 }]);
      expect(result).to.equal(true);
    });
  });

  describe('returns false', function () {
    before(function () {
      nock('https://api.heroku.com')
        .get('/apps/example/dynos')
        .reply(200, [
          {
            name: 'web.1',
            size: 'standard-1X',
            state: 'starting',
            type: 'web',
            updated_at: '2012-01-01T12:00:00Z'
          },
          {
            name: 'web.2',
            size: 'standard-1X',
            state: 'up',
            type: 'web',
            updated_at: '2012-01-01T12:00:00Z'
          },
          {
            name: 'worker.1',
            size: 'standard-1X',
            state: 'up',
            type: 'worker',
            updated_at: '2012-01-01T12:00:00Z'
          }
        ]);
    });
    it('if app does not have requested formation', async function () {
      const result = await checkFormation(this.heroku, 'example', [{ type: 'web', quantity: 2 }]);
      expect(result).to.equal(false);
    });
  });

  describe('returns false - multiple dyno types', function () {
    before(function () {
      nock('https://api.heroku.com')
        .get('/apps/example/dynos')
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
        ]);
    });
    it('if app does not have requested formation', async function () {
      const result = await checkFormation(this.heroku, 'example', [
        { type: 'web', size: 'standard-1x', quantity: 1 },
        { type: 'worker', size: 'performance-m', quantity: 1 }
      ]);
      expect(result).to.equal(false);
    });
  });
});
