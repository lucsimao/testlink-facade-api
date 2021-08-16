import buildFixture from '@src/client/__tests__/fixtures/unitBuildFixture.json';
import normalizedBuildFixture from '@src/client/util/__tests__/fixtures/normalizedBuildFixture.json';

import {
  IUnnormalizedBuild,
  BuildAdapter,
} from '@src/client/util/adapters/buildAdapter';
import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';

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
