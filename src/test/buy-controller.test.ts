import assert from "node:assert";
import { test } from "node:test";

import { OperationStore } from "@/store";

import BuyController from "../controllers/buy-controller";

test("buy operation", () => {
  const operationStore = new OperationStore();
  const buyController = new BuyController(operationStore);

  const operations = [
    {
      operation: "buy",
      "unit-cost": 10.0,
      quantity: 50 * 1000,
    },
    {
      operation: "buy",
      "unit-cost": 15.0,
      quantity: 50 * 1000,
    },
  ];

  operations.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      const result = buyController.execute(rest);
      assert.equal(JSON.stringify(result), JSON.stringify({ tax: 0 }));
    }
  });

  assert.equal(operationStore.weightedAveragePrice, 12.5);
  assert.equal(operationStore.numberOfShares, 100 * 1000);
});
