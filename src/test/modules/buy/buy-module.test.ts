import assert from "node:assert";
import { test } from "node:test";

import { buyModule } from "@/modules/buy";
import { createOperationStore } from "@/store";

test("Buy module", () => {
  const operationStore = createOperationStore();
  const result = buyModule({
    store: operationStore,
    operation: {
      quantity: 5 * 1000,
      "unit-cost": 10,
      operation: "buy",
    },
    tax: 0,
    success: false,
  });
  assert.equal(operationStore.weightedAveragePrice, 10);
  assert.equal(operationStore.shares, 5 * 1000);
  assert.equal(result.tax, 0);
  assert.equal(result.success, true);
});
