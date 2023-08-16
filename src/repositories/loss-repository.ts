interface CalculateLossParams {
  "unit-cost": number;
  quantity: number;
  weightedAveragePrice: number;
}

export interface ILossRepository {
  getLoss(): number;
  calculateLoss(params: CalculateLossParams): void;
  discountLoss(profit: number): void;
}

export default class LossRepository implements ILossRepository {
  private loss = 0;

  /**
   * Calculated loss
   * @returns {number}
   */
  getLoss(): number {
    return this.loss;
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
    this.loss += weightedAveragePrice * quantity - quantity * unitCost;
    return this.loss;
  }

  /**
   * Discounts the loss from a profit. If the profit is greater than the loss, the loss result is reset to zero.
   * @param {number} profit  Profit
   * @returns {void} Calculated loss
   */
  discountLoss(profit: number): number {
    this.loss = Math.max(0, this.loss - profit);
    return this.loss;
  }
}
