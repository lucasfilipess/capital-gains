import assert from "node:assert";
import { test } from "node:test";

import { WeightedAveragePriceStore } from "@/store";

test("Weighted average price store", async (t) => {
  const weightedAveragePriceStore = new WeightedAveragePriceStore();
  await t.test("Calculate weighted average price", () => {
    const weightedAveragePrice =
      weightedAveragePriceStore.calculateWeightedAveragePrice({
        quantity: 50 * 1000,
        "unit-cost": 5,
        shares: 0,
      });
    assert.equal(weightedAveragePrice, 5);
  });

  await t.test("Clear store", () => {
    weightedAveragePriceStore.clearStore();
    assert.equal(weightedAveragePriceStore.weightedAveragePrice, 0);
  });
});
