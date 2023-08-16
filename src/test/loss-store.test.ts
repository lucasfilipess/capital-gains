import assert from "node:assert";
import { test } from "node:test";

import { LossStore } from "@/store";

test("Loss store", async (t) => {
  const lossStore = new LossStore();
  await t.test("Calculate loss", () => {
    const loss = lossStore.calculateLoss({
      quantity: 50 * 1000,
      "unit-cost": 5,
      weightedAveragePrice: 10.0,
    });
    assert.equal(loss, 25 * 10 * 1000);
  });

  await t.test("Discount loss", () => {
    const loss = lossStore.discountLoss(25 * 10 * 1000);
    assert.equal(loss, 0);
  });

  await t.test("Clear store", () => {
    lossStore.clearStore();
    assert.equal(lossStore.loss, 0);
  });
});
