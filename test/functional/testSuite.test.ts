import { Params } from '@src/enums/Params';
import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testSuiteFixture from '@test/fixtures/normalized/testSuite.json';

describe('Test Project Test Suite', () => {
  describe('GET Method', () => {
    it('should return testSuite when call /testSuite route', async () => {
      const request = {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_PLAN_ID]: 2,
      };

      const { body, status } = await global.testRequest
        .get('/testSuites')
        .set(request);

      expect(status).toBe(200);
      expect(body).toEqual(testSuiteFixture);
    });
  });

  it('should return 500 when there is any error other than validation error', async () => {
    jest
      .spyOn(TestlinkClient.prototype, 'getTestSuites')
      .mockImplementationOnce(() => Promise.reject('Internal server Error'));

    const request = {
      ...TestHelper.getFunctionalTestHeader().headers,
      [Params.TEST_PLAN_ID]: 2,
    };

    const { body, status } = await global.testRequest
      .get('/testSuites')
      .set(request);

    expect(status).toBe(500);
    expect(body).toEqual({ error: 'Internal server Error' });
  });
});
