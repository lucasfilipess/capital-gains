import assert from "node:assert";
import { test } from "node:test";

import { taxFreeProfitModule } from "@/modules/sell";
import { createOperationStore } from "@/store";

test("Tax free profit module", () => {
  const operationStore = createOperationStore();
  const quantity = 5 * 1000;

  operationStore.calculateWeightedAveragePrice({
    quantity,
    "unit-cost": 15,
    shares: 0,
  });

  operationStore.addShares(quantity);

  const sellQuantity = 2 * 1000;

  operationStore.removeShares(sellQuantity);

  operationStore.addLoss({
    quantity: sellQuantity,
    "unit-cost": 5,
    weightedAveragePrice: operationStore.weightedAveragePrice,
  });

  const result = taxFreeProfitModule({
    store: operationStore,
    operation: {
      quantity: 0.5 * 1000,
      "unit-cost": 20,
      operation: "sell",
    },
    tax: 0,
    success: false,
  });

  assert.equal(operationStore.shares, 2.5 * 1000);
  assert.equal(operationStore.loss, 17.5 * 1000);
  assert.equal(result.tax, 0);
  assert.equal(result.success, true);
});
