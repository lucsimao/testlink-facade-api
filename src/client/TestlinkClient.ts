import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import { ITestProject } from '@src/models/ITestProject';
import { AxiosRequestConfig } from 'axios';
import { TestLink } from 'testlink-xmlrpc';
export class TestlinkClient {
  public async getTestProjects(
    requestConfig: AxiosRequestConfig,
    testProjectId?: number
  ): Promise<ITestProject[]> {
    const route = testProjectId
      ? `/testprojects/${testProjectId}`
      : '/testprojects';

    return await AxiosClientHelper.getClientResponse<ITestProject>(
      requestConfig,
      route
    );
  }

  public async getTestPlan(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<unknown[]> {
    return await AxiosClientHelper.getClientResponse(
      requestConfig,
      `/testprojects/${testProjectId}/testplans`
    );
  }

  public async getTestCases(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<unknown[]> {
    return await AxiosClientHelper.getClientResponse(
      requestConfig,
      `/testprojects/${testProjectId}/testcases`
    );
  }

  public async getBuilds(
    requestConfig: AxiosRequestConfig,
    testPlan: ITestPlan
  ): Promise<unknown[]> {
    return await AxiosClientHelper.getClientResponse(
      requestConfig,
      `/testplans/${testPlan.apikey}/builds`
    );
  }

  public async getTestSuite(
    requestConfig: AxiosRequestConfig,
    testPlanId: number
  ): Promise<unknown> {
    const testlink = this.getTestlinkRPCConfig(
      requestConfig.headers.testlinkUrl,
      requestConfig.headers.testlinkPort,
      requestConfig.headers.testlinkApiKey
    );

    const testSuitePlan = await testlink.getTestSuitesForTestPlan({
      testplanid: testPlanId,
    });

    return testSuitePlan;
  }

  private getTestlinkRPCConfig(host: string, port: number, apiKey: string) {
    return new TestLink({
      host: host,
      port: port,
      secure: true,
      apiKey: apiKey,
    });
  }
}
