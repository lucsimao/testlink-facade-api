import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testSuiteFixture from '@test/fixtures/normalized/testSuite.json';

describe('TestSuite Test', () => {
  it('should return the normalized testSuite from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const response = await testlinkClient.getTestSuites(requestConfig, 2);
    expect(response).toEqual(testSuiteFixture);
  });

  it('should return something when receive a invalid id', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const invalidTestPlanId = 1000;
    try {
      await testlinkClient.getTestSuites(requestConfig, invalidTestPlanId);
      throw new Error('Test Failed');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          '[3000] (getTestSuitesForTestPlan) - The Test Plan ID (1000) provided does not exist!'
        )
      );
    }
  });
});
