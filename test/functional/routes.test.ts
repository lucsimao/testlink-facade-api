import config from 'config';
import testProjectFixture from '@test/functional/fixtures/testProject.json';

describe('Test Project Test Suite', () => {
  describe('GET Method', () => {
    it('should return testProject when call /testProject route', async () => {
      const headers = {
        ['testlink-api-key']: config.get('App.testlink.apikey'),
        ['testlink-url']: config.get('App.testlink.url'),
      };

      const { body, status } = await global.testRequest
        .get('/testProject')
        .set(headers);

      expect(status).toBe(200);
      expect(body).toEqual(testProjectFixture);
    });
  });
});
