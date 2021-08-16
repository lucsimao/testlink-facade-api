export abstract class AbstractAdapter<RawType, NormalizedType> {
  public normalize(testElements: RawType[]): NormalizedType[] {
    return testElements
      .filter(this.isValidTestElement.bind(this))
      .map((testElement) => this.normalizeFunction(testElement));
  }

  protected abstract normalizeFunction(testElement: RawType): NormalizedType;

  protected abstract isValidTestElement(testElement: Partial<RawType>): boolean;
}
