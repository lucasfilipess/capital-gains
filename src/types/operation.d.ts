export interface IOperation {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
}
