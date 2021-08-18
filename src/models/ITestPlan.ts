export interface ITestPlan {
  readonly id: number;
  readonly testProjectId: number;
  readonly name: string;
  readonly apiKey: string;
  readonly notes?: string | '';
}
