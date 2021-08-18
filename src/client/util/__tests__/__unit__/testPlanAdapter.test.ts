import {
  IUnnormalizedTestPlan,
  TestPlanAdapter,
} from '@src/client/util/adapters/testPlanAdapter';

import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import normalizedTestPlanFixture from '@test/fixtures/normalized/testPlan.json';
import testPlanFixture from '@test/fixtures/unnormalized/testPlan.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestPlan when receive a valid ITestPlan', async () => {
    const testPlan = testPlanFixture;

    const normalizedTestPlan = new TestPlanAdapter().normalize(testPlan);

    expect(normalizedTestPlan).toEqual(normalizedTestPlanFixture);
  });

  it('should return a empty array when receive neither valid ITestPlan', async () => {
    AxiosClientHelper.getClientResponse = jest
      .fn()
      .mockResolvedValue([{ id: 'non_validProject' }]);

    const TestPlan =
      await AxiosClientHelper.getClientResponse<IUnnormalizedTestPlan>({}, '');

    const normalizedTestPlan = new TestPlanAdapter().normalize(TestPlan);

    expect(normalizedTestPlan).toEqual([]);
  });
});
