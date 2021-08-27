import { AxiosRequestConfig } from 'axios';
import { TestLink } from 'testlink-xmlrpc';
import logger from '@src/logger';

export class ClientXMLRPCHelper {
  /**
   * Returns a instance of Testlink xmlrpc
   *
   * @param requestConfig - AxiosRequestConfig with following params
   * @param requestConfig.headers.testlinkUrl  - Testlink server ip
   * @param requestConfig.headers.testlinkPort - Testlink server port
   * @param requestConfig.headers.testlinkApiKey - Testlink server user api key
   * @param [requestConfig.headers.rpcPath] - (Optional) custom Testlink rpcPath, example: 'testlink/lib/api/xmlrpc/v1/xmlrpc.php',
   */
  public static async getTestlinkRPCConfig(
    requestConfig: AxiosRequestConfig
  ): Promise<TestLink> {
    const testlink = new TestLink({
      host: requestConfig.headers?.testlinkUrl,
      port: requestConfig.headers?.testlinkPort,
      secure: true,
      apiKey: requestConfig.headers?.testlinkApiKey,
      rpcPath: requestConfig.headers?.rpcPath,
    });
    logger.info(
      `Connected to Testlink XMLRPC: ${await testlink.testLinkVersion()}`
    );
    return testlink;
  }
}
