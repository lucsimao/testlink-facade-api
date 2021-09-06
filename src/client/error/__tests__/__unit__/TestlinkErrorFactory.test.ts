import {
  TestPlanNotFoundError,
  TestProjectNotFoundError,
  TestSuiteNotFoundError,
  TestlinkClientErrorFactory,
} from '../../TestlinkClientErrorFactory';

describe('Test TestlinkClientErrorFactory', () => {
  it('should return a TeslinkError when receive a valid string error', () => {
    const error = new Error(
      '[3000] (getBuildsForTestPlan) - The Test Plan ID (0) provided does not exist!'
    );

    const result = TestlinkClientErrorFactory.parseError(error);
    expect(result).toBeInstanceOf(TestPlanNotFoundError);
  });

  it('should return a TeslinkError when receive a valid string error', () => {
    const error = new Error(
      '[3000] (getBuildsForTestPlan) - The Test Plan ID (0) provided does not exist!'
    );

    const result = TestlinkClientErrorFactory.parseError(error);
    expect(result).toBeInstanceOf(TestPlanNotFoundError);
  });

  it('should return a TeslinkError when receive a valid string error', () => {
    const error = new Error(
      '[7000] (getBuildsForTestPlan) - The Test Plan ID (0) provided does not exist!'
    );

    const result = TestlinkClientErrorFactory.parseError(error);
    expect(result).toBeInstanceOf(TestProjectNotFoundError);
  });

  it('should return a TeslinkError when receive a valid string error', () => {
    const error = new Error(
      '[8000] (getBuildsForTestPlan) - The Test Plan ID (0) provided does not exist!'
    );

    const result = TestlinkClientErrorFactory.parseError(error);
    expect(result).toBeInstanceOf(TestSuiteNotFoundError);
  });

  it('should not return a TeslinkError when receive a invalid string error', () => {
    const error = new Error('Error: getaddrinfo ENOTFOUND invalid url');

    const result = TestlinkClientErrorFactory.parseError(error);
    expect(result).toBeInstanceOf(Error);
  });
});
