import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { Params } from '@src/enums/Params';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('testSuites')
export class TestSuiteController extends BaseController {
  @Get('')
  public async getTestSuites(
    request: Request,
    response: Response
  ): Promise<void> {
    this.handleController(response, async () => {
      const testlinkClient = new TestlinkClient();
      const headers = BaseController.parseControllerHeaders(request);
      const testPlanId = this.getRequestParam(request, Params.TEST_PLAN_ID);

      const clientResponse = await testlinkClient.getTestSuites(
        { headers },
        Number(testPlanId)
      );
      this.sendSuccessResponse(response, 200, clientResponse);
    });
  }
}
