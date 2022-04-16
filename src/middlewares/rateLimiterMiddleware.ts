import { Request, Response } from 'express';
import rateLimiter, { RateLimit } from 'express-rate-limit';

import { APIError } from '@src/util/errors/api-error';
import config from 'config';

export default function (): RateLimit {
  return rateLimiter({
    windowMs: config.get('App.rateLimiter.windowMs') || 1 * 60 * 1000,
    max: config.get('App.rateLimiter.max') || 10,
    keyGenerator(req: Request): string {
      return req.ip;
    },
    handler(req: Request, res: Response): void {
      res.status(429).send(
        APIError.format({
          statusCode: 429,
          message: `Too many requests to the ${req.path} endpoint`,
        })
      );
    },
  });
}
