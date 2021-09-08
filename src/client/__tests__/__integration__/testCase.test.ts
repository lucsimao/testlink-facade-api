import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testCaseFixture from '@test/fixtures/normalized/testCase.json';

describe('TestCase Test', () => {
  it('should return the normalized testCase from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const response = await testlinkClient.getTestCases(requestConfig, 3);
    expect(response).toEqual(testCaseFixture);
  });

  it('should return something when receive a invalid id', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const invalidTestSuitId = 1000;
    try {
      await testlinkClient.getTestCases(requestConfig, invalidTestSuitId);
      throw new Error('Test Failed');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          '[8000] (getTestCasesForTestSuite) - ID 1000 do not belongs to a Test Suite present on system!'
        )
      );
    }
  });
});
