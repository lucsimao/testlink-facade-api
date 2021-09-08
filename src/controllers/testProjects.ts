import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('testProjects')
export class TestProjectController extends BaseController {
  @Get('')
  public async getTestProjects(
    request: Request,
    response: Response
  ): Promise<void> {
    this.handleController(response, async () => {
      const testlinkClient = new TestlinkClient();
      const headers = BaseController.parseControllerHeaders(request);

      const clientResponse = await testlinkClient.getTestProjects({ headers });
      this.sendSuccessResponse(response, clientResponse, 200);
    });
  }
}
