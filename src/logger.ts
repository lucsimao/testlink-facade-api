import { Logger } from './util/logger/Logger';
import config from 'config';
import pino from 'pino';

const pinoLogger = pino({
  enabled: config.get('App.logger.enabled'),
  level: config.get('App.logger.level'),
});

export default {
  info(msg) {
    pinoLogger.info(msg);
  },
  error(msg: Error) {
    pinoLogger.error(msg);
  },
  warning(msg) {
    pinoLogger.warn(msg);
  },
} as Logger;
