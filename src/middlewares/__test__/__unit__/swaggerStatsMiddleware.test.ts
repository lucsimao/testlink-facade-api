/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ExpressModule from 'express';
import * as OpenApiModule from 'openapi-comment-parser';
import * as OpenApiValidator from 'express-openapi-validator';

import swaggerStats from 'swagger-stats';
import swaggerStatsMiddleware from '@src/middlewares/swaggerStatsMiddleware';
import swaggerUi from 'swagger-ui-express';

jest.mock('express');
jest.mock('swagger-stats');
jest.mock('swagger-ui-express', () => ({
  serve: 'fakeServe',
  setup: jest.fn(),
}));
jest.mock('openapi-comment-parser');
jest.mock('express-openapi-validator');
jest.mock('../../../openapirc', () => 'fake');

describe('Test SwaggerStats', () => {
  it('should return the swaggerStatsMiddleware configuration when called', async () => {
    const router = jest.spyOn(ExpressModule, 'Router').mockReturnValue({
      use: () => {
        ('');
      },
    } as unknown as ExpressModule.Router);
    const use = jest.spyOn(ExpressModule.Router(), 'use').mockImplementation();
    const openapi = jest
      .spyOn(OpenApiModule as any, 'default')
      .mockReturnValue('fakeOpenApi');
    const getMiddleware = jest
      .spyOn(swaggerStats, 'getMiddleware')
      .mockImplementation();
    const setup = jest
      .spyOn(swaggerUi, 'setup')
      .mockReturnValue('fakeSetup' as any);
    const middleware = jest
      .spyOn(OpenApiValidator, 'middleware')
      .mockImplementation();

    const app = await swaggerStatsMiddleware();

    expect(router).toBeCalledWith();
    expect(openapi).toBeCalledWith('fake');
    expect(getMiddleware).toBeCalledWith({ swaggerSpec: 'fakeOpenApi' });
    expect(setup).toBeCalledWith('fakeOpenApi');
    expect(middleware).toBeCalledWith({
      apiSpec: 'fakeOpenApi',
      validateRequests: true,
      validateResponses: true,
    });
    expect(app).toHaveProperty('use');
    expect(use).toBeCalledWith('/docs', 'fakeServe', 'fakeSetup');
  });
});
