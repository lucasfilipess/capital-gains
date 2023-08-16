import assert from "node:assert";
import { test } from "node:test";

import { ProfitStore } from "@/store";

test("Profit store", async (t) => {
  const profitStore = new ProfitStore();
  await t.test("Calculate profit", () => {
    const profit = profitStore.calculateProfit({
      quantity: 15 * 1000,
      "unit-cost": 20,
      weightedAveragePrice: 10.0,
    });
    assert.equal(profit, 15 * 10 * 1000);
  });

  await t.test("Clear store", () => {
    profitStore.clearStore();
    assert.equal(profitStore.profit, 0);
  });
});
