import { TestlinkClient } from '@src/client/TestlinkClient';
import config from 'config';
const unitBuildFixture = {
  '1': {
    active: '1',
    closed_on_date: null,
    creation_ts: '2021-08-03 04:07:12',
    id: '1',
    is_open: '1',
    name: 'build-example',
    notes: '',
    release_date: null,
    testplan_id: '2',
  },
};

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
        id: 1,
        testProjectId: 1,
        name: '',
        apiKey:
          'e670def31dcc2a19a074cf60a690c9db9e914d85e6cbbf5058d556f993e6e8b4',
      }
    );
    expect(response).toEqual(unitBuildFixture);
  });
});
