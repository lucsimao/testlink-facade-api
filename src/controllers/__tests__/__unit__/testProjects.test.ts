import { Request, Response } from 'express';

import { ITestProject } from '../../../models/ITestProject';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestProjectController } from '../../../controllers/testProjects';
import { TestlinkClient } from '../../../client/TestlinkClient';

describe('TestProjects Controller Tests', () => {
  it('should return build when getTestCasess is called', async () => {
    const buildController = new TestProjectController();
    const fakeRequest = {
      headers: TestHelper.getFunctionalTestHeader(),
    } as Request;
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const getTestProjects = jest
      .spyOn(TestlinkClient.prototype, 'getTestProjects')
      .mockReturnValueOnce(Promise.resolve([{} as ITestProject]));

    await buildController.getTestProjects(fakeRequest, fakeResponse);

    expect(getTestProjects).toBeCalledTimes(1);
  });
});
