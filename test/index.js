const server = require('../src/index');
const proxyquire = require('proxyquire');
const request = require('supertest');

describe('server', function () {
  describe('/start', function () {
    it('will 422 on missing params', function () {
      return request(server).get('/start').expect(422);
    });

    it('will 500 on bad params', function () {
      return request(server)
        .get('/start').query({ formation: 'blah', redirect_to: 'blerg' })
        .expect(500);
    });
    it('will successfully redirect on good params', function () {
      const server = proxyquire('../src/index', {
        './apply-formation': async () => true
      });
      return request(server)
        .get('/start').query({ formation: JSON.stringify({ app: { web: { quanity: 1 } } }), redirect_to: 'blerg' })
        .expect(301)
        .expect('location', 'blerg');
    });
  });
});
