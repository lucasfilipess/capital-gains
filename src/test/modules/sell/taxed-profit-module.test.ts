import assert from "node:assert";
import { test } from "node:test";

import { taxedProfitModule } from "@/modules/sell";
import { createOperationStore } from "@/store";

test("Taxed profit module", () => {
  const operationStore = createOperationStore();
  const quantity = 10 * 1000;

  operationStore.calculateWeightedAveragePrice({
    quantity,
    "unit-cost": 15,
    shares: 0,
  });

  operationStore.addShares(quantity);

  const sellQuantity = 3 * 1000;

  operationStore.removeShares(sellQuantity);

  operationStore.addLoss({
    quantity: sellQuantity,
    "unit-cost": 5,
    weightedAveragePrice: operationStore.weightedAveragePrice,
  });

  const result = taxedProfitModule({
    store: operationStore,
    operation: {
      quantity: 7 * 1000,
      "unit-cost": 20,
      operation: "sell",
    },
    tax: 0,
    success: false,
  });

  assert.equal(operationStore.shares, 0);
  assert.equal(operationStore.loss, 0);
  assert.equal(result.tax, 1 * 1000);
  assert.equal(result.success, true);
});
