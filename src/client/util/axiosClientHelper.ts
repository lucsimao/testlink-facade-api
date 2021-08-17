import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TestLink } from 'testlink-xmlrpc';

export class AxiosClientHelper {
  public static getTestlinkRPCConfig(
    host: string,
    port: number,
    apiKey: string
  ): TestLink {
    return new TestLink({
      host: host,
      port: port,
      secure: true,
      apiKey: apiKey,
    });
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
    requestConfig.headers.APIKEY = requestConfig.headers.testlinkApiKey;
  }

  private static setTestlinkUrl(requestConfig: AxiosRequestConfig): void {
    const headers = requestConfig.headers;
    headers.testlinkUrl = this.parseRestURL(
      headers.testlinkUrl,
      headers.testlinkPort
    );
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
