import testPlanFixture from '@src/client/__tests__/fixtures/unitTestPlanFixture.json';
import normalizedTestPlanFixture from '@src/client/util/__tests__/fixtures/normalizedTestPlanFixture.json';
import {
  IUnnormalizedTestPlan,
  TestPlanAdapter,
} from '@src/client/util/adapters/TestPlanAdapter';
import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';

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
