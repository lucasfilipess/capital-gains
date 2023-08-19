import { useTwoDecimalPlaces } from "@/utils";

type OperationStoreParams = {
  "unit-cost": number;
  quantity: number;
};

type CalculateBalanceParams = OperationStoreParams & {
  weightedAveragePrice: number;
};

type CalculateWeightedAverageParams = OperationStoreParams & { shares: number };

export type OperationStore = {
  readonly shares: number;
  readonly weightedAveragePrice: number;
  readonly loss: number;
  addLoss(params: CalculateBalanceParams): number;
  removeLoss(profit: number): number;
  addShares(quantity: number): number;
  removeShares(quantity: number): number;
  calculateWeightedAveragePrice(params: CalculateWeightedAverageParams): number;
  calculateProfit(params: CalculateBalanceParams): number;
};

const createOperationStore = () => {
  let _shares = 0;
  let _weightedAveragePrice = 0;
  let _loss = 0;

  const operationStore: OperationStore = {
    /**
     * Total quantity of shares obtained in operations
     * @returns {number}
     */
    get shares(): number {
      return _shares;
    },

    /**
     * Calculated weighted average price
     * @returns {number}
     */
    get weightedAveragePrice(): number {
      return _weightedAveragePrice;
    },

    /**
     * Calculated loss
     * @returns {number}
     */
    get loss(): number {
      return _loss;
    },

    /**
     * Calculates the total amount lost in an operation
     * @param {CalculateBalanceParams} params  Object containing the number of shares the unit cost and, the weighted average price
     * @returns {number} Calculated loss
     */
    addLoss({
      quantity,
      "unit-cost": unitCost,
      weightedAveragePrice,
    }: CalculateBalanceParams): number {
      _loss += weightedAveragePrice * quantity - quantity * unitCost;
      return _loss;
    },

    /**
     * Discounts the loss from a profit. If the profit is greater than the loss, the loss result is reset to zero.
     * @param {number} profit  Profit
     * @returns {void} Calculated loss
     */
    removeLoss(profit: number): number {
      _loss = Math.max(0, _loss - profit);
      return _loss;
    },

    /**
     * Increase the total quantity of shares according to the value passed in the param
     * @param {number} quantity Number of shares to be increased
     * @returns {number} Total quantity of shares obtained in operations
     */
    addShares(quantity: number): number {
      _shares += quantity;
      return _shares;
    },

    /**
     * Decrease the total of shares according to the value passed in the param
     * @param {number} quantity Number of shares to be decreased
     * @returns {number} Total quantity of shares obtained in operations
     */
    removeShares(quantity: number): number {
      _shares -= quantity;
      return _shares;
    },

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
      const totalAmount = shares * _weightedAveragePrice + quantity * unitCost;

      const totalQuantityOfShares = shares + quantity;

      _weightedAveragePrice = useTwoDecimalPlaces(
        totalAmount / totalQuantityOfShares,
      );
      return _weightedAveragePrice;
    },

    /**
     * Calculates weighted average price
     * @param {CalculateWeightedAverageParams} params Object containing the number of total shares the number of new shares and, the unit cost
     * @returns {number} Calculated weighted average price
     */
    calculateProfit({
      quantity,
      "unit-cost": unitCost,
      weightedAveragePrice,
    }: CalculateBalanceParams): number {
      return quantity * unitCost - quantity * weightedAveragePrice;
    },
  };

  return operationStore;
};

export default createOperationStore;
