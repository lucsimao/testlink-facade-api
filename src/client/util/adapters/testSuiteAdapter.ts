import { AbstractAdapter } from './abstractAdapter';
import { ITestSuite } from '@src/models/ITestSuite';

export interface IUnnormalizedTestSuite {
  readonly id: string;
  readonly name: string;
  readonly parent_id: string;
}

export class TestSuiteAdapter extends AbstractAdapter<
  IUnnormalizedTestSuite,
  ITestSuite
> {
  protected normalizeFunction(testSuite: IUnnormalizedTestSuite): ITestSuite {
    return {
      id: Number(testSuite.id),
      parentId: Number(testSuite.parent_id),
      name: testSuite.name,
    };
  }

  protected isValidTestElement(
    testSuite: Partial<IUnnormalizedTestSuite>
  ): boolean {
    return !!(testSuite.id && testSuite.parent_id && testSuite.name);
  }
}
