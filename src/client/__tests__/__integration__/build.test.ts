import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import buildFixture from '@test/fixtures/normalized/build.json';

describe('Build Test', () => {
  it('should return the normalized build from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    const response = await testlinkClient.getBuilds(requestConfig, 2);
    expect(response).toEqual(buildFixture);
  });
});
