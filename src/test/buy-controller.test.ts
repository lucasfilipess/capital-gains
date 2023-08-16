import assert from "node:assert";
import { test } from "node:test";

import { BuyController } from "@/controllers";
import { SharesStore, WeightedAveragePriceStore } from "@/store";

test("Buy operation", () => {
  const sharesStore = new SharesStore();
  const weightedAveragePriceStore = new WeightedAveragePriceStore();

  const buyController = new BuyController(
    sharesStore,
    weightedAveragePriceStore,
  );

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

  assert.equal(weightedAveragePriceStore.weightedAveragePrice, 12.5);
  assert.equal(sharesStore.shares, 100 * 1000);
});
