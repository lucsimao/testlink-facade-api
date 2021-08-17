import { NextFunction, Request, Response } from 'express';

import { BaseController } from '@src/controllers/baseController';
import { TestlinkClient } from '@src/client/TestlinkClient';

export async function authMiddleware(
  request: Partial<Request>,
  response: Partial<Response>,
  next: NextFunction
): Promise<void> {
  try {
    const testlinkClient = new TestlinkClient();
    const headers = BaseController.parseControllerHeaders(request);
    await testlinkClient.getMe({ headers });
    next();
  } catch (error) {
    response.status?.(401).send({ code: 401, error: error.message });
  }
}
