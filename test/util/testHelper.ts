import { AxiosRequestConfig } from 'axios';
import config from 'config';

export interface ITestlinkControllerParams {
  ['testlink-api-key']: string;
  ['testlink-url']: string;
  ['testlink-port']: string;
}

export class TestHelper {
  public static getIntegrationTestHeader(header?: {
    testlinkApiKey?: string;
    testlinkPort?: string;
    testlinkUrl?: string;
  }): AxiosRequestConfig {
    const headers = {
      testlinkApiKey:
        header?.testlinkApiKey || config.get('App.testlink.apikey'),
      testlinkPort: header?.testlinkPort || config.get('App.testlink.port'),
      testlinkUrl: header?.testlinkUrl || config.get('App.testlink.url'),
    };
    return { headers };
  }

  public static getFunctionalTestHeader(): AxiosRequestConfig {
    const headers = {
      ['testlink-api-key']: config.get('App.testlink.apikey'),
      ['testlink-url']: config.get('App.testlink.url'),
      ['testlink-port']: config.get('App.testlink.port'),
    };

    return { headers };
  }
}
