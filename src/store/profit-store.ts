interface CalculateProfitParams {
  "unit-cost": number;
  quantity: number;
  weightedAveragePrice: number;
}

export interface IProfitStore {
  profit: number;
  calculateProfit(params: CalculateProfitParams): number;
  clearStore(): void;
}

export default class ProfitStore implements IProfitStore {
  private _profit = 0;

  /**
   * Calculated profit
   * @returns {number}
   */
  get profit(): number {
    return this._profit;
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
    this._profit = quantity * unitCost - quantity * weightedAveragePrice;
    return this._profit;
  }

  /**
   * Reset the store values
   * @returns {void}
   */
  clearStore(): void {
    this._profit = 0;
  }
}
