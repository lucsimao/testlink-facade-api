import { Request, Response } from 'express';

import { ITestCase } from '@src/models/ITestCase';
import { TestCaseController } from '@src/controllers/testCases';
import { TestHelper } from '@test/util/testHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';

describe('TestCases Controller Tests', () => {
  it('should return build when getTestCases is called', async () => {
    const buildController = new TestCaseController();
    const fakeRequest = {
      headers: TestHelper.getFunctionalTestHeader(),
    } as Request;
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getTestCases = jest
      .spyOn(TestlinkClient.prototype, 'getTestCases')
      .mockReturnValueOnce(Promise.resolve([{} as ITestCase]));

    await buildController.getTestCases(fakeRequest, fakeResponse);

    expect(getTestCases).toBeCalledTimes(1);
  });
});
