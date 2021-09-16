import { AbstractAdapter } from './abstractAdapter';
import { ITestProject } from '@src/models/ITestProject';
import TestProject from '@src/schemas/TestProject';

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
    return !TestProject.validate(testProject).error;
  }
}
