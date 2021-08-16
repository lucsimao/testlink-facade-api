import testCaseFixture from '@src/client/__tests__/fixtures/unitTestCaseFixture.json';
import normalizedTestCaseFixture from '@src/client/util/__tests__/fixtures/normalizedTestCaseFixture.json';

import {
  IUnnormalizedTestCase,
  TestCaseAdapter,
} from '@src/client/util/adapters/testCaseAdapter';
import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestCase when receive a valid ITestCase', async () => {
    const testCase = testCaseFixture;

    const normalizedTestCase = new TestCaseAdapter().normalize(testCase);

    expect(normalizedTestCase).toEqual(normalizedTestCaseFixture);
  });

  it('should return a empty array when receive neither valid ITestCase', async () => {
    AxiosClientHelper.getClientResponse = jest
      .fn()
      .mockResolvedValue([{ id: 'non_validProject' }]);

    const testCase =
      await AxiosClientHelper.getClientResponse<IUnnormalizedTestCase>({}, '');

    const normalizedTestCase = new TestCaseAdapter().normalize(testCase);

    expect(normalizedTestCase).toEqual([]);
  });
});
