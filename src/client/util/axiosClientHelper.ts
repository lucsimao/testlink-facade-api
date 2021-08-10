import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosClientHelper {
  public static async getClientResponse(
    requestConfig: AxiosRequestConfig,
    routeName: string
  ): Promise<AxiosResponse> {
    this.setTestlinkApiKey(requestConfig);
    const response = await this.getAxiosResponse(requestConfig, routeName);
    return this.parseRequestResponse(response);
  }

  public static async postClientResponse(
    requestConfig: AxiosRequestConfig,
    routeName: string
  ): Promise<AxiosResponse> {
    this.setTestlinkApiKey(requestConfig);
    const response = await this.getAxiosResponse(requestConfig, routeName);
    return this.parseRequestResponse(response);
  }

  private static async getAxiosResponse(
    requestConfig: AxiosRequestConfig,
    route: string
  ): Promise<AxiosResponse> {
    const url = requestConfig.headers.testlinkUrl;
    return await axios.get(`${url}/${route}`, requestConfig);
  }

  private static setTestlinkApiKey(requestConfig: AxiosRequestConfig): void {
    requestConfig.headers.APIKEY = requestConfig.headers.testlinkApiKey;
  }

  private static parseRequestResponse(
    response: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const data = response.data;
    return data.item || data.items;
  }
}
