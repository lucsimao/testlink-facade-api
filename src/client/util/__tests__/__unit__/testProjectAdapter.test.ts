import testProjectFixture from '@src/client/__tests__/fixtures/unitTestProjectFixture.json';
import normalizedTestProjectFixture from '@src/client/util/__tests__/fixtures/normalizedTestProjectFixture.json';

import {
  IUnnormalizedTestProject,
  TestProjectAdapter,
} from '@src/client/util/adapters/testProjectAdapter';
import { AxiosClientHelper } from '@src/client/util/axiosClientHelper';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestProject when receive a valid ITestProject', async () => {
    const testProject = testProjectFixture;

    const normalizedTestProject = new TestProjectAdapter().normalize(
      testProject
    );

    expect(normalizedTestProject).toEqual(normalizedTestProjectFixture);
  });

  it('should return a empty array when receive neither valid ITestProject', async () => {
    AxiosClientHelper.getClientResponse = jest
      .fn()
      .mockResolvedValue([{ id: 'non_validProject' }]);

    const testProject =
      await AxiosClientHelper.getClientResponse<IUnnormalizedTestProject>(
        {},
        ''
      );

    const normalizedTestProject = new TestProjectAdapter().normalize(
      testProject
    );

    expect(normalizedTestProject).toEqual([]);
  });
});
