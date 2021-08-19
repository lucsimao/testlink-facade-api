export interface ITestCase {
  readonly id: number;
  readonly externalId: string;
  readonly name: string;
  readonly preconditions: string | '';
  readonly summary: string | '';
}
