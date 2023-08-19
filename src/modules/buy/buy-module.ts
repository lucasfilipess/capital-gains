import { ProcessOperation } from "@/processes/operations-process";

const buyModule = ({ store, operation, tax, success }: ProcessOperation) => {
  store.calculateWeightedAveragePrice({
    shares: store.shares,
    "unit-cost": operation["unit-cost"],
    quantity: operation.quantity,
  });

  store.addShares(operation.quantity);
  tax = 0;
  success = true;

  return { store, operation, tax, success };
};

export default buyModule;
