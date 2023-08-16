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
    const { sharesStore, weightedAveragePriceStore, lossStore, profitStore } =
      this;
    const { quantity, "unit-cost": unitCost } = params;

    let tax = 0;

    sharesStore.removeShares(quantity);

    if (unitCost === weightedAveragePriceStore.weightedAveragePrice) {
      return { tax };
    }

    profitStore.calculateProfit({
      ...params,
      weightedAveragePrice: weightedAveragePriceStore.weightedAveragePrice,
    });

    if (unitCost * quantity <= TOTAL_TAX_FREE_TRANSACTION_AMOUNT) {
      lossStore.discountLoss(profitStore.profit);
      return { tax };
    }

    if (lossStore.loss > profitStore.profit) {
      lossStore.discountLoss(profitStore.profit);
      return { tax };
    }

    if (unitCost < weightedAveragePriceStore.weightedAveragePrice) {
      lossStore.calculateLoss({
        ...params,
        weightedAveragePrice: weightedAveragePriceStore.weightedAveragePrice,
      });
      return { tax };
    }

    if (lossStore.loss > 0) {
      tax = useDecimals((profitStore.profit - lossStore.loss) * TAX_PERCENTAGE);
      lossStore.discountLoss(profitStore.profit);
    } else {
      tax = useDecimals(profitStore.profit * TAX_PERCENTAGE);
    }

    return { tax };
  }
}
