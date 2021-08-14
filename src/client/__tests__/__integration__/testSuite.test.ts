import config from 'config';
import { TestlinkClient } from '@src/client/TestlinkClient';
import unitTestSuiteFixture from '@src/client/__tests__/fixtures/unitTestSuiteFixture.json';

describe('TestSuite Test', () => {
  it('should return the normalized testSuite from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const headers = {
      testlinkApiKey: config.get('App.testlink.apikey'),
      testlinkPort: 80,
      testlinkUrl: 'localhost',
    };
    const response = await testlinkClient.getTestSuite({ headers }, 2);
    expect(response).toEqual(unitTestSuiteFixture);
  });
});
