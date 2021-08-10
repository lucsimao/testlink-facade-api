import { Controller, Get } from '@overnightjs/core';
import { TestlinkClient } from '@src/client/TestlinkClient';
import { Request, Response } from 'express';
import { BaseController } from './baseController';

@Controller('testProject')
export class TestProjectController extends BaseController {
  @Get('')
  public async getTestProject(
    request: Request,
    response: Response
  ): Promise<void> {
    const testlinkClient = new TestlinkClient();
    const headers = this.getControllerHeaders(request);

    const clientResponse = await testlinkClient.getTestProjects({ headers });
    response.status(200).send(clientResponse);
  }
}
