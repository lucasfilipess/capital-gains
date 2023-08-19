import assert from "node:assert";
import { test } from "node:test";

import { lossModule } from "@/modules/sell";
import { createOperationStore } from "@/store";

test("Loss module", () => {
  const operationStore = createOperationStore();
  const quantity = 4 * 1000;

  operationStore.calculateWeightedAveragePrice({
    quantity,
    "unit-cost": 15,
    shares: 0,
  });

  operationStore.addShares(quantity);

  const result = lossModule({
    store: operationStore,
    operation: {
      quantity: 3 * 1000,
      "unit-cost": 10,
      operation: "sell",
    },
    tax: 0,
    success: false,
  });

  assert.equal(operationStore.shares, 1 * 1000);
  assert.equal(operationStore.loss, 15 * 1000);
  assert.equal(result.tax, 0);
  assert.equal(result.success, true);
});
