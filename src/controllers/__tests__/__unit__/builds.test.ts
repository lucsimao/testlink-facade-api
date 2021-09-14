import { Request, Response } from 'express';

import { BuildController } from '../../../controllers/builds';
import { IBuild } from '../../../models/IBuild';
import { Params } from '@src/enums/Params';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('Builds Controller Tests', () => {
  it('should return build when getBuilds is called', async () => {
    const buildController = new BuildController();
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
    const getBuilds = jest
      .spyOn(TestlinkClient.prototype, 'getBuilds')
      .mockReturnValueOnce(Promise.resolve([{} as IBuild]));

    await buildController.getBuilds(fakeRequest, fakeResponse);

    expect(getBuilds).toBeCalledWith({ headers }, 1);
  });
});
