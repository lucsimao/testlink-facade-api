import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { BaseController } from './baseController';
import { Params } from '@src/enums/Params';
import { TestlinkClient } from '@src/client/TestlinkClient';

@Controller('testCases')
export class TestCaseController extends BaseController {
  /**
   * GET /testCases
   * @tag TestCases
   * @summary Get testCases
   * @description Get the testCases from a testSuite
   * @paramComponent {TestlinkApiKey}
   * @paramComponent {TestlinkPort}
   * @paramComponent {TestlinkUrl}
   * @paramComponent {TestSuiteId}
   * @response 200 - Success
   * @responseContent {TestCases} 200.application/json
   * @responseComponent {BadRequest} 400
   * @responseComponent {Unauthorized} 401
   * @responseComponent {TooManyRequests} 429
   * @responseComponent {InternalServerError} 500
   */
  @Get('')
  public async getTestCases(
    request: Request,
    response: Response
  ): Promise<void> {
    this.handleController(response, async () => {
      const testlinkClient = new TestlinkClient();
      const headers = BaseController.parseControllerHeaders(request);
      const testSuiteId = this.getRequestParam(request, Params.TEST_SUITE_ID);

      const clientResponse = await testlinkClient.getTestCases(
        { headers },
        Number(testSuiteId)
      );
      this.sendSuccessResponse(response, clientResponse, 200);
    });
  }
}
