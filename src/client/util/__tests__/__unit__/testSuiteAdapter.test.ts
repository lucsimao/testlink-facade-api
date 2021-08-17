import {
  IUnnormalizedTestSuite,
  TestSuiteAdapter,
} from '@src/client/util/adapters/testSuiteAdapter';

import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import normalizedTestSuiteFixture from '@test/fixtures/normalized/testSuite.json';
import testSuiteFixture from '@test/fixtures/unnormalized/testSuite.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestSuite when receive a valid ITestSuite', async () => {
    const testSuite = testSuiteFixture;

    const normalizedTestSuite = new TestSuiteAdapter().normalize(testSuite);

    expect(normalizedTestSuite).toEqual(normalizedTestSuiteFixture);
  });

  it('should return a empty array when receive neither valid ITestSuite', async () => {
    AxiosClientHelper.getClientResponse = jest
      .fn()
      .mockResolvedValue([{ id: 'non_validProject' }]);

    const TestSuite =
      await AxiosClientHelper.getClientResponse<IUnnormalizedTestSuite>({}, '');

    const normalizedTestSuite = new TestSuiteAdapter().normalize(TestSuite);

    expect(normalizedTestSuite).toEqual([]);
  });
});
