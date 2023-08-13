import assert from "node:assert";
import { test } from "node:test";

import { BuyController, SellController } from "@/controllers";
import { OperationStore } from "@/store";

test("Integration test case 1", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 100 },
    { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    { operation: "sell", "unit-cost": 15.0, quantity: 50 },
  ];

  const answer = [{ tax: 0 }, { tax: 0 }, { tax: 0 }];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 2", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
  ];

  const answer = [{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 1 + case 2", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 100 },
    { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
  ];

  const answer = [
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 10000.0 },
    { tax: 0.0 },
  ];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 3", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 3000 },
  ];

  const answer = [{ tax: 0.0 }, { tax: 0.0 }, { tax: 1000.0 }];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 4", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
  ];

  const answer = [{ tax: 0 }, { tax: 0 }, { tax: 0 }];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 5", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 25.0, quantity: 5000 },
  ];

  const answer = [{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }, { tax: 10000.0 }];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 6", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
  ];

  const answer = [
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 3000.0 },
  ];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 7", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
    { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
    { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 15.0, quantity: 5000 },
    { operation: "sell", "unit-cost": 30.0, quantity: 4350 },
    { operation: "sell", "unit-cost": 30.0, quantity: 650 },
  ];
  const answer = [
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 3000.0 },
    { tax: 0.0 },
    { tax: 0.0 },
    { tax: 3700.0 },
    { tax: 0.0 },
  ];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});

test("Integration test case 8", () => {
  const operation = [
    { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
    { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
    { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
  ];

  const answer = [
    { tax: 0.0 },
    { tax: 80000.0 },
    { tax: 0.0 },
    { tax: 60000.0 },
  ];

  const operationStore = new OperationStore();

  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);

  const result = operation.map(({ operation, ...rest }) => {
    if (operation === "buy") return buyController.execute(rest);

    return sellController.execute(rest);
  });

  assert.equal(JSON.stringify(answer), JSON.stringify(result));
});
