import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosClientHelper {
  public static async getClientResponse<T>(
    requestConfig: AxiosRequestConfig,
    routeName: string
  ): Promise<T[]> {
    this.setTestlinkApiKey(requestConfig);
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

  private static parseRequestResponse<T>(
    response: AxiosRequestConfig
  ): Promise<T[]> {
    const data = response.data;
    return data.item || data.items;
  }
}
