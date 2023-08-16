import assert from "node:assert";
import { test } from "node:test";

import { OperationStoreController } from "@/controllers";

test("add new shares", () => {
  const operationStoreController = new OperationStoreController();
  const newShares = 10 * 1000;

  operationStoreController.addNewShares(newShares);

  assert.equal(operationStoreController.totalQuantityOfShares, newShares);
});

test("remove shares", () => {
  const operationStoreController = new OperationStoreController();

  operationStoreController.addNewShares(10 * 1000);

  operationStoreController.removeShares(3 * 1000);

  assert.equal(operationStoreController.totalQuantityOfShares, 7 * 1000);
});

test("calculate loss", () => {
  const operationStoreController = new OperationStoreController();
  const inputLines = [
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

  inputLines.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      operationStoreController.calculateNewWeightedAveragePrice(rest);
      assert.equal(operationStoreController.weightedAveragePrice, 10.0);
    } else {
      operationStoreController.calculateLoss(rest);
      assert.equal(operationStoreController.loss, 25 * 10 * 1000);
    }
  });
});

test("discount loss", () => {
  const operationStoreController = new OperationStoreController();
  const inputLines = [
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

  inputLines.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      operationStoreController.calculateNewWeightedAveragePrice(rest);
      assert.equal(operationStoreController.weightedAveragePrice, 10.0);
    } else {
      if (operationStoreController.loss > 0) {
        operationStoreController.calculateProfit(rest);
        assert.equal(operationStoreController.profit, 25 * 10 * 1000);
        operationStoreController.discountLoss();
        assert.equal(operationStoreController.loss, 0);
      } else {
        operationStoreController.calculateLoss(rest);
        assert.equal(operationStoreController.loss, 25 * 1000);
      }
    }
  });
});

test("calculate new weighted average price", () => {
  const operationStoreController = new OperationStoreController();
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
      operationStoreController.calculateNewWeightedAveragePrice(rest);
      operationStoreController.addNewShares(rest.quantity);
    }
  });

  assert.equal(operationStoreController.weightedAveragePrice, 12.5);
});

test("calculate profit", () => {
  const operationStoreController = new OperationStoreController();
  const inputLines = [
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

  inputLines.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      operationStoreController.calculateNewWeightedAveragePrice(rest);
      assert.equal(operationStoreController.weightedAveragePrice, 10.0);
    } else {
      operationStoreController.calculateProfit(rest);
      assert.equal(operationStoreController.profit, 15 * 10 * 1000);
    }
  });
});
