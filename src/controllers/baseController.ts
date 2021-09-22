import { Request, Response } from 'express';

import { AxiosResponse } from 'axios';
import RequestHelper from '@src/util/requestHelper';
import { TestlinkClient } from '@src/client/TestlinkClient';
import { TestlinkClientError } from '@src/client/error/TestlinkClientErrorFactory';

export interface ITestlinkClientParams {
  readonly testlinkApiKey: string | string[] | undefined;
  readonly testlinkPort: string | string[] | undefined;
  readonly testlinkUrl: string | string[] | undefined;
  readonly rpcPath?: string | string[] | undefined;
}

export type EndPointFunction = (
  headers: ITestlinkClientParams,
  testlinkClient: TestlinkClient
) => Promise<AxiosResponse>;

export abstract class BaseController {
  public static parseControllerHeaders(
    request: Partial<Request>
  ): ITestlinkClientParams {
    const headers = request.headers;
    if (headers) {
      const rpcPath = headers['rpc-path']
        ? { rpcPath: headers['rpc-path'] }
        : {};

      const controllerHeaders = {
        testlinkApiKey: headers['testlink-api-key'],
        testlinkPort: headers['testlink-port'],
        testlinkUrl: headers['testlink-url'],
        ...rpcPath,
      };

      return controllerHeaders;
    }
    throw new Error('Empty Headers to parse');
  }

  protected async handleController(
    response: Response,
    controllerFunction: () => void
  ): Promise<void> {
    try {
      await controllerFunction();
    } catch (error) {
      this.sendErrorResponse(response, error as TestlinkClientError);
    }
  }

  protected getRequestParam(
    request: Request,
    param: string
  ): string | string[] | undefined {
    const headers = request.headers;
    return headers[param];
  }

  protected sendSuccessResponse(
    response: Response,
    body: unknown,
    status = 200
  ): void {
    RequestHelper.sendSuccessResponse(response, body, status);
  }

  protected sendErrorResponse(
    response: Response,
    apiError: TestlinkClientError
  ): void {
    RequestHelper.sendErrorResponse(response, apiError);
  }
}
