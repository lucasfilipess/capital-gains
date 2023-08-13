import assert from "node:assert";
import { test } from "node:test";

import OperationStore from "../store/operation-store";

test("add new shares", () => {
  const operationStore = new OperationStore();
  const newShares = 10 * 1000;

  operationStore.addNewShares(newShares);

  assert.equal(operationStore.numberOfShares, newShares);
});

test("remove shares", () => {
  const operationStore = new OperationStore();

  operationStore.addNewShares(10 * 1000);

  operationStore.removeShares(3 * 1000);

  assert.equal(operationStore.numberOfShares, 7 * 1000);
});

test("calculate loss", () => {
  const operationStore = new OperationStore();
  const operations = [
    {
      operation: "buy",
      "unit-cost": 10,
      quantity: 50 * 1000,
    },
    {
      operation: "sell",
      "unit-cost": 5,
      quantity: 50 * 1000,
    },
  ];

  operations.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      operationStore.calculateNewWeightedAveragePrice(rest);
      assert.equal(operationStore.weightedAveragePrice, 10.0);
    } else {
      operationStore.calculateLoss(rest);
      assert.equal(operationStore.loss, 25 * 10 * 1000);
    }
  });
});

test("discount loss", () => {
  const operationStore = new OperationStore();
  const operations = [
    {
      operation: "buy",
      "unit-cost": 10,
      quantity: 50 * 1000,
    },
    {
      operation: "sell",
      "unit-cost": 5,
      quantity: 5 * 1000,
    },
    {
      operation: "sell",
      "unit-cost": 20,
      quantity: 25 * 1000,
    },
  ];

  operations.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      operationStore.calculateNewWeightedAveragePrice(rest);
      assert.equal(operationStore.weightedAveragePrice, 10.0);
    } else {
      if (operationStore.loss > 0) {
        operationStore.calculateProfit(rest);
        assert.equal(operationStore.profit, 25 * 10 * 1000);
        operationStore.discountLoss();
        assert.equal(operationStore.loss, 0);
      } else {
        operationStore.calculateLoss(rest);
        assert.equal(operationStore.loss, 25 * 1000);
      }
    }
  });
});

test("calculate new weighted average price", () => {
  const operationStore = new OperationStore();
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
      operationStore.calculateNewWeightedAveragePrice(rest);
      operationStore.addNewShares(rest.quantity);
    }
  });

  assert.equal(operationStore.weightedAveragePrice, 12.5);
});

test("calculate profit", () => {
  const operationStore = new OperationStore();
  const operations = [
    {
      operation: "buy",
      "unit-cost": 10,
      quantity: 50 * 1000,
    },
    {
      operation: "sell",
      "unit-cost": 20,
      quantity: 15 * 1000,
    },
  ];

  operations.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      operationStore.calculateNewWeightedAveragePrice(rest);
      assert.equal(operationStore.weightedAveragePrice, 10.0);
    } else {
      operationStore.calculateProfit(rest);
      assert.equal(operationStore.profit, 15 * 10 * 1000);
    }
  });
});
