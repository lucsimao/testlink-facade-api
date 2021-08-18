export interface ITestCase {
  readonly id: number;
  readonly authorId: number;
  readonly name: string;
  readonly preconditions: string | '';
  readonly summary: string | '';
}
