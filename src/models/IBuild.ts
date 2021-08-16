export interface IBuild {
  readonly id: number;
  readonly name: string;
  readonly testPlanId: number;
  readonly notes?: string | '';
}
