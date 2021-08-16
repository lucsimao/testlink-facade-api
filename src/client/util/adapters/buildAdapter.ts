import { IBuild } from '@src/models/IBuild';
import { AbstractAdapter } from './abstractAdapter';

export interface IUnnormalizedBuild {
  readonly id: string;
  readonly name: string;
  readonly testplan_id: string;
  readonly notes: string | '';
}

export class BuildAdapter extends AbstractAdapter<IUnnormalizedBuild, IBuild> {
  protected normalizeFunction(build: IUnnormalizedBuild): IBuild {
    return {
      id: Number(build.id),
      testPlanId: Number(build.testplan_id),
      name: build.name,
      notes: build.notes,
    };
  }

  protected isValidTestElement(build: Partial<IUnnormalizedBuild>): boolean {
    return !!(build.id && build.name && build.testplan_id);
  }
}
