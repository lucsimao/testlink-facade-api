/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TestLinkModule from 'testlink-xmlrpc';

import { ClientXMLRPCHelper } from '../../../../client/util/clientXMLRPCHelper';
import { TestHelper } from '../../../../../test/util/testHelper';

describe('Axios Client Helper Tests', () => {
  it('should call Testlink constructor one time when getTestLinkRCPConfig is called with a empty RequestConfig', () => {
    const constructorSpy = jest
      .spyOn(TestLinkModule, 'TestLink')
      .mockImplementation();

    ClientXMLRPCHelper.getTestlinkRPCConfig({});

    expect(constructorSpy).toBeCalledTimes(1);
  });

  it('should call Testlink constructor one time when getTestLinkRCPConfig is called with a valid RequestConfig', () => {
    const constructorSpy = jest
      .spyOn(TestLinkModule, 'TestLink')
      .mockImplementation();

    const requestConfig = TestHelper.getIntegrationTestHeader();
    ClientXMLRPCHelper.getTestlinkRPCConfig(requestConfig);

    expect(constructorSpy).toBeCalledTimes(1);
  });
});
