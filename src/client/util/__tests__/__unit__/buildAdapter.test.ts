import {
  BuildAdapter,
  IUnnormalizedBuild,
} from '@src/client/util/adapters/buildAdapter';

import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';
import buildFixture from '@test/fixtures/unnormalized/build.json';
import normalizedBuildFixture from '@test/fixtures/normalized/build.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedBuild when receive a valid IBuild', async () => {
    const build = buildFixture;

    const normalizedBuild = new BuildAdapter().normalize(build);

    expect(normalizedBuild).toEqual(normalizedBuildFixture);
  });

  it('should return a empty array when receive neither valid IBuild', async () => {
    AxiosClientHelper.getClientResponse = jest
      .fn()
      .mockResolvedValue([{ id: 'non_validProject' }]);

    const build = await AxiosClientHelper.getClientResponse<IUnnormalizedBuild>(
      {},
      ''
    );

    const normalizedBuild = new BuildAdapter().normalize(build);

    expect(normalizedBuild).toEqual([]);
  });
});
