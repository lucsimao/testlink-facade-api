import logger from '@src/logger';
import pino from 'pino';

jest.mock('pino', () => {
  return jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  });
});

describe('Test logger', () => {
  it('should call pino.info when call logger.info', () => {
    const info = jest.spyOn(pino(), 'info').mockImplementation();

    logger.info({ msg: 'Test info' });

    expect(info).toBeCalledWith({ msg: 'Test info' });
  });

  it('should call pino.error when call logger.error', () => {
    const error = jest.spyOn(pino(), 'error').mockImplementation();

    logger.error({ msg: 'Test error' });

    expect(error).toBeCalledWith({ msg: 'Test error' });
  });

  it('should call pino.warn when call logger.warning', () => {
    const warn = jest.spyOn(pino(), 'warn').mockImplementation();

    logger.warning({ msg: 'Test warning' });

    expect(warn).toBeCalledWith({ msg: 'Test warning' });
  });
});
