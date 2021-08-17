import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { Params } from '@src/enums/Params';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('builds')
export class BuildController extends BaseController {
  @Get('')
  public async getBuilds(request: Request, response: Response): Promise<void> {
    this.handleController(response, async () => {
      const testlinkClient = new TestlinkClient();
      const headers = BaseController.parseControllerHeaders(request);
      const testPlanId = this.getRequestParam(request, Params.TEST_PLAN_ID);

      const clientResponse = await testlinkClient.getBuilds(
        { headers },
        Number(testPlanId)
      );
      response.status(200).send(clientResponse);
    });
  }
}