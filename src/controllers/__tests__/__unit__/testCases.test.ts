import { Request, Response } from 'express';

import { ITestCase } from '../../../models/ITestCase';
import { Params } from '@src/enums/Params';
import { TestCaseController } from '../../../controllers/testCases';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('TestCases Controller Tests', () => {
  it('should return build when getTestCases is called', async () => {
    const buildController = new TestCaseController();
    const fakeRequest = {
      headers: {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_SUITE_ID]: 1,
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
    const getTestCases = jest
      .spyOn(TestlinkClient.prototype, 'getTestCases')
      .mockReturnValueOnce(Promise.resolve([{} as ITestCase]));

    await buildController.getTestCases(fakeRequest, fakeResponse);

    expect(getTestCases).toBeCalledWith({ headers }, 1);
  });
});
