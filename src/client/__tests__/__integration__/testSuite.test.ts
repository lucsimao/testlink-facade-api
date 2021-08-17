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
});
