import config from 'config';
import pino from 'pino';

export default pino({
  enabled: config.get('App.logger.enabled'),
  level: config.get('App.logger.level'),
});
