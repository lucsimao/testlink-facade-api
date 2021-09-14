import { Request, Response } from 'express';

import { ITestPlan } from '../../../models/ITestPlan';
import { Params } from '@src/enums/Params';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestPlanController } from '../../../controllers/testPlans';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('TestPlans Controller Tests', () => {
  it('should return build when getTestPlans is called', async () => {
    const buildController = new TestPlanController();
    const fakeRequest = {
      headers: {
        ...TestHelper.getFunctionalTestHeader().headers,
        [Params.TEST_PROJECT_ID]: 1,
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
    const getTestPlans = jest
      .spyOn(TestlinkClient.prototype, 'getTestPlans')
      .mockReturnValueOnce(Promise.resolve([{} as ITestPlan]));

    await buildController.getTestPlans(fakeRequest, fakeResponse);

    expect(getTestPlans).toBeCalledWith({ headers }, 1);
  });
});
