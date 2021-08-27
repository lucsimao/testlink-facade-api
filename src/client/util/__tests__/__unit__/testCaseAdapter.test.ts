import {
  IUnnormalizedTestCase,
  TestCaseAdapter,
} from '@src/client/util/adapters/testCaseAdapter';

import normalizedTestCaseFixture from '@test/fixtures/normalized/testCase.json';
import testCaseFixture from '@test/fixtures/unnormalized/testCase.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestCase when receive a valid ITestCase', async () => {
    const testCase = testCaseFixture;

    const normalizedTestCase = new TestCaseAdapter().normalize(testCase);

    expect(normalizedTestCase).toEqual(normalizedTestCaseFixture);
  });

  it('should return a empty array when receive neither valid ITestCase', async () => {
    const testCases = [{ id: 'non_validProject' }];

    const normalizedTestCase = new TestCaseAdapter().normalize(
      testCases as unknown as IUnnormalizedTestCase[]
    );

    expect(normalizedTestCase).toEqual([]);
  });
});
