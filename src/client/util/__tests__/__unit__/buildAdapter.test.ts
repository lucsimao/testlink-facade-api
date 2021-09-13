import {
  BuildAdapter,
  IUnnormalizedBuild,
} from '../../../../client/util/adapters/buildAdapter';

import buildFixture from '../../../../../test/fixtures/unnormalized/build.json';
import normalizedBuildFixture from '../../../../../test/fixtures/normalized/build.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedBuild when receive a valid IBuild', async () => {
    const build = buildFixture;

    const normalizedBuild = new BuildAdapter().normalize(build);

    expect(normalizedBuild).toEqual(normalizedBuildFixture);
  });

  it('should return a empty array when receive neither valid IBuild', async () => {
    const build = [{ id: 'non_validProject' }];

    const normalizedBuild = new BuildAdapter().normalize([
      build as unknown as IUnnormalizedBuild,
    ]);

    expect(normalizedBuild).toEqual([]);
  });
});
