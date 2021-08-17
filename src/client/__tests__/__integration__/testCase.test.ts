import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testCaseFixture from '@test/fixtures/normalized/testCase.json';

describe('TestCase Test', () => {
  it('should return the normalized testCase from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const response = await testlinkClient.getTestCases(requestConfig, 1);
    expect(response).toEqual(testCaseFixture);
  });
});
