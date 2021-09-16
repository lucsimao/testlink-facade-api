import { Request, Response } from 'express';

import { ITestProject } from '../../../models/ITestProject';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestProjectController } from '../../../controllers/testProjects';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('TestProjects Controller Tests', () => {
  it('should return build when getTestProjects is called', async () => {
    const buildController = new TestProjectController();
    const fakeRequest = {
      headers: { ...TestHelper.getFunctionalTestHeader().headers },
    } as Request;
    const headers = {
      testlinkApiKey: '6e204ef53aecd003c19f2a89178ba60b',
      testlinkPort: 80,
      testlinkUrl: 'localhost',
    };
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getTestProjects = jest
      .spyOn(TestlinkClient.prototype, 'getTestProjects')
      .mockReturnValueOnce(Promise.resolve([{} as ITestProject]));

    await buildController.getTestProjects(fakeRequest, fakeResponse);

    expect(getTestProjects).toBeCalledWith({ headers });
  });
});
