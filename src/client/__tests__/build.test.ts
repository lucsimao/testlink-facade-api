import { TestlinkClient } from '../TestlinkClient';
import config from 'config';
import unitBuildFixture from './fixtures/unitBuildFixture.json';

describe('Build Test', () => {
  it('should return the normalized build from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const headers = {
      testlinkApiKey: config.get('App.testlink.apikey'),
      testlinkUrl: config.get('App.testlink.url'),
    };
    const response = await testlinkClient.getBuilds(
      { headers },
      {
        apikey:
          'e670def31dcc2a19a074cf60a690c9db9e914d85e6cbbf5058d556f993e6e8b4',
      }
    );
    expect(response).toEqual(unitBuildFixture);
  });
});
