/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TestLinkModule from 'testlink-xmlrpc';

import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import { TestHelper } from '@test/util/testHelper';
import axios from 'axios';

describe('Axios Client Helper Tests', () => {
  it('should call Testlink constructor one time when getTestLinkRCPConfig is called', () => {
    const constructorSpy = jest
      .spyOn(TestLinkModule, 'TestLink')
      .mockImplementation();

    AxiosClientHelper.getTestlinkRPCConfig({});

    expect(constructorSpy).toBeCalledTimes(1);
  });

  it('should call setTestlinkApiKey, setTestlinkUrl and getAxiosResponse when getClientResponse is called', () => {
    jest.mock('axios');
    const setTestlinkApiKeyMock = jest.spyOn(
      AxiosClientHelper as any,
      'setTestlinkApiKey'
    );

    const setTestlinkUrlMock = jest.spyOn(
      AxiosClientHelper as any,
      'setTestlinkUrl'
    );

    const getAxiosResponseMock = jest
      .spyOn(AxiosClientHelper as any, 'getAxiosResponse')
      .mockReturnValueOnce({ data: '' });

    jest.spyOn(axios as any, 'get').mockImplementationOnce(async () => {
      Promise.resolve({ data: '' });
    });

    AxiosClientHelper.getClientResponse({}, '');

    expect(setTestlinkApiKeyMock).toBeCalled();
    expect(setTestlinkUrlMock).toBeCalled();
    expect(getAxiosResponseMock).toBeCalled();
  });

  it('should call setTestlinkApiKey, setTestlinkUrl and getAxiosResponse when getClientResponse is called with right params', () => {
    jest.mock('axios');
    const setTestlinkApiKeyMock = jest.spyOn(
      AxiosClientHelper as any,
      'setTestlinkApiKey'
    );

    const setTestlinkUrlMock = jest.spyOn(
      AxiosClientHelper as any,
      'setTestlinkUrl'
    );

    const getAxiosResponseMock = jest
      .spyOn(AxiosClientHelper as any, 'getAxiosResponse')
      .mockReturnValue({ data: '' });

    jest.spyOn(axios as any, 'get').mockImplementationOnce(async () => {
      Promise.resolve({ data: '' });
    });

    AxiosClientHelper.getClientResponse(
      TestHelper.getIntegrationTestHeader(),
      ''
    );

    expect(setTestlinkApiKeyMock).toBeCalled();
    expect(setTestlinkUrlMock).toBeCalled();
    expect(getAxiosResponseMock).toBeCalled();
  });

  it('should call setTestlinkApiKey, setTestlinkUrl and getAxiosResponse when postClientResponse is called', () => {
    jest.mock('axios');
    const setTestlinkApiKeyMock = jest.spyOn(
      AxiosClientHelper as any,
      'setTestlinkApiKey'
    );

    const getAxiosResponseMock = jest.spyOn(
      AxiosClientHelper as any,
      'getAxiosResponse'
    );

    jest
      .spyOn(axios as any, 'get')
      .mockReturnValueOnce(Promise.resolve({ data: '' }));

    AxiosClientHelper.postClientResponse(
      TestHelper.getIntegrationTestHeader(),
      ''
    );

    expect(setTestlinkApiKeyMock).toBeCalled();
    expect(getAxiosResponseMock).toBeCalled();
  });
});
