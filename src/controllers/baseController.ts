import { APIError, IError } from '@src/util/errors/api-error';
import { Request, Response } from 'express';

import { AxiosResponse } from 'axios';
import { ClassMiddleware } from '@overnightjs/core';
import { TestlinkClient } from '@src/client/TestlinkClient';
import { authMiddleware } from '@src/middlewares/authMiddleware';

export interface ITestlinkClientParams {
  readonly testlinkApiKey: string | string[] | undefined;
  readonly testlinkPort: string | string[] | undefined;
  readonly testlinkUrl: string | string[] | undefined;
}

export type EndPointFunction = (
  headers: ITestlinkClientParams,
  testlinkClient: TestlinkClient
) => Promise<AxiosResponse>;

@ClassMiddleware(authMiddleware)
export abstract class BaseController {
  public static parseControllerHeaders(
    request: Partial<Request>
  ): ITestlinkClientParams {
    return {
      testlinkApiKey: request.headers?.['testlink-api-key'],
      testlinkPort: request.headers?.['testlink-port'],
      testlinkUrl: request.headers?.['testlink-url'],
    };
  }

  protected async handleController(
    response: Response,
    controllerFunction: () => void
  ): Promise<void> {
    try {
      await controllerFunction();
    } catch (error) {
      this.sendErrorResponse(response, error);
    }
  }

  protected getRequestParam(
    request: Request,
    param: string
  ): string | string[] | undefined {
    const headers = request.headers;
    return headers[param];
  }

  protected sendErrorResponse(response: Response, apiError: IError): Response {
    return response
      .status(apiError.code || 500)
      .send(APIError.format(apiError));
  }
}
