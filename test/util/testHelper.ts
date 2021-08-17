import { AxiosRequestConfig } from 'axios';
import config from 'config';

export interface ITestlinkControllerParams {
  ['testlink-api-key']: string;
  ['testlink-url']: string;
  ['testlink-port']: string;
}

export class TestHelper {
  public static getIntegrationTestHeader(): AxiosRequestConfig {
    const headers = {
      testlinkApiKey: config.get('App.testlink.apikey'),
      testlinkPort: config.get('App.testlink.port'),
      testlinkUrl: config.get('App.testlink.url'),
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
