import config from 'config';
import { TestlinkClient } from '@src/client/TestlinkClient';
import unitTestPlanFixture from '@src/client/__tests__/fixtures/unitTestPlanFixture.json';

describe('TestPlan Test', () => {
  it('should return the normalized testPlan from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const headers = {
      testlinkApiKey: config.get('App.testlink.apikey'),
      testlinkUrl: config.get('App.testlink.url'),
    };
    const response = await testlinkClient.getTestPlan({ headers }, 1);
    expect(response).toEqual(unitTestPlanFixture);
  });
});
