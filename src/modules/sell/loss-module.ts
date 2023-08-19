import { ProcessOperation } from "@/processes/operations-process";

const lossModule = ({ store, operation, tax, success }: ProcessOperation) => {
  if (operation["unit-cost"] < store.weightedAveragePrice) {
    store.removeShares(operation.quantity);

    store.addLoss({
      weightedAveragePrice: store.weightedAveragePrice,
      "unit-cost": operation["unit-cost"],
      quantity: operation.quantity,
    });

    tax = 0;
    success = true;
  }
  return { store, operation, tax, success };
};

export default lossModule;
