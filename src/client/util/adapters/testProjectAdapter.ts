import { ITestProject } from '@src/models/ITestProject';
import { AbstractAdapter } from './abstractAdapter';

export interface IUnnormalizedTestProject {
  readonly id: string;
  readonly name: string;
  readonly api_key: string;
  readonly prefix: string;
}

export class TestProjectAdapter extends AbstractAdapter<
  IUnnormalizedTestProject,
  ITestProject
> {
  protected normalizeFunction(
    testProject: IUnnormalizedTestProject
  ): ITestProject {
    return {
      id: Number(testProject.id),
      name: testProject.name,
      apiKey: testProject.api_key,
      prefix: testProject.prefix,
    };
  }

  protected isValidTestElement(
    testProject: Partial<IUnnormalizedTestProject>
  ): boolean {
    return !!(
      testProject.id &&
      testProject.api_key &&
      testProject.prefix &&
      testProject.name
    );
  }
}
