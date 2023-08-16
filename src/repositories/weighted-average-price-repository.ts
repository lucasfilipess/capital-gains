interface CalculateWeightedAverageParams {
  "unit-cost": number;
  quantity: number;
  shares: number;
}

export interface IWeightedAveragePriceRepository {
  getWeightedAveragePrice(): number;
  calculateWeightedAveragePrice(params: CalculateWeightedAverageParams): void;
}

export default class WeightedAveragePriceRepository
  implements IWeightedAveragePriceRepository
{
  private weightedAveragePrice = 0;

  /**
   * Calculated weighted average price
   * @returns {number}
   */
  getWeightedAveragePrice(): number {
    return this.weightedAveragePrice;
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
      shares * this.weightedAveragePrice + quantity * unitCost;

    const totalQuantityOfShares = shares + quantity;

    this.weightedAveragePrice = Number(
      (totalAmount / totalQuantityOfShares).toFixed(2),
    );
    return this.weightedAveragePrice;
  }
}
