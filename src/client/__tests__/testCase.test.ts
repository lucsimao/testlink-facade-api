import config from 'config';
import { TestlinkClient } from '../TestlinkClient';
import unitTestCaseFixture from './fixtures/unitTestCaseFixture.json';

describe('TestCase Test', () => {
  it('should return the normalized testCase from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const headers = {
      testlinkApiKey: config.get('App.testlink.apikey'),
      testlinkUrl: config.get('App.testlink.url'),
    };
    const response = await testlinkClient.getTestCases({ headers }, 1);
    expect(response).toEqual(unitTestCaseFixture);
  });
});
