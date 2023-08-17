import { TAX_PERCENTAGE, TOTAL_TAX_FREE_TRANSACTION_AMOUNT } from "@/config";
import { ITax } from "@/shared/interfaces";
import {
  ILossStore,
  IProfitStore,
  ISharesStore,
  IWeightedAveragePriceStore,
} from "@/store";
import { useDecimals } from "@/utils";

interface ISellControllerParams {
  "unit-cost": number;
  quantity: number;
}

export default class SellController {
  constructor(
    private sharesStore: ISharesStore,
    private weightedAveragePriceStore: IWeightedAveragePriceStore,
    private lossStore: ILossStore,
    private profitStore: IProfitStore,
  ) {}

  /**
   * Execute the sell operation
   * @param {IOperationParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: ISellControllerParams): ITax {
    const { quantity, "unit-cost": unitCost } = params;

    let tax = 0;

    this.sharesStore.removeShares(quantity);

    if (unitCost === this.weightedAveragePriceStore.weightedAveragePrice) {
      return { tax };
    }

    this.profitStore.calculateProfit({
      ...params,
      weightedAveragePrice: this.weightedAveragePriceStore.weightedAveragePrice,
    });

    if (unitCost * quantity <= TOTAL_TAX_FREE_TRANSACTION_AMOUNT) {
      this.lossStore.discountLoss(this.profitStore.profit);
      return { tax };
    }

    if (this.lossStore.loss > this.profitStore.profit) {
      this.lossStore.discountLoss(this.profitStore.profit);
      return { tax };
    }

    if (unitCost < this.weightedAveragePriceStore.weightedAveragePrice) {
      this.lossStore.calculateLoss({
        ...params,
        weightedAveragePrice:
          this.weightedAveragePriceStore.weightedAveragePrice,
      });
      return { tax };
    }

    tax = useDecimals(
      (this.profitStore.profit - this.lossStore.loss) * TAX_PERCENTAGE,
    );

    this.lossStore.discountLoss(this.profitStore.profit);

    return { tax };
  }
}
