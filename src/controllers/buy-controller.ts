import { IOperationParams, IOperationStore, ITax } from "@/types";

export default class BuyController {
  constructor(private operationStore: IOperationStore) {}

  /**
   * Execute the buy operation
   * @param {IOperationParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: IOperationParams): ITax {
    this.operationStore.calculateNewWeightedAveragePrice(params);
    this.operationStore.addNewShares(params.quantity);

    return { tax: 0 };
  }
}
