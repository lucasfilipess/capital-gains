interface CalculateWeightedAverageParams {
  "unit-cost": number;
  quantity: number;
  shares: number;
}

export interface IWeightedAveragePriceStore {
  weightedAveragePrice: number;
  calculateWeightedAveragePrice(params: CalculateWeightedAverageParams): number;
  clearStore(): void;
}

export default class WeightedAveragePriceStore
  implements IWeightedAveragePriceStore
{
  private _weightedAveragePrice = 0;

  /**
   * Calculated weighted average price
   * @returns {number}
   */
  get weightedAveragePrice(): number {
    return this._weightedAveragePrice;
  }

  /**
   * Calculates weighted average price
   * @param {CalculateWeightedAverageParams} params Object containing the number of total shares the number of new shares and, the unit cost
   * @returns {number} Calculated weighted average price
   */
  calculateWeightedAveragePrice({
    quantity,
    "unit-cost": unitCost,
    shares,
  }: CalculateWeightedAverageParams): number {
    const totalAmount =
      shares * this._weightedAveragePrice + quantity * unitCost;

    const totalQuantityOfShares = shares + quantity;

    this._weightedAveragePrice = Number(
      (totalAmount / totalQuantityOfShares).toFixed(2),
    );
    return this._weightedAveragePrice;
  }

  /**
   * Reset the store values
   * @returns {void}
   */
  clearStore(): void {
    this._weightedAveragePrice = 0;
  }
}
