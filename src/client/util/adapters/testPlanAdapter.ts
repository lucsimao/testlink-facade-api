import { ITestPlan } from '@src/models/ITestPlan';
import { AbstractAdapter } from './abstractAdapter';

export interface IUnnormalizedTestPlan {
  readonly id: string;
  readonly testproject_id: string;
  readonly name: string;
  readonly api_key: string;
  readonly notes?: string | '';
}

export class TestPlanAdapter extends AbstractAdapter<
  IUnnormalizedTestPlan,
  ITestPlan
> {
  protected normalizeFunction(testPlan: IUnnormalizedTestPlan): ITestPlan {
    return {
      id: Number(testPlan.id),
      testProjectId: Number(testPlan.testproject_id),
      name: testPlan.name,
      apiKey: testPlan.api_key,
      notes: testPlan.notes,
    };
  }

  protected isValidTestElement(
    testPlan: Partial<IUnnormalizedTestPlan>
  ): boolean {
    return !!(
      testPlan.id &&
      testPlan.testproject_id &&
      testPlan.name &&
      testPlan.api_key
    );
  }
}
