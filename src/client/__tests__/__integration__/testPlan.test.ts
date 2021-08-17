import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testPlanFixture from '@test/fixtures/normalized/testPlan.json';

describe('TestPlan Test', () => {
  it('should return the normalized testPlan from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();

    const response = await testlinkClient.getTestPlans(requestConfig, 1);
    expect(response).toEqual(testPlanFixture);
  });
});
