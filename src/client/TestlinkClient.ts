import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import { AxiosRequestConfig } from 'axios';
import { BuildAdapter } from '@src/client/util/adapters/buildAdapter';
import { IBuild } from '@src/models/IBuild';
import { ITestCase } from '@src/models/ITestCase';
import { ITestPlan } from '@src/models/ITestPlan';
import { ITestProject } from '@src/models/ITestProject';
import { ITestSuite } from '@src/models/ITestSuite';
import { TestCaseAdapter } from './util/adapters/testCaseAdapter';
import { TestPlanAdapter } from './util/adapters/testPlanAdapter';
import { TestProjectAdapter } from './util/adapters/testProjectAdapter';
import { TestSuiteAdapter } from '@src/client/util/adapters/testSuiteAdapter';

export class TestlinkClient {
  public async getMe(requestConfig: AxiosRequestConfig): Promise<unknown> {
    const testlink = await AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig
    );
    return await testlink.checkDevKey({
      devKey: requestConfig.headers?.testlinkApiKey,
    });
  }

  public async getTestProjects(
    requestConfig: AxiosRequestConfig
  ): Promise<ITestProject[]> {
    const testlink = await AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig
    );

    const testProjects = await testlink.getProjects();

    return new TestProjectAdapter().normalize(testProjects);
  }

  public async getTestPlans(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<ITestPlan[]> {
    const testlink = await AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig
    );

    const testPlans = await testlink.getProjectTestPlans({
      testprojectid: testProjectId,
    });

    return new TestPlanAdapter().normalize(testPlans);
  }

  public async getTestCases(
    requestConfig: AxiosRequestConfig,
    testSuiteId: number
  ): Promise<ITestCase[]> {
    const testlink = await AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig
    );

    const testCases = await testlink.getTestCasesForTestSuite({
      testsuiteid: testSuiteId,
    });

    return new TestCaseAdapter().normalize(testCases);
  }

  public async getBuilds(
    requestConfig: AxiosRequestConfig,
    testPlanId: number
  ): Promise<IBuild[]> {
    const testlink = await AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig
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
    const testlink = await AxiosClientHelper.getTestlinkRPCConfig(
      requestConfig
    );

    const testSuites = await testlink.getTestSuitesForTestPlan({
      testplanid: testPlanId,
    });
    return new TestSuiteAdapter().normalize(testSuites);
  }
}
