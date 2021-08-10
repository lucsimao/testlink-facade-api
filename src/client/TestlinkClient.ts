import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ITestProject {
  readonly id: number;
  readonly name: string;
  readonly apikey: string;
  readonly prefix: string;
}

export interface ITestPlan {
  readonly id?: string;
  readonly apikey: string;
}

export class TestlinkClient {
  public async getTestProjects(
    requestConfig: AxiosRequestConfig,
    testProjectId?: number
  ): Promise<AxiosResponse> {
    const route = testProjectId
      ? `/testprojects/${testProjectId}`
      : '/testprojects';

    return await AxiosClientHelper.getClientResponse(requestConfig, route);
  }

  public async getTestPlan(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<AxiosResponse> {
    return await AxiosClientHelper.getClientResponse(
      requestConfig,
      `/testprojects/${testProjectId}/testplans`
    );
  }

  public async getTestCases(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<AxiosResponse> {
    return await AxiosClientHelper.getClientResponse(
      requestConfig,
      `/testprojects/${testProjectId}/testcases`
    );
  }

  public async getBuilds(
    requestConfig: AxiosRequestConfig,
    testPlan: ITestPlan
  ): Promise<AxiosResponse> {
    return await AxiosClientHelper.getClientResponse(
      requestConfig,
      `/testplans/${testPlan.apikey}/builds`
    );
  }
}
