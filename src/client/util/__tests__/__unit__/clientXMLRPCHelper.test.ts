/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TestLinkModule from 'testlink-xmlrpc';

import { ClientXMLRPCHelper } from '@src/client/util/clientXMLRPCHelper';

describe('Axios Client Helper Tests', () => {
  it('should call Testlink constructor one time when getTestLinkRCPConfig is called', () => {
    const constructorSpy = jest
      .spyOn(TestLinkModule, 'TestLink')
      .mockImplementation();

    ClientXMLRPCHelper.getTestlinkRPCConfig({});

    expect(constructorSpy).toBeCalledTimes(1);
  });
});
