import { Params } from '@src/enums/Params';
import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testCaseFixture from '@test/fixtures/normalized/testCase.json';

describe('Test Project Test Suite', () => {
  describe('GET Method', () => {
    it('should return testCase when call /testCase route', async () => {
      const request = {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_SUITE_ID]: 3,
      };

      const { body, status } = await global.testRequest
        .get('/testCases')
        .set(request);

      expect(status).toBe(200);
      expect(body).toEqual(testCaseFixture);
    });
  });

  it('should return 500 when there is any error other than validation error', async () => {
    jest
      .spyOn(TestlinkClient.prototype, 'getTestCases')
      .mockImplementationOnce(() => Promise.reject('Internal server Error'));

    const request = {
      ...TestHelper.getFunctionalTestHeader().headers,
      [Params.TEST_SUITE_ID]: 3,
    };

    const { body, status } = await global.testRequest
      .get('/testCases')
      .set(request);

    expect(body).toEqual({ error: 'Internal server Error' });
    expect(status).toBe(500);
  });
});
