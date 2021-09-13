import {
  IUnnormalizedTestProject,
  TestProjectAdapter,
} from '../../../../client/util/adapters/testProjectAdapter';

import normalizedTestProjectFixture from '../../../../../test/fixtures/normalized/testProject.json';
import testProjectFixture from '../../../../../test/fixtures/unnormalized/testProject.json';

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedTestProject when receive a valid ITestProject', async () => {
    const testProject = testProjectFixture;

    const normalizedTestProject = new TestProjectAdapter().normalize(
      testProject
    );

    expect(normalizedTestProject).toEqual(normalizedTestProjectFixture);
  });

  it('should return a empty array when receive neither valid ITestProject', async () => {
    const testProjects = [{ id: 'non_validProject' }];

    const normalizedTestProject = new TestProjectAdapter().normalize(
      testProjects as unknown as IUnnormalizedTestProject[]
    );

    expect(normalizedTestProject).toEqual([]);
  });
});
