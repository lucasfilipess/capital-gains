import assert from "node:assert";
import { test } from "node:test";

import { BuyController, OperationStoreController } from "@/controllers";

test("buy operation", () => {
  const operationStoreController = new OperationStoreController();
  const buyController = new BuyController(operationStoreController);

  const inputLines = [
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

  inputLines.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      const result = buyController.execute(rest);
      assert.equal(JSON.stringify(result), JSON.stringify({ tax: 0 }));
    }
  });

  assert.equal(operationStoreController.weightedAveragePrice, 12.5);
  assert.equal(operationStoreController.totalQuantityOfShares, 100 * 1000);
});
