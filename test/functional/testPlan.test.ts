import { Params } from '@src/enums/Params';
import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testPlanFixture from '@test/fixtures/normalized/testPlan.json';

describe('Test Project Test Suite', () => {
  describe('GET Method', () => {
    it('should return testPlan when call /testPlan route', async () => {
      const request = {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_PROJECT_ID]: 1,
      };

      const { body, status } = await global.testRequest
        .get('/testPlans')
        .set(request);

      expect(status).toBe(200);
      expect(body).toEqual(testPlanFixture);
    });
  });

  it('should return 500 when there is any error other than validation error', async () => {
    jest
      .spyOn(TestlinkClient.prototype, 'getTestPlans')
      .mockImplementationOnce(() => Promise.reject('Internal server Error'));

    const request = {
      ...TestHelper.getFunctionalTestHeader().headers,
      [Params.TEST_PROJECT_ID]: 1,
    };

    const { body, status } = await global.testRequest
      .get('/testPlans')
      .set(request);

    expect(body).toEqual({ error: 'Internal server Error' });
    expect(status).toBe(500);
  });
});
