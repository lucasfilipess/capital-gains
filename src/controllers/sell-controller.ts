import { TOTAL_TAX_FREE_TRANSACTION_AMOUNT } from "@/config";
import { IOperationParams, IOperationStore, ITax } from "@/types";
import { useDecimals } from "@/utils";

export default class SellController {
  constructor(private operationStore: IOperationStore) {}

  /**
   * Execute the sell operation
   * @param {IOperationParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: IOperationParams): ITax {
    const { quantity, "unit-cost": unitCost } = params;

    let tax = 0;

    this.operationStore.removeShares(quantity);

    if (unitCost === this.operationStore.weightedAveragePrice) {
      return { tax };
    }

    this.operationStore.calculateProfit(params);

    if (unitCost * quantity <= TOTAL_TAX_FREE_TRANSACTION_AMOUNT) {
      this.operationStore.discountLoss();
      return { tax };
    }

    if (this.operationStore.loss > this.operationStore.profit) {
      this.operationStore.discountLoss();
      return { tax };
    }

    if (unitCost < this.operationStore.weightedAveragePrice) {
      this.operationStore.calculateLoss(params);
      return { tax };
    }

    if (this.operationStore.loss > 0) {
      tax = useDecimals(
        (this.operationStore.profit - this.operationStore.loss) * 0.2,
      );
      this.operationStore.discountLoss();
    } else {
      tax = useDecimals(this.operationStore.profit * 0.2);
    }

    return { tax };
  }
}
