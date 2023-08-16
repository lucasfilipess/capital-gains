import { IOperationParams, IOperationStore } from "@/types";

export default class OperationStoreController implements IOperationStore {
  private _totalQuantityOfShares = 0;
  private _loss = 0;
  private _profit = 0;
  private _weightedAveragePrice = 0;

  /**
   * Total quantity of shares obtained in operations
   * @returns {number}
   */
  get totalQuantityOfShares(): number {
    return this._totalQuantityOfShares;
  }

  /**
   * Calculated loss
   * @returns {number}
   */
  get loss(): number {
    return this._loss;
  }

  /**
   * Calculated profit
   * @returns {number}
   */
  get profit(): number {
    return this._profit;
  }

  /**
   * Calculated weighted average price
   * @returns {number}
   */
  get weightedAveragePrice(): number {
    return this._weightedAveragePrice;
  }

  /**
   * Increase the total quantity of shares according to the value passed in the param
   * @param {number} shares Number of shares to be increased
   * @returns {void}
   */
  addNewShares(shares: number): void {
    this._totalQuantityOfShares += shares;
  }

  /**
   * Decrease the total of shares according to the value passed in the param
   * @param {number} shares Number of shares to be decreased
   * @returns {void}
   */
  removeShares(shares: number): void {
    this._totalQuantityOfShares -= shares;
  }

  /**
   * Calculates the total amount lost in an operation
   * @param {IOperationParams} params  Object containing the number of shares and the unit cost
   * @returns {void}
   */
  calculateLoss({ quantity, "unit-cost": unitCost }: IOperationParams): void {
    this._loss += this._weightedAveragePrice * quantity - quantity * unitCost;
  }

  /**
   * Discounts the loss from a profit. If the profit is greater than the loss, the loss result is reset to zero.
   * @returns {void}
   */
  discountLoss(): void {
    this._loss = Math.max(0, this._loss - this._profit);
  }

  /**
   * Calculates weighted average price
   * @param {IOperationParams} params Object containing the number of shares and the unit cost
   * @returns {void}
   */
  calculateNewWeightedAveragePrice({
    quantity,
    "unit-cost": unitCost,
  }: IOperationParams): void {
    const totalAmount =
      this._totalQuantityOfShares * this._weightedAveragePrice +
      quantity * unitCost;

    const totalQuantityOfShares = this._totalQuantityOfShares + quantity;

    this._weightedAveragePrice = Number(
      (totalAmount / totalQuantityOfShares).toFixed(2),
    );
  }

  /**
   * Calculates the profit obtained in an operation
   * @param {IOperationParams} params Object containing the number of shares and the unit cost
   * @returns {void}
   */
  calculateProfit({ quantity, "unit-cost": unitCost }: IOperationParams): void {
    this._profit = quantity * unitCost - quantity * this._weightedAveragePrice;
  }

  /**
   * Reset the store values
   * @returns {void}
   */
  clearStore(): void {
    this._totalQuantityOfShares = 0;
    this._loss = 0;
    this._profit = 0;
    this._weightedAveragePrice = 0;
  }
}
