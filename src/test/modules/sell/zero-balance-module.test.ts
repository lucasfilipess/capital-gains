import assert from "node:assert";
import { test } from "node:test";

import { zeroBalanceModule } from "@/modules/sell";
import { createOperationStore } from "@/store";

test("Zero balance module", () => {
  const operationStore = createOperationStore();
  const quantity = 5 * 1000;

  operationStore.calculateWeightedAveragePrice({
    quantity,
    "unit-cost": 15,
    shares: 0,
  });

  operationStore.addShares(quantity);

  const result = zeroBalanceModule({
    store: operationStore,
    operation: {
      quantity: 5 * 1000,
      "unit-cost": 15,
      operation: "sell",
    },
    tax: 0,
    success: false,
  });

  assert.equal(operationStore.shares, 0);
  assert.equal(result.tax, 0);
  assert.equal(result.success, true);
});
