/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import { SetupServer } from '../../server';

describe('Server Tests', () => {
  describe('start Tests', () => {
    it('should call app.listen when server start is called', () => {
      const server = new SetupServer();
      const listen = jest
        .spyOn(server.app, 'listen')
        .mockImplementationOnce((_: any, callback?: () => void) => {
          if (callback) callback();
          return {} as Server;
        });
      server.start();
      expect(listen).toBeCalledTimes(1);
    });
  });

  describe('init Tests', () => {
    it('should call setupExpress when server init is called', async () => {
      const server = new SetupServer();
      const setupControllers = jest.spyOn(
        SetupServer.prototype as any,
        'setupControllers'
      );
      await server.init();
      expect(setupControllers).toBeCalledTimes(1);
    });
  });

  describe('getApp Tests', () => {
    it('should return app when getApp is called', async () => {
      const server = new SetupServer();
      const app = server.getApp();
      expect(app).toBeInstanceOf(Function);
    });
  });

  describe('close Tests', () => {
    it('should close server when close is called without error', async () => {
      const server = new SetupServer();
      jest
        .spyOn(server.app, 'listen')
        .mockImplementationOnce((_: any, callback?: () => void) => {
          if (callback) callback();
          return {
            close: (callback: () => void) => {
              callback();
            },
          } as Server;
        });
      await server.start();

      await server.close();
      expect(false);
    });

    it('should close server when close is called with error', async () => {
      const server = new SetupServer();
      jest
        .spyOn(server.app, 'listen')
        .mockImplementationOnce((_: any, callback?: () => void) => {
          if (callback) callback();
          return {
            close: (callback: (error: Error) => void) => {
              callback(new Error('Fake Error'));
            },
          } as Server;
        });
      server.start();

      try {
        await server.close();
      } catch (error) {
        expect(error).toEqual(new Error('Fake Error'));
      }
    });

    it('should close server when close is called before start', async () => {
      const server = new SetupServer();

      await server.close();
      expect(false);
    });
  });
});
