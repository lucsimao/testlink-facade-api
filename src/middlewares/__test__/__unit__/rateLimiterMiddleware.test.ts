/* eslint-disable @typescript-eslint/no-explicit-any */
import config from 'config';
import rateLimiter from 'express-rate-limit';
import rateLimiterMiddleware from '@src/middlewares/rateLimiterMiddleware';

const mockedResponse: any = {
  status: jest.fn().mockReturnValue({
    send: jest.fn(),
  }),
};

const mockedRequest: any = {
  ip: 10,
};

let ip: any;

jest.mock('express-rate-limit', () => {
  return jest.fn().mockImplementation((options: rateLimiter.Options) => {
    if (options.handler) {
      options.handler(mockedRequest, mockedResponse, {} as any);
    }

    if (options.keyGenerator) {
      ip = options.keyGenerator(mockedRequest, mockedResponse);
    }
  });
});

jest.mock('config');

describe('Test RateLimiterMiddleware', () => {
  it('should return the rateLimiter configuration when called', async () => {
    jest.spyOn(config, 'get').mockReturnValue(250);

    rateLimiterMiddleware();

    expect(mockedResponse.status).toBeCalledWith(429);
    expect(mockedResponse.status().send).toBeCalledWith({
      error: 'Too Many Requests',
      msg: 'Too many requests to the undefined endpoint',
      statusCode: 429,
    });
    expect(ip).toBe(10);
    expect(rateLimiter).toBeCalledWith({
      handler: expect.any(Function),
      keyGenerator: expect.any(Function),
      max: 250,
      windowMs: 250,
    });
  });

  it('should return the rateLimiter with default configuration when called without environment variables', async () => {
    jest.spyOn(config, 'get').mockReturnValue(undefined);
    rateLimiterMiddleware();

    expect(ip).toBe(10);
    expect(rateLimiter).toBeCalledWith({
      handler: expect.any(Function),
      keyGenerator: expect.any(Function),
      max: 10,
      windowMs: 60000,
    });
  });
});
