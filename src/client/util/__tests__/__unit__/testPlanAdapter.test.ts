import {
  IUnnormalizedTestPlan,
  TestPlanAdapter,
} from '@src/client/util/adapters/testPlanAdapter';

import normalizedTestPlanFixture from '@test/fixtures/normalized/testPlan.json';
import testPlanFixture from '@test/fixtures/unnormalized/testPlan.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestPlan when receive a valid ITestPlan', async () => {
    const testPlan = testPlanFixture;

    const normalizedTestPlan = new TestPlanAdapter().normalize(testPlan);

    expect(normalizedTestPlan).toEqual(normalizedTestPlanFixture);
  });

  it('should return a empty array when receive neither valid ITestPlan', async () => {
    const testPlans = [{ id: 'non_validProject' }];

    const normalizedTestPlan = new TestPlanAdapter().normalize(
      testPlans as unknown as IUnnormalizedTestPlan[]
    );

    expect(normalizedTestPlan).toEqual([]);
  });
});
