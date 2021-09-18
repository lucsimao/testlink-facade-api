import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('testProjects')
export class TestProjectController extends BaseController {
  /**
   * GET /testProjects
   * @tag TestProjects
   * @summary Get testProject
   * @description Get the testProjects from a user
   * @paramComponent {TestlinkApiKey}
   * @paramComponent {TestlinkPort}
   * @paramComponent {TestlinkUrl}
   * @response 200 - Success
   * @responseContent {TestProjects} 200.application/json
   * @responseComponent {BadRequest} 400
   * @responseComponent {Unauthorized} 401
   * @responseComponent {TooManyRequests} 429
   * @responseComponent {InternalServerError} 500
   */
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
