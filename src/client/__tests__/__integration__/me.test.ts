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
      throw new Error('Test Failed');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          '[2000] (checkDevKey) - Can not authenticate client: invalid developer key'
        )
      );
    }
  });
});
