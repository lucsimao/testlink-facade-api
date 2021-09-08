import { Request, Response } from 'express';

import { ITestPlan } from '@src/models/ITestPlan';
import { TestHelper } from '@test/util/testHelper';
import { TestPlanController } from '@src/controllers/testPlans';
import { TestlinkClient } from '@src/client/TestlinkClient';

describe('TestPlans Controller Tests', () => {
  it('should return build when getTestCasess is called', async () => {
    const buildController = new TestPlanController();
    const fakeRequest = {
      headers: TestHelper.getFunctionalTestHeader(),
    } as Request;
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getTestPlans = jest
      .spyOn(TestlinkClient.prototype, 'getTestPlans')
      .mockReturnValueOnce(Promise.resolve([{} as ITestPlan]));

    await buildController.getTestPlans(fakeRequest, fakeResponse);

    expect(getTestPlans).toBeCalledTimes(1);
  });
});
