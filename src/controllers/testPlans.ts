import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { Params } from '@src/enums/Params';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('testPlans')
export class TestPlanController extends BaseController {
  /**
   * GET /testPlans
   * @tag TestPlans
   * @summary Get testPlans
   * @description Get the testPlans from a testProject
   * @paramComponent {TestlinkApiKey}
   * @paramComponent {TestlinkPort}
   * @paramComponent {TestlinkUrl}
   * @paramComponent {TestProjectId}
   * @response 200 - Success
   * @responseContent {TestProjects} 200.application/json
   * @responseComponent {BadRequest} 400
   * @responseComponent {Unauthorized} 401
   * @responseComponent {TooManyRequests} 429
   * @responseComponent {InternalServerError} 500
   */
  @Get('')
  public async getTestPlans(
    request: Request,
    response: Response
  ): Promise<void> {
    this.handleController(response, async () => {
      const testlinkClient = new TestlinkClient();
      const headers = BaseController.parseControllerHeaders(request);
      const testProjectId = this.getRequestParam(
        request,
        Params.TEST_PROJECT_ID
      );
      const clientResponse = await testlinkClient.getTestPlans(
        { headers },
        Number(testProjectId)
      );
      this.sendSuccessResponse(response, clientResponse, 200);
    });
  }
}
