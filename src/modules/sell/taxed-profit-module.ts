import { TAX_PERCENTAGE, TOTAL_TAX_FREE_TRANSACTION_COST } from "@/config";
import { ProcessOperation } from "@/processes/operations-process";
import { useTwoDecimalPlaces } from "@/utils";

const taxedProfitModule = ({
  store,
  operation,
  tax,
  success,
}: ProcessOperation) => {
  if (
    operation["unit-cost"] > store.weightedAveragePrice &&
    operation["unit-cost"] * operation.quantity >
      TOTAL_TAX_FREE_TRANSACTION_COST
  ) {
    store.removeShares(operation.quantity);

    const profit = store.calculateProfit({
      weightedAveragePrice: store.weightedAveragePrice,
      "unit-cost": operation["unit-cost"],
      quantity: operation.quantity,
    });

    tax = useTwoDecimalPlaces(
      Math.max(0, profit - store.loss) * TAX_PERCENTAGE,
    );

    store.removeLoss(profit);
    success = true;
  }
  return { store, operation, tax, success };
};

export default taxedProfitModule;
