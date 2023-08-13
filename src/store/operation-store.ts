import { IOperationParams } from "@/types";

export interface IOperationStore {
  numberOfShares: number;
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

export default class OperationStore implements IOperationStore {
  private _numberOfShares = 0;
  private _loss = 0;
  private _profit = 0;
  private _weightedAveragePrice = 0;

  get numberOfShares() {
    return this._numberOfShares;
  }

  get loss() {
    return this._loss;
  }

  get profit() {
    return this._profit;
  }

  get weightedAveragePrice() {
    return this._weightedAveragePrice;
  }

  addNewShares(increase: number) {
    this._numberOfShares += increase;
  }

  removeShares(decrease: number) {
    this._numberOfShares -= decrease;
  }

  calculateLoss({ quantity, "unit-cost": unitCost }: IOperationParams) {
    this._loss += this._weightedAveragePrice * quantity - quantity * unitCost;
  }

  discountLoss() {
    this._loss = Math.max(0, this._loss - this._profit);
  }

  calculateNewWeightedAveragePrice({
    quantity,
    "unit-cost": unitCost,
  }: IOperationParams) {
    this._weightedAveragePrice = Number(
      (
        (this._numberOfShares * this._weightedAveragePrice +
          quantity * unitCost) /
        (this._numberOfShares + quantity)
      ).toFixed(2),
    );
  }

  calculateProfit({ quantity, "unit-cost": unitCost }: IOperationParams) {
    this._profit = quantity * unitCost - quantity * this._weightedAveragePrice;
  }
}
