interface CalculateLossParams {
  "unit-cost": number;
  quantity: number;
  weightedAveragePrice: number;
}

export interface ILossStore {
  loss: number;
  calculateLoss(params: CalculateLossParams): number;
  discountLoss(profit: number): number;
  clearStore(): void;
}

export default class LossStore implements ILossStore {
  private _loss = 0;

  /**
   * Calculated loss
   * @returns {number}
   */
  get loss(): number {
    return this._loss;
  }

  /**
   * Calculates the total amount lost in an operation
   * @param {CalculateLossParams} params  Object containing the number of shares the unit cost and, the weighted average price
   * @returns {number} Calculated loss
   */
  calculateLoss({
    quantity,
    "unit-cost": unitCost,
    weightedAveragePrice,
  }: CalculateLossParams): number {
    this._loss += weightedAveragePrice * quantity - quantity * unitCost;
    return this._loss;
  }

  /**
   * Discounts the loss from a profit. If the profit is greater than the loss, the loss result is reset to zero.
   * @param {number} profit  Profit
   * @returns {void} Calculated loss
   */
  discountLoss(profit: number): number {
    this._loss = Math.max(0, this._loss - profit);
    return this._loss;
  }

  /**
   * Reset the store values
   * @returns {void}
   */
  clearStore(): void {
    this._loss = 0;
  }
}
