import { ProcessOperation } from "@/processes/operations-process";

const zeroBalanceModule = ({
  store,
  operation,
  tax,
  success,
}: ProcessOperation) => {
  if (operation["unit-cost"] === store.weightedAveragePrice) {
    store.removeShares(operation.quantity);
    tax = 0;
    success = true;
  }
  return { store, operation, tax, success };
};

export default zeroBalanceModule;
