import { Request, Response } from 'express';

import { APIError } from '@src/util/errors/api-error';
import { AxiosResponse } from 'axios';
import { ILoggerParams } from '@src/util/logger/Logger';
import { TestlinkClient } from '@src/client/TestlinkClient';
import { TestlinkClientError } from '@src/client/error/TestlinkClientErrorFactory';
import logger from '@src/logger';

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
    logger.info({
      msg: `RESPONSE - status: ${status} - body: ${JSON.stringify(body)}`,
    });
    response.status(status).send(body);
  }

  protected sendErrorResponse(
    response: Response,
    apiError: TestlinkClientError
  ): void {
    logger.error(APIError.format(apiError) as ILoggerParams);
    response.status(apiError.statusCode || 500).send(APIError.format(apiError));
  }
}
