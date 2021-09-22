import { APIError } from './errors/api-error';
import { Response } from 'express';
import { TestlinkClientError } from '@src/client/error/TestlinkClientErrorFactory';
import logger from '@src/logger';

export default class RequestHelper {
  public static sendSuccessResponse(
    response: Response,
    body: unknown,
    status = 200
  ): void {
    logger.info(`RESPONSE - status: ${status} - body: ${JSON.stringify(body)}`);
    response.status(status).send(body);
  }

  public static sendErrorResponse(
    response: Response,
    apiError: TestlinkClientError
  ): void {
    logger.error(apiError);
    response.status(apiError.statusCode || 500).send(APIError.format(apiError));
  }
}
