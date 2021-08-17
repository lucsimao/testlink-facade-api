import {
  IUnnormalizedTestCase,
  TestCaseAdapter,
} from './util/adapters/testCaseAdapter';
import {
  IUnnormalizedTestProject,
  TestProjectAdapter,
} from './util/adapters/testProjectAdapter';

import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import { AxiosRequestConfig } from 'axios';
import { BuildAdapter } from '@src/client/util/adapters/buildAdapter';
import { IBuild } from '@src/models/IBuild';
import { ITestCase } from '@src/models/ITestCase';
import { ITestPlan } from '@src/models/ITestPlan';
import { ITestProject } from '@src/models/ITestProject';
import { ITestSuite } from '@src/models/ITestSuite';
import { TestPlanAdapter } from './util/adapters/testPlanAdapter';
import { TestSuiteAdapter } from '@src/client/util/adapters/testSuiteAdapter';

export class TestlinkClient {
  public async getMe(requestConfig: AxiosRequestConfig): Promise<unknown> {
    const route = '/whoAmI';
    return await AxiosClientHelper.getClientResponse<string>(
      requestConfig,
      route
    );
  }

  public async getTestProjects(
    requestConfig: AxiosRequestConfig,
    testProjectId?: number
  ): Promise<ITestProject[]> {
    const route = testProjectId
      ? `/testprojects/${testProjectId}`
      : '/testprojects';

    const testProjects =
      await AxiosClientHelper.getClientResponse<IUnnormalizedTestProject>(
        requestConfig,
        route
      );

    return new TestProjectAdapter().normalize(testProjects);
  }

  public async getTestPlans(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<ITestPlan[]> {
    const testlink = AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig.headers.testlinkUrl,
      requestConfig.headers.testlinkPort,
      requestConfig.headers.testlinkApiKey
    );

    const testPlans = await testlink.getProjectTestPlans({
      testprojectid: testProjectId,
    });

    return new TestPlanAdapter().normalize(testPlans);
  }

  public async getTestCases(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<ITestCase[]> {
    const testCases =
      await AxiosClientHelper.getClientResponse<IUnnormalizedTestCase>(
        requestConfig,
        `/testprojects/${testProjectId}/testcases`
      );
    return new TestCaseAdapter().normalize(testCases);
  }

  public async getBuilds(
    requestConfig: AxiosRequestConfig,
    testPlanId: number
  ): Promise<IBuild[]> {
    const testlink = AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig.headers.testlinkUrl,
      requestConfig.headers.testlinkPort,
      requestConfig.headers.testlinkApiKey
    );

    const builds = await testlink.getBuildsForTestPlan({
      testplanid: testPlanId,
    });

    return new BuildAdapter().normalize(builds);
  }

  public async getTestSuites(
    requestConfig: AxiosRequestConfig,
    testPlanId: number
  ): Promise<ITestSuite[]> {
    const testlink = AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig.headers.testlinkUrl,
      requestConfig.headers.testlinkPort,
      requestConfig.headers.testlinkApiKey
    );

    const testSuites = await testlink.getTestSuitesForTestPlan({
      testplanid: testPlanId,
    });
    return new TestSuiteAdapter().normalize(testSuites);
  }
}
