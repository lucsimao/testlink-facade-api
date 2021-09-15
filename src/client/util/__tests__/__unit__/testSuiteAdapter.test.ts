import {
  IUnnormalizedTestSuite,
  TestSuiteAdapter,
} from '../../../../client/util/adapters/testSuiteAdapter';

import { ITestSuite } from '@src/models/ITestSuite';
import normalizedTestSuiteFixture from '../../../../../test/fixtures/normalized/testSuite.json';
import testSuiteFixture from '../../../../../test/fixtures/unnormalized/testSuite.json';

class PublicTestSuiteAdapter extends TestSuiteAdapter {
  public publicNormalizeFunction(
    testSuite: IUnnormalizedTestSuite
  ): ITestSuite {
    return this.normalizeFunction(testSuite);
  }

  public publicIsValidTestElement(testSuite: Partial<IUnnormalizedTestSuite>) {
    return this.isValidTestElement(testSuite);
  }
}

describe('TestSuiteAdapter Test', () => {
  describe('Test normalizeFunction', () => {
    it('should return the correct INormalizedTestSuite when receive a valid ITestSuite', async () => {
      const testSuite = testSuiteFixture[0] as IUnnormalizedTestSuite;

      const testSuiteAdapter = new PublicTestSuiteAdapter();

      const normalizedTestSuite =
        testSuiteAdapter.publicNormalizeFunction(testSuite);

      expect(normalizedTestSuite).toEqual(normalizedTestSuiteFixture[0]);
    });

    it('should return the correct INormalizedTestSuite when receive a valid ITestSuite', async () => {
      const testSuite = testSuiteFixture[0] as IUnnormalizedTestSuite;

      const testSuiteAdapter = new PublicTestSuiteAdapter();

      const normalizedTestSuite =
        testSuiteAdapter.publicNormalizeFunction(testSuite);

      expect(normalizedTestSuite).toEqual(normalizedTestSuiteFixture[0]);
    });

    it('should return default atributes when receive a invalid ITestSuite', async () => {
      const testSuite = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestSuite;

      const testSuiteAdapter = new PublicTestSuiteAdapter();

      const normalizedTestSuite =
        testSuiteAdapter.publicNormalizeFunction(testSuite);

      expect(normalizedTestSuite).toEqual({
        id: NaN,
        name: undefined,
        parentId: NaN,
      });
    });
  });
  describe('Test isValidTestElement', () => {
    it('should return true receive a valid ITestSuite', async () => {
      const testSuite = testSuiteFixture[0] as IUnnormalizedTestSuite;

      const testSuiteAdapter = new PublicTestSuiteAdapter();

      const normalizedTestSuite =
        testSuiteAdapter.publicIsValidTestElement(testSuite);

      expect(normalizedTestSuite).toBe(true);
    });

    it('should return false receive a invalid ITestSuite', async () => {
      const testSuite = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestSuite;

      const testSuiteAdapter = new PublicTestSuiteAdapter();

      const normalizedTestSuite =
        testSuiteAdapter.publicIsValidTestElement(testSuite);

      expect(normalizedTestSuite).toBe(false);
    });
  });
});
