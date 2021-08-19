import { TestHelper } from '@test/util/testHelper';
import { authMiddleware } from '@src/middlewares/authMiddleware';

describe('Auth Tests', () => {
  it('should verify apiKey and call next middleware', async () => {
    const fakeRequest = TestHelper.getFunctionalTestHeader();
    const fakeResponse = {};
    const fakeNext = jest.fn();

    await authMiddleware(fakeRequest, fakeResponse, fakeNext);
    expect(fakeNext).toHaveBeenCalled();
  });

  it('should return UNAUTHORIZED if there is a problem on the apiKey', async () => {
    const fakeRequest = TestHelper.getFunctionalTestHeader();
    fakeRequest.headers['testlink-api-key'] = 'fake-api-key';

    const sendMock = jest.fn();

    const fakeResponse = {
      status: jest.fn(() => ({
        send: sendMock,
      })),
    };
    const fakeNext = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-types
    await authMiddleware(fakeRequest, fakeResponse as object, fakeNext);
    expect(fakeResponse.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
      code: 401,
      error:
        '[2000] (checkDevKey) - Can not authenticate client: invalid developer key',
    });
  });
});
