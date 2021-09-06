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

  it('should return something when receive a invalid id', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const invalidTestProjectId = 1000;
    try {
      await testlinkClient.getTestPlans(requestConfig, invalidTestProjectId);
      throw new Error('Test Failed');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          '[7000] (getProjectTestPlans) - The Test Project ID (1000) provided does not exist!'
        )
      );
    }
  });
});
