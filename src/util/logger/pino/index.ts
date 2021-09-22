import { ILoggerParams, Logger } from '../Logger';

import config from 'config';
import pino from 'pino';

const pinoLogger = pino({
  enabled: config.get('App.logger.enabled'),
  level: config.get('App.logger.level'),
});

export default {
  info(params: ILoggerParams) {
    pinoLogger.info(params);
  },
  error(params: ILoggerParams) {
    pinoLogger.error(params);
  },
  warning(params: ILoggerParams) {
    pinoLogger.warn(params);
  },
} as Logger;
