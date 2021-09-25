import * as OpenApiValidator from 'express-openapi-validator';

import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { Router } from 'express';
import openapi from 'openapi-comment-parser';
import openapiConfig from '../openapirc';
import swaggerStats from 'swagger-stats';
import swaggerUi from 'swagger-ui-express';

export default async function (): Promise<Router> {
  const app = Router();
  const apiSchema = openapi(openapiConfig);

  app.use(swaggerStats.getMiddleware({ swaggerSpec: apiSchema }));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
  app.use(
    await OpenApiValidator.middleware({
      apiSpec: apiSchema as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    })
  );

  return app;
}
