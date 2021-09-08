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

  it('should return something when receive a invalid id', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader();
    try {
      await testlinkClient.getBuilds(requestConfig, 0);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          '[3000] (getBuildsForTestPlan) - The Test Plan ID (0) provided does not exist!'
        )
      );
    }
  });

  it('should return something when receive a invalid id', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader({
      testlinkApiKey: 'invalidApiKey',
    });
    try {
      await testlinkClient.getBuilds(requestConfig, 0);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          '[2000] (getBuildsForTestPlan) - Can not authenticate client: invalid developer key'
        )
      );
    }
  });

  it('should return something when receive a invalid url', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader({
      testlinkUrl: 'invalid url',
    });
    try {
      await testlinkClient.getBuilds(requestConfig, 0);
      throw new Error('Test Failed');
    } catch (error) {
      expect(error).toEqual(
        new Error('Error: getaddrinfo ENOTFOUND invalid url')
      );
    }
  });

  it('should return something when receive a invalid port', async () => {
    const testlinkClient = new TestlinkClient();
    const requestConfig = TestHelper.getIntegrationTestHeader({
      testlinkPort: '20',
    });
    try {
      await testlinkClient.getBuilds(requestConfig, 0);
    } catch (error) {
      expect(error).toEqual(
        new Error('Error: connect ECONNREFUSED 127.0.0.1:20')
      );
    }
  });
});
