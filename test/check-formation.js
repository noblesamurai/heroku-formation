const nock = require('nock');
const expect = require('chai').expect;
const checkFormation = require('../src/check-formation');

describe('check-formation', function () {
  before(function () {
    nock('https://api.heroku.com')
      .get('/apps/example/formation')
      .reply(200, [
        {
          'app': {
            'name': 'example',
            'id': '01234567-89ab-cdef-0123-456789abcdef'
          },
          'command': 'bundle exec rails server -p $PORT',
          'created_at': '2012-01-01T12:00:00Z',
          'id': '01234567-89ab-cdef-0123-456789abcdef',
          'quantity': 1,
          'size': 'standard-1X',
          'type': 'web',
          'updated_at': '2012-01-01T12:00:00Z'
        }
      ]);
  });

  after(function () {
    nock.cleanAll();
  });

  it('should return true if app has requested formation', async function () {
    const result = await checkFormation(this.heroku, 'example', [{ type: 'web', quantity: 1 }]);
    expect(result).to.equal(true);
  });
});
