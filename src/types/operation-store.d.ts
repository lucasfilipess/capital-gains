export interface IOperationStore {
  totalQuantityOfShares: number;
  loss: number;
  profit: number;
  weightedAveragePrice: number;
  addNewShares(increase: number): void;
  removeShares(decrease: number): void;
  calculateLoss(params: IOperationParams): void;
  discountLoss(): void;
  calculateNewWeightedAveragePrice(params: IOperationParams): void;
  calculateProfit(params: IOperationParams): void;
}
