import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { Params } from '@src/enums/Params';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('testSuites')
export class TestSuiteController extends BaseController {
  /**
   * GET /testSuites
   * @tag TestSuites
   * @summary Get testSuites
   * @description Get the testSuites from a testPlan
   * @paramComponent {TestlinkApiKey}
   * @paramComponent {TestlinkPort}
   * @paramComponent {TestlinkUrl}
   * @paramComponent {TestPlanId}
   * @response 200 - Success
   * @responseContent {TestSuites} 200.application/json
   * @responseComponent {BadRequest} 400
   * @responseComponent {Unauthorized} 401
   * @responseComponent {TooManyRequests} 429
   * @responseComponent {InternalServerError} 500
   */
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
      this.sendSuccessResponse(response, clientResponse, 200);
    });
  }
}
