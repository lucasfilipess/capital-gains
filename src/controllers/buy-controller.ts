import { ITax } from "@/shared/interfaces";
import { ISharesStore, IWeightedAveragePriceStore } from "@/store";

interface IBuyControllerParams {
  "unit-cost": number;
  quantity: number;
}

export default class BuyController {
  constructor(
    private sharesStore: ISharesStore,
    private weightedAveragePriceStore: IWeightedAveragePriceStore,
  ) {}

  /**
   * Execute the buy operation
   * @param {IBuyControllerParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: IBuyControllerParams): ITax {
    this.weightedAveragePriceStore.calculateWeightedAveragePrice({
      ...params,
      shares: this.sharesStore.shares,
    });
    this.sharesStore.addShares(params.quantity);

    return { tax: 0 };
  }
}
