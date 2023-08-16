interface CalculateProfitParams {
  "unit-cost": number;
  quantity: number;
  weightedAveragePrice: number;
}

export interface IProfitRepository {
  getProfit(): number;
  calculateProfit(params: CalculateProfitParams): void;
}

export default class ProfitRepository implements IProfitRepository {
  private profit = 0;

  /**
   * Calculated profit
   * @returns {number}
   */
  getProfit(): number {
    return this.profit;
  }

  /**
   * Calculates the profit obtained in an operation
   * @param {CalculateProfitParams} params Object containing the number of shares the unit cost and, the weighted average price
   * @returns {number} Calculated profit
   */
  calculateProfit({
    quantity,
    "unit-cost": unitCost,
    weightedAveragePrice,
  }: CalculateProfitParams): number {
    this.profit = quantity * unitCost - quantity * weightedAveragePrice;
    return this.profit;
  }
}
