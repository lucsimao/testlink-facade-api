import { Request, Response } from 'express';

import { BuildController } from '../../../controllers/builds';
import { IBuild } from '../../../models/IBuild';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('Builds Controller Tests', () => {
  it('should return build when getBuilds is called', async () => {
    const buildController = new BuildController();
    const fakeRequest = {
      headers: TestHelper.getFunctionalTestHeader(),
    } as Request;
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getBuilds = jest
      .spyOn(TestlinkClient.prototype, 'getBuilds')
      .mockReturnValueOnce(Promise.resolve([{} as IBuild]));

    await buildController.getBuilds(fakeRequest, fakeResponse);

    expect(getBuilds).toBeCalledTimes(1);
  });
});
