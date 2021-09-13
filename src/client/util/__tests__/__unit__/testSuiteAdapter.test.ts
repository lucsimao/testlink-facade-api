import {
  IUnnormalizedTestSuite,
  TestSuiteAdapter,
} from '../../../../client/util/adapters/testSuiteAdapter';

import normalizedTestSuiteFixture from '../../../../../test/fixtures/normalized/testSuite.json';
import testSuiteFixture from '../../../../../test/fixtures/unnormalized/testSuite.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestSuite when receive a valid ITestSuite', async () => {
    const testSuite = testSuiteFixture;

    const normalizedTestSuite = new TestSuiteAdapter().normalize(testSuite);

    expect(normalizedTestSuite).toEqual(normalizedTestSuiteFixture);
  });

  it('should return a empty array when receive neither valid ITestSuite', async () => {
    const testSuites = [{ id: 'non_validProject' }];
    const normalizedTestSuite = new TestSuiteAdapter().normalize(
      testSuites as unknown as IUnnormalizedTestSuite[]
    );

    expect(normalizedTestSuite).toEqual([]);
  });
});
