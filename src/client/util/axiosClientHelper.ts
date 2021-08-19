import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TestLink } from 'testlink-xmlrpc';
import logger from '@src/logger';

export class AxiosClientHelper {
  /**
   * Returns a instance of Testlink xmlrpc
   *
   * @param requestConfig - AxiosRequestConfig with following params
   * @param requestConfig.headers.testlinkUrl  - Testlink server ip
   * @param requestConfig.headers.testlinkPort - Testlink server port
   * @param requestConfig.headers.testlinkApiKey - Testlink server user api key
   * @param [requestConfig.headers.rpcPath] - (Optional) custom Testlink rpcPath, example: 'testlink/lib/api/xmlrpc/v1/xmlrpc.php',
   */
  public static async getTestlinkRPCConfig(
    requestConfig: AxiosRequestConfig
  ): Promise<TestLink> {
    const testlink = new TestLink({
      host: requestConfig.headers?.testlinkUrl,
      port: requestConfig.headers?.testlinkPort,
      secure: true,
      apiKey: requestConfig.headers?.testlinkApiKey,
      rpcPath: requestConfig.headers?.rpcPath,
    });
    logger.info(
      `Connected to Testlink XMLRPC: ${await testlink.testLinkVersion()}`
    );
    return testlink;
  }

  public static async getClientResponse<T>(
    requestConfig: AxiosRequestConfig,
    routeName: string
  ): Promise<T[]> {
    this.setTestlinkApiKey(requestConfig);
    this.setTestlinkUrl(requestConfig);
    const response = await this.getAxiosResponse<T>(requestConfig, routeName);
    return this.parseRequestResponse<T>(response);
  }

  public static async postClientResponse<T>(
    requestConfig: AxiosRequestConfig,
    routeName: string
  ): Promise<T[]> {
    this.setTestlinkApiKey(requestConfig);
    const response = await this.getAxiosResponse(requestConfig, routeName);
    return this.parseRequestResponse<T>(response);
  }

  private static async getAxiosResponse<T>(
    requestConfig: AxiosRequestConfig,
    route: string
  ): Promise<AxiosResponse> {
    const url = requestConfig.headers.testlinkUrl;
    return await axios.get<T>(`${url}/${route}`, requestConfig);
  }

  private static setTestlinkApiKey(requestConfig: AxiosRequestConfig): void {
    const headers = requestConfig.headers;
    if (headers) {
      requestConfig.headers.APIKEY = requestConfig.headers?.testlinkApiKey;
    }
  }

  private static setTestlinkUrl(requestConfig: AxiosRequestConfig): void {
    const headers = requestConfig.headers;
    if (headers) {
      headers.testlinkUrl = this.parseRestURL(
        headers.testlinkUrl,
        headers.testlinkPort
      );
    }
  }

  private static parseRestURL(ip: string, port: number): string {
    return `http://${ip}:${port}/lib/api/rest/v2`;
  }

  private static parseRequestResponse<T>(
    response: AxiosRequestConfig
  ): Promise<T[]> {
    const data = response.data;
    return data.item || data.items || data;
  }
}
