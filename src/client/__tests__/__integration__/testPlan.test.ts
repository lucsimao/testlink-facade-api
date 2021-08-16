import config from 'config';
import { TestlinkClient } from '@src/client/TestlinkClient';
const unitTestPlanFixture = {
  '2': {
    active: '1',
    api_key: 'e670def31dcc2a19a074cf60a690c9db9e914d85e6cbbf5058d556f993e6e8b4',
    id: '2',
    is_public: '1',
    name: 'test-plan-example',
    notes: '',
    testproject_id: '1',
  },
};

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
