import { TestHelper } from '../../../../test/util/testHelper';
import { TestLink } from 'testlink-xmlrpc';
import { TestlinkClient } from '../../../client/TestlinkClient';
import { TestlinkClientErrorFactory } from '@src/client/error/TestlinkClientErrorFactory';

jest.mock('testlink-xmlrpc');

describe('TestlinkClient Tests', () => {
  describe('getMe Tests', () => {
    it('should call checkDevKey when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      const checkDevKey = jest
        .spyOn(TestLink.prototype, 'checkDevKey')
        .mockReturnValue(Promise.resolve(true));

      await testlinkClient.getMe(requestConfig);
      expect(checkDevKey).toBeCalledWith({
        devKey: '6e204ef53aecd003c19f2a89178ba60b',
      });
    });
  });

  describe('getTestProjects Tests', () => {
    it('should call getProjects when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      const getProjects = jest
        .spyOn(TestLink.prototype, 'getProjects')
        .mockReturnValue(Promise.resolve([]));

      await testlinkClient.getTestProjects(requestConfig);
      expect(getProjects).toBeCalledTimes(1);
    });
  });

  describe('getTestProjects Tests', () => {
    it('should call getProjectTestPlans when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      const getProjectTestPlans = jest
        .spyOn(TestLink.prototype, 'getProjectTestPlans')
        .mockReturnValue(Promise.resolve([]));

      await testlinkClient.getTestPlans(requestConfig, 1);
      expect(getProjectTestPlans).toBeCalledWith({ testprojectid: 1 });
    });
  });

  describe('getTestCases Tests', () => {
    it('should call getTestCasesForTestSuite when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      const getTestCasesForTestSuite = jest
        .spyOn(TestLink.prototype, 'getTestCasesForTestSuite')
        .mockReturnValue(Promise.resolve([]));

      await testlinkClient.getTestCases(requestConfig, 1);
      expect(getTestCasesForTestSuite).toBeCalledWith({
        details: 'full',
        testsuiteid: 1,
      });
    });
  });

  describe('getBuilds Tests', () => {
    it('should call getBuildsForTestPlan when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      const getBuildsForTestPlan = jest
        .spyOn(TestLink.prototype, 'getBuildsForTestPlan')
        .mockReturnValue(Promise.resolve([]));

      await testlinkClient.getBuilds(requestConfig, 1);
      expect(getBuildsForTestPlan).toBeCalledWith({ testplanid: 1 });
    });
  });

  describe('getTestSuites Tests', () => {
    it('should call getTestSuitesForTestPlan when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      const getTestSuitesForTestPlan = jest
        .spyOn(TestLink.prototype, 'getTestSuitesForTestPlan')
        .mockReturnValue(Promise.resolve([]));

      await testlinkClient.getTestSuites(requestConfig, 1);
      expect(getTestSuitesForTestPlan).toBeCalledWith({ testplanid: 1 });
    });
  });

  describe('callRPCMethod Tests', () => {
    it('should call checkDevKey when method is called', async () => {
      const requestConfig = TestHelper.getIntegrationTestHeader();
      const testlinkClient = new TestlinkClient();
      jest
        .spyOn(TestLink.prototype, 'checkDevKey')
        .mockReturnValue(Promise.reject(new Error('Fake Error')));

      const parseError = jest.spyOn(TestlinkClientErrorFactory, 'parseError');

      try {
        await testlinkClient.getMe(requestConfig);
        fail('it should not reach here');
      } catch (error) {
        expect(parseError).toBeCalledWith(new Error('Fake Error'));
        expect(error).toEqual(new Error('Fake Error'));
      }
    });
  });
});
