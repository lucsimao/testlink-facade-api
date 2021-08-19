import { AbstractAdapter } from './abstractAdapter';
import { ITestCase } from '@src/models/ITestCase';

export interface IUnnormalizedTestCase {
  readonly id: string;
  readonly external_id: string;
  readonly name: string;
  readonly preconditions?: string;
  readonly summary?: string;
}

export class TestCaseAdapter extends AbstractAdapter<
  IUnnormalizedTestCase,
  ITestCase
> {
  protected normalizeFunction(testCase: IUnnormalizedTestCase): ITestCase {
    return {
      id: Number(testCase.id),
      externalId: testCase.external_id,
      name: testCase.name,
      summary: testCase.summary || '',
      preconditions: testCase.preconditions || '',
    };
  }

  protected isValidTestElement(
    testCase: Partial<IUnnormalizedTestCase>
  ): boolean {
    return !!(testCase.id && testCase.name && testCase.external_id);
  }
}
