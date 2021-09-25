import { APIError } from './errors/api-error';
import { ILoggerParams } from './logger/Logger';
import { Response } from 'express';
import { TestlinkClientError } from '@src/client/error/TestlinkClientErrorFactory';
import logger from '@src/logger';

export default class RequestHelper {
  public static sendSuccessResponse(
    response: Response,
    body: unknown,
    status = 200
  ): void {
    logger.info({
      msg: `RESPONSE - status: ${status} - body: ${JSON.stringify(body)}`,
    });
    response.status(status).send(body);
  }

  public static sendErrorResponse(
    response: Response,
    apiError: TestlinkClientError
  ): void {
    logger.error(APIError.format(apiError) as ILoggerParams);
    response.status(apiError.statusCode || 500).send(APIError.format(apiError));
  }
}
