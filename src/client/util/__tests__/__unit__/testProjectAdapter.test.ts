import {
  IUnnormalizedTestProject,
  TestProjectAdapter,
} from '../../../../client/util/adapters/testProjectAdapter';

import { ITestProject } from '@src/models/ITestProject';
import normalizedTestProjectFixture from '../../../../../test/fixtures/normalized/testProject.json';
import testProjectFixture from '../../../../../test/fixtures/unnormalized/testProject.json';

class PublicTestProjectAdapter extends TestProjectAdapter {
  public publicNormalizeFunction(
    testProject: IUnnormalizedTestProject
  ): ITestProject {
    return this.normalizeFunction(testProject);
  }

  public publicIsValidTestElement(
    testProject: Partial<IUnnormalizedTestProject>
  ) {
    return this.isValidTestElement(testProject);
  }
}

describe('TestProjectAdapter Test', () => {
  describe('Test normalizeFunction', () => {
    it('should return the correct INormalizedTestProject when receive a valid ITestProject', async () => {
      const testProject = testProjectFixture[0] as IUnnormalizedTestProject;

      const testProjectAdapter = new PublicTestProjectAdapter();

      const normalizedTestProject =
        testProjectAdapter.publicNormalizeFunction(testProject);

      expect(normalizedTestProject).toEqual(normalizedTestProjectFixture[0]);
    });

    it('should return the correct INormalizedTestProject when receive a valid ITestProject', async () => {
      const testProject = testProjectFixture[0] as IUnnormalizedTestProject;

      const testProjectAdapter = new PublicTestProjectAdapter();

      const normalizedTestProject =
        testProjectAdapter.publicNormalizeFunction(testProject);

      expect(normalizedTestProject).toEqual(normalizedTestProjectFixture[0]);
    });

    it('should return default atributes when receive a invalid ITestProject', async () => {
      const testProject = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestProject;

      const testProjectAdapter = new PublicTestProjectAdapter();

      const normalizedTestProject =
        testProjectAdapter.publicNormalizeFunction(testProject);

      expect(normalizedTestProject).toEqual({
        apiKey: undefined,
        id: NaN,
        name: undefined,
        prefix: undefined,
      });
    });
  });
  describe('Test isValidTestElement', () => {
    it('should return true receive a valid ITestProject', async () => {
      const testProject = testProjectFixture[0] as IUnnormalizedTestProject;
      const testProjectAdapter = new PublicTestProjectAdapter();

      const normalizedTestProject =
        testProjectAdapter.publicIsValidTestElement(testProject);

      expect(normalizedTestProject).toBe(true);
    });

    it('should return false receive a invalid ITestProject', async () => {
      const testProject = {
        invalid: 'testcase',
      } as unknown as IUnnormalizedTestProject;

      const testProjectAdapter = new PublicTestProjectAdapter();

      const normalizedTestProject =
        testProjectAdapter.publicIsValidTestElement(testProject);

      expect(normalizedTestProject).toBe(false);
    });
  });
});
