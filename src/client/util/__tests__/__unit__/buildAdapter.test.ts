import {
  BuildAdapter,
  IUnnormalizedBuild,
} from '../../../../client/util/adapters/buildAdapter';

import { IBuild } from '@src/models/IBuild';
import buildFixture from '../../../../../test/fixtures/unnormalized/build.json';
import normalizedBuildFixture from '../../../../../test/fixtures/normalized/build.json';

class PublicBuildAdapter extends BuildAdapter {
  public publicNormalizeFunction(build: IUnnormalizedBuild): IBuild {
    return this.normalizeFunction(build);
  }

  public publicIsValidTestElement(build: Partial<IUnnormalizedBuild>) {
    return this.isValidTestElement(build);
  }
}

describe('BuildAdapter Test', () => {
  describe('Test normalizeFunction', () => {
    it('should return the correct INormalizedBuild when receive a valid IBuild', async () => {
      const build = buildFixture[0] as IUnnormalizedBuild;

      const buildAdapter = new PublicBuildAdapter();

      const normalizedBuild = buildAdapter.publicNormalizeFunction(build);

      expect(normalizedBuild).toEqual(normalizedBuildFixture[0]);
    });

    it('should return the correct INormalizedBuild when receive a valid IBuild', async () => {
      const build = buildFixture[0] as IUnnormalizedBuild;

      const buildAdapter = new PublicBuildAdapter();

      const normalizedBuild = buildAdapter.publicNormalizeFunction(build);

      expect(normalizedBuild).toEqual(normalizedBuildFixture[0]);
    });

    it('should return default atributes when receive a invalid IBuild', async () => {
      const build = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedBuild;

      const buildAdapter = new PublicBuildAdapter();

      const normalizedBuild = buildAdapter.publicNormalizeFunction(build);

      expect(normalizedBuild).toEqual({
        id: NaN,
        name: undefined,
        notes: undefined,
        testPlanId: NaN,
      });
    });
  });
  describe('Test isValidTestElement', () => {
    it('should return true receive a valid IBuild', async () => {
      const build = buildFixture[0] as IUnnormalizedBuild;

      const buildAdapter = new PublicBuildAdapter();

      const normalizedBuild = buildAdapter.publicIsValidTestElement(build);

      expect(normalizedBuild).toBe(true);
    });

    it('should return false receive a invalid IBuild', async () => {
      const build = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedBuild;

      const buildAdapter = new PublicBuildAdapter();

      const normalizedBuild = buildAdapter.publicIsValidTestElement(build);

      expect(normalizedBuild).toBe(false);
    });
  });
});
