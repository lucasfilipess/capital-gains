import { TOTAL_TAX_FREE_TRANSACTION_COST } from "@/config";
import { ProcessOperation } from "@/processes/operations-process";

const taxFreeProfitModule = ({
  store,
  operation,
  tax,
  success,
}: ProcessOperation) => {
  if (
    operation["unit-cost"] > store.weightedAveragePrice &&
    operation["unit-cost"] * operation.quantity <
      TOTAL_TAX_FREE_TRANSACTION_COST
  ) {
    store.removeShares(operation.quantity);

    const profit = store.calculateProfit({
      weightedAveragePrice: store.weightedAveragePrice,
      "unit-cost": operation["unit-cost"],
      quantity: operation.quantity,
    });

    store.removeLoss(profit);

    tax = 0;
    success = true;
  }
  return { store, operation, tax, success };
};

export default taxFreeProfitModule;
