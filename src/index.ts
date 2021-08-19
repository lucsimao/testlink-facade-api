import './util/module-alias';

import { SetupServer } from './server';
import config from 'config';
import logger from './logger';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

const setup = async (server: SetupServer) => {
  await server.init();
  server.start();

  setUpExceptionsHandle();

  handleGracefulShutdown(server);
};

const setUpExceptionsHandle = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(
      `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
    );
    throw reason;
  });

  process.on('uncaughtException', (error) => {
    logger.error(`App exiting due to an uncaught exception: ${error}`);
    process.exit(ExitStatus.Failure);
  });
};

const handleGracefulShutdown = (server: SetupServer) => {
  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  for (const exitSignal of exitSignals) {
    process.on(exitSignal, async () => {
      await server.close();
      logger.info(`App exited with success`);
      process.exit(ExitStatus.Success);
    });
  }
};

(async (): Promise<void> => {
  try {
    setUpExceptionsHandle();

    const server = new SetupServer(config.get('App.port'));
    await setup(server);
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
