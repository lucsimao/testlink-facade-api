import {
  IUnnormalizedTestPlan,
  TestPlanAdapter,
} from '../../../../client/util/adapters/testPlanAdapter';

import { ITestPlan } from '@src/models/ITestPlan';
import normalizedTestPlanFixture from '../../../../../test/fixtures/normalized/testPlan.json';
import testPlanFixture from '../../../../../test/fixtures/unnormalized/testPlan.json';

class PublicTestPlanAdapter extends TestPlanAdapter {
  public publicNormalizeFunction(testPlan: IUnnormalizedTestPlan): ITestPlan {
    return this.normalizeFunction(testPlan);
  }

  public publicIsValidTestElement(testPlan: Partial<IUnnormalizedTestPlan>) {
    return this.isValidTestElement(testPlan);
  }
}

describe('TestPlanAdapter Test', () => {
  describe('Test normalizeFunction', () => {
    it('should return the correct INormalizedTestPlan when receive a valid ITestPlan', async () => {
      const testPlan = testPlanFixture[0] as IUnnormalizedTestPlan;

      const testPlanAdapter = new PublicTestPlanAdapter();

      const normalizedTestPlan =
        testPlanAdapter.publicNormalizeFunction(testPlan);

      expect(normalizedTestPlan).toEqual(normalizedTestPlanFixture[0]);
    });

    it('should return the correct INormalizedTestPlan when receive a valid ITestPlan', async () => {
      const testPlan = testPlanFixture[0] as IUnnormalizedTestPlan;

      const testPlanAdapter = new PublicTestPlanAdapter();

      const normalizedTestPlan =
        testPlanAdapter.publicNormalizeFunction(testPlan);

      expect(normalizedTestPlan).toEqual(normalizedTestPlanFixture[0]);
    });

    it('should return default atributes when receive a invalid ITestPlan', async () => {
      const testPlan = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestPlan;

      const testPlanAdapter = new PublicTestPlanAdapter();

      const normalizedTestPlan =
        testPlanAdapter.publicNormalizeFunction(testPlan);

      expect(normalizedTestPlan).toEqual({
        apiKey: undefined,
        id: NaN,
        name: undefined,
        notes: undefined,
        testProjectId: NaN,
      });
    });
  });
  describe('Test isValidTestElement', () => {
    it('should return true receive a valid ITestPlan', async () => {
      const testPlan = testPlanFixture[0] as IUnnormalizedTestPlan;

      const testPlanAdapter = new PublicTestPlanAdapter();

      const normalizedTestPlan =
        testPlanAdapter.publicIsValidTestElement(testPlan);

      expect(normalizedTestPlan).toBe(true);
    });

    it('should return false receive a invalid ITestPlan', async () => {
      const testPlan = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestPlan;

      const testPlanAdapter = new PublicTestPlanAdapter();

      const normalizedTestPlan =
        testPlanAdapter.publicIsValidTestElement(testPlan);

      expect(normalizedTestPlan).toBe(false);
    });
  });
});
