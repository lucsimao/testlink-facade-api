import RequestHelper from '@src/util/requestHelper';
import { Response } from 'express';
import { TestlinkClientError } from '@src/client/error/TestlinkClientErrorFactory';
import logger from '@src/logger';

describe('sendSuccessResponse Tests', () => {
  it('should call response.send when sucessResponse is called', () => {
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const fakeApiError = new TestlinkClientError(new Error('Fake Error'));
    const loggerInfo = jest.spyOn(logger, 'info');

    RequestHelper.sendSuccessResponse(fakeResponse, fakeApiError);

    expect(loggerInfo).toBeCalledWith({
      msg: `RESPONSE - status: 200 - body: ${JSON.stringify(fakeApiError)}`,
    });
    expect(fakeResponse.status).toBeCalled();
  });
});

describe('sendErrorResponse Tests', () => {
  it('should call status with 500 when receive invalid statusCode apiError', () => {
    const fakeResponse = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    } as unknown as Response;
    const status = jest.spyOn(fakeResponse, 'status');
    const fakeApiError = new Error('');

    RequestHelper.sendErrorResponse(
      fakeResponse,
      fakeApiError as TestlinkClientError
    );

    expect(status).toBeCalledWith(500);
  });
});
