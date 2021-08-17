import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import meFixture from '@test/fixtures/normalized/me.json';

describe('Who Test', () => {
  it('should return ok if api key is valid', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const response = await testlinkClient.getMe(requestConfig);
    expect(response).toEqual(meFixture);
  });

  it('should return error if api key is invalid', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    requestConfig.headers.testlinkApiKey = 'invalid api key';
    try {
      await testlinkClient.getMe(requestConfig);
    } catch (error) {
      expect(error.response?.status).toBe(400);
      expect(error.response?.statusText).toBe('Bad Request');
      expect(error.response?.data?.message).toBe('authentication error');
    }
  });
});
