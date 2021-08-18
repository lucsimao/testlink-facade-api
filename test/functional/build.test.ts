import { Params } from '@src/enums/Params';
import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import buildFixture from '@test/fixtures/normalized/build.json';

describe('Build Tests', () => {
  describe('GET Method', () => {
    it('should return build when call /build route', async () => {
      const request = {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_PLAN_ID]: 2,
      };

      const { body, status } = await global.testRequest
        .get('/builds')
        .set(request);

      expect(body).toEqual(buildFixture);
      expect(status).toBe(200);
    });
  });

  it('should return 500 when there is any error other than validation error', async () => {
    jest
      .spyOn(TestlinkClient.prototype, 'getBuilds')
      .mockImplementationOnce(() => Promise.reject('Internal server Error'));

    const request = {
      ...TestHelper.getFunctionalTestHeader().headers,
      [Params.TEST_PLAN_ID]: 2,
    };

    const { body, status } = await global.testRequest
      .get('/builds')
      .set(request);

    expect(body).toEqual({ error: 'Internal server Error' });
    expect(status).toBe(500);
  });
});
