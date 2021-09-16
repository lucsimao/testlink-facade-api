import {
  IUnnormalizedTestCase,
  TestCaseAdapter,
} from '../../../../client/util/adapters/testCaseAdapter';

import { ITestCase } from '@src/models/ITestCase';
import normalizedTestCaseFixture from '../../../../../test/fixtures/normalized/testCase.json';
import testCaseFixture from '../../../../../test/fixtures/unnormalized/testCase.json';

class PublicTestCaseAdapter extends TestCaseAdapter {
  public publicNormalizeFunction(testCase: IUnnormalizedTestCase): ITestCase {
    return this.normalizeFunction(testCase);
  }

  public publicIsValidTestElement(testCase: Partial<IUnnormalizedTestCase>) {
    return this.isValidTestElement(testCase);
  }
}

describe('TestCaseAdapter Test', () => {
  describe('Test normalizeFunction', () => {
    it('should return the correct INormalizedTestCase when receive a valid ITestCase', async () => {
      const testCase = testCaseFixture[0] as IUnnormalizedTestCase;

      const testCaseAdapter = new PublicTestCaseAdapter();

      const normalizedTestCase =
        testCaseAdapter.publicNormalizeFunction(testCase);

      expect(normalizedTestCase).toEqual(normalizedTestCaseFixture[0]);
    });

    it('should return the correct INormalizedTestCase when receive a valid ITestCase', async () => {
      const testCase = testCaseFixture[0] as IUnnormalizedTestCase;
      const testCaseAdapter = new PublicTestCaseAdapter();

      const normalizedTestCase =
        testCaseAdapter.publicNormalizeFunction(testCase);

      expect(normalizedTestCase).toEqual(normalizedTestCaseFixture[0]);
    });

    it('should return default atributes when receive a invalid ITestCase', async () => {
      const testCase = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestCase;

      const testCaseAdapter = new PublicTestCaseAdapter();

      const normalizedTestCase =
        testCaseAdapter.publicNormalizeFunction(testCase);

      expect(normalizedTestCase).toEqual({
        creationDate: undefined,
        externalId: undefined,
        id: NaN,
        name: undefined,
        preconditions: '',
        summary: '',
      });
    });
  });
  describe('Test isValidTestElement', () => {
    it('should return true receive a valid ITestCase', async () => {
      const testCase = testCaseFixture[0] as IUnnormalizedTestCase;

      const testCaseAdapter = new PublicTestCaseAdapter();

      const isValidTestElement =
        testCaseAdapter.publicIsValidTestElement(testCase);

      expect(isValidTestElement).toBe(true);
    });

    it('should return false receive a invalid ITestCase', async () => {
      const testCase = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestCase;

      const testCaseAdapter = new PublicTestCaseAdapter();

      const normalizedTestCase =
        testCaseAdapter.publicIsValidTestElement(testCase);

      expect(normalizedTestCase).toBe(false);
    });
  });
});
