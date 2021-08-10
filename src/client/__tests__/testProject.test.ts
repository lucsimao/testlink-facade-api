import config from 'config';
import { TestlinkClient } from '../TestlinkClient';
import unitTestProjectFixture from './fixtures/unitTestProjectFixture.json';

describe('TestProject Test', () => {
  it('should return the normalized testProject from Testlink Service', async () => {
    const testlinkClient = new TestlinkClient();
    const headers = {
      testlinkApiKey: config.get('App.testlink.apikey'),
      testlinkUrl: config.get('App.testlink.url'),
    };
    const response = await testlinkClient.getTestProjects({ headers });
    expect(response).toEqual(unitTestProjectFixture);
  });
});
