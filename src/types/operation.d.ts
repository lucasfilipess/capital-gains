export interface IOperation {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
}

export interface IOperationParams {
  "unit-cost": number;
  quantity: number;
}
