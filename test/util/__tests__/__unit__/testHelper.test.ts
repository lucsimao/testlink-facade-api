import { TestHelper } from '@test/util/testHelper';
import config from 'config';

describe('Test Helper tests', () => {
  it('should return integration params when getIntegrationParams is called', () => {
    const headers = TestHelper.getIntegrationTestHeader();
    expect(headers).toEqual({
      headers: {
        testlinkApiKey: config.get('App.testlink.apikey'),
        testlinkPort: config.get('App.testlink.port'),
        testlinkUrl: config.get('App.testlink.url'),
      },
    });
  });

  it('should return functional params when getFunctionalParams is called', () => {
    const headers = TestHelper.getFunctionalTestHeader();
    expect(headers).toEqual({
      headers: {
        ['testlink-api-key']: config.get('App.testlink.apikey'),
        ['testlink-url']: config.get('App.testlink.url'),
        ['testlink-port']: config.get('App.testlink.port'),
      },
    });
  });

  it('should return integration params when getIntegrationParams is called with headers', () => {
    const headers = TestHelper.getIntegrationTestHeader({
      testlinkApiKey: 'fakeTestlinkApiKey',
      testlinkPort: 'fakeTestlinkApiPort',
      testlinkUrl: 'fakeTestlinkApiUrl',
    });
    expect(headers).toEqual({
      headers: {
        testlinkApiKey: 'fakeTestlinkApiKey',
        testlinkPort: 'fakeTestlinkApiPort',
        testlinkUrl: 'fakeTestlinkApiUrl',
      },
    });
  });
});
