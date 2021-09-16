import { AbstractAdapter } from '../../adapters/abstractAdapter';

class ConcreteAdapter extends AbstractAdapter<string, string> {
  protected normalizeFunction(testCase: string): string {
    return testCase;
  }

  protected isValidTestElement(testCase: string) {
    return !!testCase;
  }
}

describe('Test Project Adapter Test', () => {
  it('should return the correct INormalizedConcrete when receive a valid IConcrete', async () => {
    const concrete = ['fakeString'];

    const normalizedConcrete = new ConcreteAdapter().normalize(concrete);

    expect(normalizedConcrete).toEqual(['fakeString']);
  });

  it('should return default atributes when receive neither valid IConcrete', async () => {
    const concrete: string[] = [];

    const normalizedConcrete = new ConcreteAdapter().normalize(concrete);

    expect(normalizedConcrete).toEqual([]);
  });
});
