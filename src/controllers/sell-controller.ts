import { IOperationStore } from "@/store";
import { IOperationParams, ITax } from "@/types";

const TOTAL_TAX_FREE_TRANSACTION_AMOUNT = 20 * 1000;

export default class SellController {
  constructor(private operationStore: IOperationStore) {}

  execute(params: IOperationParams): ITax {
    const { quantity, "unit-cost": unitCost } = params;

    this.operationStore.removeShares(quantity);

    if (unitCost === this.operationStore.weightedAveragePrice) {
      return { tax: 0 };
    }

    this.operationStore.calculateProfit(params);

    if (
      unitCost * quantity <= TOTAL_TAX_FREE_TRANSACTION_AMOUNT ||
      this.operationStore.loss > this.operationStore.profit
    ) {
      this.operationStore.discountLoss();
      return { tax: 0 };
    }

    if (unitCost < this.operationStore.weightedAveragePrice) {
      this.operationStore.calculateLoss(params);
      return { tax: 0 };
    }

    const tax = (this.operationStore.profit - this.operationStore.loss) * 0.2;

    if (this.operationStore.loss > 0) this.operationStore.discountLoss();

    return { tax };
  }
}
