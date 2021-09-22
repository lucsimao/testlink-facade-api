/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TestLinkModule from 'testlink-xmlrpc';

import { ClientXMLRPCHelper } from '../../../../client/util/clientXMLRPCHelper';
import { TestHelper } from '../../../../../test/util/testHelper';
import logger from '@src/logger';

describe('Axios Client Helper Tests', () => {
  it('should call Testlink constructor one time when getTestLinkRCPConfig is called with a empty RequestConfig', async () => {
    const fakeTestlink = {
      testLinkVersion: async () => '10',
    } as unknown as TestLinkModule.TestLink;
    const constructorSpy = jest
      .spyOn(TestLinkModule, 'TestLink')
      .mockReturnValueOnce(fakeTestlink);
    const loggerInfo = jest.spyOn(logger, 'info');

    const result = await ClientXMLRPCHelper.getTestlinkRPCConfig({});

    expect(constructorSpy).toBeCalledTimes(1);
    expect(result).toEqual(fakeTestlink);
    expect(loggerInfo).toBeCalledWith({
      msg: 'Connected to Testlink XMLRPC: 10',
    });
  });

  it('should call Testlink constructor one time when getTestLinkRCPConfig is called with a valid RequestConfig', async () => {
    const constructorSpy = jest
      .spyOn(TestLinkModule, 'TestLink')
      .mockReturnValueOnce({
        testLinkVersion: async () => '10',
      } as unknown as TestLinkModule.TestLink);
    const requestConfig = TestHelper.getIntegrationTestHeader();

    await ClientXMLRPCHelper.getTestlinkRPCConfig(requestConfig);

    expect(constructorSpy).toBeCalledWith({
      apiKey: '6e204ef53aecd003c19f2a89178ba60b',
      host: 'localhost',
      port: 80,
      rpcPath: undefined,
      secure: true,
    });
  });
});
