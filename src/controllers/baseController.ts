import { TestlinkClient } from '@src/client/TestlinkClient';
import { AxiosResponse } from 'axios';
import { Request } from 'express';

export interface ITestlinkConfigParams {
  readonly testlinkApiKey: string | string[] | undefined;
  readonly testlinkUrl: string | string[] | undefined;
}

export type EndPointFunction = (
  // eslint-disable-next-line no-unused-vars
  headers: ITestlinkConfigParams,
  // eslint-disable-next-line no-unused-vars
  testlinkClient: TestlinkClient
) => Promise<AxiosResponse>;

export abstract class BaseController {
  protected getControllerHeaders(request: Request): ITestlinkConfigParams {
    return {
      testlinkApiKey: request.headers?.['testlink-api-key'],
      testlinkUrl: request.headers?.['testlink-url'],
    };
  }
}
