import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testProjectFixture from '@test/fixtures/normalized/testProject.json';

describe('Test Project Test Suite', () => {
  describe('GET Method', () => {
    it('should return testProject when call /testProject route', async () => {
      const request = TestHelper.getFunctionalTestHeader().headers;
      const { body, status } = await global.testRequest
        .get('/testProjects')
        .set(request);

      expect(status).toBe(200);
      expect(body).toEqual(testProjectFixture);
    });
  });

  it('should return 500 when there is any error other than validation error', async () => {
    jest
      .spyOn(TestlinkClient.prototype, 'getTestProjects')
      .mockImplementationOnce(() => Promise.reject('Internal server Error'));

    const request = TestHelper.getFunctionalTestHeader().headers;

    const { body, status } = await global.testRequest
      .get('/testProjects')
      .set(request);

    expect(body).toEqual({ error: 'Internal server Error' });
    expect(status).toBe(500);
  });
});
