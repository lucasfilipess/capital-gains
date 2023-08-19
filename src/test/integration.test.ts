import assert from "node:assert";
import { test } from "node:test";

import { buyModule } from "@/modules/buy";
import {
  lossModule,
  taxedProfitModule,
  taxFreeProfitModule,
  zeroBalanceModule,
} from "@/modules/sell";
import {
  createBuyProcess,
  createOperationsProcess,
  createSellProcess,
} from "@/processes";
import { Operation } from "@/types";

test("Integration test", async (t) => {
  const buyProcess = createBuyProcess([buyModule]);
  const sellProcess = createSellProcess([
    lossModule,
    taxFreeProfitModule,
    taxedProfitModule,
    zeroBalanceModule,
  ]);

  const operationsProcess = createOperationsProcess([buyProcess, sellProcess]);

  await t.test("Case 1", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 100 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    ];
    const expectedOutput = [{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 2", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    ];

    const expectedOutput = [{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 1 + 2", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 100 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    ];

    const expectedOutput = [
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 10000.0 },
      { tax: 0.0 },
    ];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 3", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 3000 },
    ];

    const expectedOutput = [{ tax: 0.0 }, { tax: 0.0 }, { tax: 1000.0 }];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 4", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    ];

    const expectedOutput = [{ tax: 0 }, { tax: 0 }, { tax: 0 }];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 5", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 5000 },
    ];

    const expectedOutput = [
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 10000.0 },
    ];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 6", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
    ];

    const expectedOutput = [
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3000.0 },
    ];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 7", () => {
    const inputLine: Operation[] = [
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

    const expectedOutput = [
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

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });

  await t.test("Case 8", () => {
    const inputLine: Operation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
    ];

    const expectedOutput = [
      { tax: 0.0 },
      { tax: 80000.0 },
      { tax: 0.0 },
      { tax: 60000.0 },
    ];

    const result = operationsProcess(inputLine);

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  });
});
