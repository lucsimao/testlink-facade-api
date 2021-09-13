import { Request, Response } from 'express';

import { ITestSuite } from '../../../models/ITestSuite';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestSuiteController } from '../../../controllers/testSuites';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('TestSuites Controller Tests', () => {
  it('should return build when getTestCasess is called', async () => {
    const buildController = new TestSuiteController();
    const fakeRequest = {
      headers: TestHelper.getFunctionalTestHeader(),
    } as Request;
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getTestSuites = jest
      .spyOn(TestlinkClient.prototype, 'getTestSuites')
      .mockReturnValueOnce(Promise.resolve([{} as ITestSuite]));

    await buildController.getTestSuites(fakeRequest, fakeResponse);

    expect(getTestSuites).toBeCalledTimes(1);
  });
});
