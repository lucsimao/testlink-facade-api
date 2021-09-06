import { AxiosRequestConfig } from 'axios';
import { BuildAdapter } from '@src/client/util/adapters/buildAdapter';
import { ClientXMLRPCHelper } from '@src/client/util/clientXMLRPCHelper';
import { Details } from 'testlink-xmlrpc/build/constants';
import { IBuild } from '@src/models/IBuild';
import { ITestCase } from '@src/models/ITestCase';
import { ITestPlan } from '@src/models/ITestPlan';
import { ITestProject } from '@src/models/ITestProject';
import { ITestSuite } from '@src/models/ITestSuite';
import { TestCaseAdapter } from './util/adapters/testCaseAdapter';
import { TestLink } from 'testlink-xmlrpc';
import { TestPlanAdapter } from './util/adapters/testPlanAdapter';
import { TestProjectAdapter } from './util/adapters/testProjectAdapter';
import { TestSuiteAdapter } from '@src/client/util/adapters/testSuiteAdapter';
import { TestlinkClientError } from './error/TestlinkClientError';

export class TestlinkClient {
  public async callRPCMethod<T>(
    requestConfig: AxiosRequestConfig,
    callback: (testlink: TestLink) => Promise<T>
  ): Promise<T> {
    const testlink = await ClientXMLRPCHelper.getTestlinkRPCConfig(
      requestConfig
    );
    try {
      return await callback(testlink);
    } catch (error) {
      throw new TestlinkClientError(error as Error);
    }
  }

  public async getMe(requestConfig: AxiosRequestConfig): Promise<unknown> {
    return this.callRPCMethod<unknown>(requestConfig, async (testlink) => {
      return await testlink.checkDevKey({
        devKey: requestConfig.headers?.testlinkApiKey,
      });
    });
  }

  public async getTestProjects(
    requestConfig: AxiosRequestConfig
  ): Promise<ITestProject[]> {
    return this.callRPCMethod<ITestProject[]>(
      requestConfig,
      async (testlink) => {
        const testProjects = await testlink.getProjects();

        return new TestProjectAdapter().normalize(testProjects);
      }
    );
  }

  public async getTestPlans(
    requestConfig: AxiosRequestConfig,
    testProjectId: number
  ): Promise<ITestPlan[]> {
    return this.callRPCMethod<ITestPlan[]>(requestConfig, async (testlink) => {
      const testPlans = await testlink.getProjectTestPlans({
        testprojectid: testProjectId,
      });

      return new TestPlanAdapter().normalize(testPlans);
    });
  }

  public async getTestCases(
    requestConfig: AxiosRequestConfig,
    testSuiteId: number
  ): Promise<ITestCase[]> {
    return this.callRPCMethod<ITestCase[]>(requestConfig, async (testlink) => {
      const testCases = await testlink.getTestCasesForTestSuite({
        testsuiteid: testSuiteId,
        details: Details.FULL,
      });

      return new TestCaseAdapter().normalize(testCases);
    });
  }

  public async getBuilds(
    requestConfig: AxiosRequestConfig,
    testPlanId: number
  ): Promise<IBuild[]> {
    return this.callRPCMethod<IBuild[]>(requestConfig, async (testlink) => {
      const builds = await testlink.getBuildsForTestPlan({
        testplanid: testPlanId,
      });

      return new BuildAdapter().normalize(builds);
    });
  }

  public async getTestSuites(
    requestConfig: AxiosRequestConfig,
    testPlanId: number
  ): Promise<ITestSuite[]> {
    return this.callRPCMethod<ITestSuite[]>(requestConfig, async (testlink) => {
      const testSuites = await testlink.getTestSuitesForTestPlan({
        testplanid: testPlanId,
      });
      return new TestSuiteAdapter().normalize(testSuites);
    });
  }
}
