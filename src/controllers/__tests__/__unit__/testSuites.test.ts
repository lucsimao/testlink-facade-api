import { Request, Response } from 'express';

import { ITestSuite } from '../../../models/ITestSuite';
import { Params } from '@src/enums/Params';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestSuiteController } from '../../../controllers/testSuites';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('TestSuites Controller Tests', () => {
  it('should return build when getTestSuites is called', async () => {
    const buildController = new TestSuiteController();
    const fakeRequest = {
      headers: {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_PLAN_ID]: 1,
      },
    } as Request;
    const headers = {
      testlinkApiKey: '6e204ef53aecd003c19f2a89178ba60b',
      testlinkPort: 80,
      testlinkUrl: 'localhost',
    };
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getTestSuites = jest
      .spyOn(TestlinkClient.prototype, 'getTestSuites')
      .mockReturnValueOnce(Promise.resolve([{} as ITestSuite]));

    await buildController.getTestSuites(fakeRequest, fakeResponse);

    expect(getTestSuites).toBeCalledWith({ headers }, 1);
  });
});
