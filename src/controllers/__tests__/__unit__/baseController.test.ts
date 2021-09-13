/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { BaseController } from '../../../controllers/baseController';
import { TestHelper } from '../../../../test/util/testHelper';
import { TestlinkClientError } from '../../../client/error/TestlinkClientErrorFactory';

class ConcreteController extends BaseController {
  public async publicHandleController(
    response: Response,
    controllerFunction: () => void
  ) {
    return await this.handleController(response, controllerFunction);
  }

  public publicGetRequestParams(request: Request, param: string) {
    return this.getRequestParam(request, param);
  }

  public publicSendSuccessResponse(
    response: Response,
    body: unknown,
    status?: number
  ): void {
    return this.sendSuccessResponse(response, body, status);
  }

  public publicSendErrorResponse(
    response: Response,
    apiError: TestlinkClientError
  ): void {
    return this.sendErrorResponse(response, apiError);
  }
}

describe('baseController Tests', () => {
  describe('parseControllerHeaders Tests', () => {
    it('should return parsedControllerHeaders when call parseControllerHeaders with valid params without rpcPath', () => {
      const requestParams = TestHelper.getFunctionalTestHeader();

      const result = BaseController.parseControllerHeaders(requestParams);

      expect(result).toEqual({
        testlinkApiKey: '6e204ef53aecd003c19f2a89178ba60b',
        testlinkPort: 80,
        testlinkUrl: 'localhost',
      });
    });

    it('should return parsedControllerHeaders when call parseControllerHeaders with RPCPath', () => {
      const requestParams = {
        headers: {
          ...TestHelper.getFunctionalTestHeader().headers,
          ['rpc-path']: 'fakeRPCPath',
        },
      };

      const result = BaseController.parseControllerHeaders(requestParams);

      expect(result).toEqual({
        testlinkApiKey: '6e204ef53aecd003c19f2a89178ba60b',
        testlinkPort: 80,
        testlinkUrl: 'localhost',
        rpcPath: 'fakeRPCPath',
      });
    });

    it('should return parsedControllerHeaders when call parseControllerHeaders with empty params', () => {
      const requestParams = {};

      try {
        BaseController.parseControllerHeaders(requestParams);
      } catch (error) {
        expect(error).toEqual(new Error('Empty Headers to parse'));
      }
    });
  });
  describe('handleController Tests', () => {
    it('should return controllerFunction when receive a valid handleControllerCall', async () => {
      const concreteController = new ConcreteController();
      const controllerFunction = jest.fn();

      await concreteController.publicHandleController(
        {} as Response,
        controllerFunction
      );

      expect(controllerFunction).toBeCalled();
    });

    it('should call sendErrorResponse when controllerFunction throw a error', async () => {
      const concreteController = new ConcreteController();
      const controllerFunction = () => {
        throw new Error('fakeError');
      };
      const sendErrorResponse = jest
        .spyOn(ConcreteController.prototype as any, 'sendErrorResponse')
        .mockReturnValueOnce('ok');

      await concreteController.publicHandleController(
        {} as Response,
        controllerFunction
      );

      expect(sendErrorResponse).toBeCalledTimes(1);
    });
  });
  describe('getRequestParam Tests', () => {
    it('should return params when getRequestParams is called', () => {
      const fakeRequest = { headers: { fakeParam: '' } };
      const fakeParam = 'fakeParam';
      const concreteController = new ConcreteController();

      const result = concreteController.publicGetRequestParams(
        fakeRequest as unknown as Request,
        fakeParam
      );

      expect(result).toBe('');
    });
  });

  describe('sendSuccessResponse Tests', () => {
    it('should call response.send when sucessResponse is called', () => {
      const fakeResponse = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      } as unknown as Response;
      const fakeApiError = new TestlinkClientError(new Error('Fake Error'));
      const concreteController = new ConcreteController();

      concreteController.publicSendSuccessResponse(fakeResponse, fakeApiError);

      expect(fakeResponse.status).toBeCalled();
    });
  });

  describe('sendErrorResponse Tests', () => {
    it('should call status with 500 when receive invalid statusCode apiError', () => {
      const concreteController = new ConcreteController();
      const fakeResponse = {
        status: jest.fn().mockReturnValue({ send: jest.fn() }),
      } as unknown as Response;
      const status = jest.spyOn(fakeResponse, 'status');
      const fakeApiError = new Error('');

      concreteController.publicSendErrorResponse(
        fakeResponse,
        fakeApiError as TestlinkClientError
      );

      expect(status).toBeCalledWith(500);
    });
  });
});
