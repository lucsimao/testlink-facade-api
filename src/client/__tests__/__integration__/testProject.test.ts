import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import testProjectFixture from '@test/fixtures/normalized/testProject.json';

describe('TestProject Test', () => {
  it('should return the normalized testProject from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();

    const response = await testlinkClient.getTestProjects(requestConfig);
    expect(response).toEqual(testProjectFixture);
  });
});
