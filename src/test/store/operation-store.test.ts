import assert from "node:assert";
import { test } from "node:test";

import { createOperationStore } from "@/store";

test("Operation store", async (t) => {
  const operationStore = createOperationStore();

  await t.test("Add shares", () => {
    const newShares = 10 * 1000;
    operationStore.addShares(newShares);
    assert.equal(operationStore.shares, newShares);
  });

  await t.test("Remove shares", () => {
    operationStore.removeShares(3 * 1000);
    assert.equal(operationStore.shares, 7 * 1000);
  });

  await t.test("Calculate weighted average price", () => {
    operationStore.calculateWeightedAveragePrice({
      quantity: 5 * 1000,
      "unit-cost": 10,
      shares: 0,
    });

    operationStore.calculateWeightedAveragePrice({
      quantity: 1 * 1000,
      "unit-cost": 15,
      shares: 4 * 1000,
    });

    assert.equal(operationStore.weightedAveragePrice, 11);
  });

  await t.test("Add loss", () => {
    operationStore.addLoss({
      quantity: 2 * 1000,
      "unit-cost": 5,
      weightedAveragePrice: 10,
    });
    assert.equal(operationStore.loss, 10 * 1000);
  });

  await t.test("Remove loss", () => {
    operationStore.removeLoss(3 * 1000);
    assert.equal(operationStore.loss, 7 * 1000);
  });

  await t.test("Calculate profit", () => {
    const profit = operationStore.calculateProfit({
      quantity: 2 * 1000,
      "unit-cost": 15,
      weightedAveragePrice: 10,
    });
    assert.equal(profit, 10 * 1000);
  });
});
