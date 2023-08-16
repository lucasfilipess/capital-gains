import assert from "node:assert";
import { test } from "node:test";

import { BuyController, SellController } from "@/controllers";
import { IOperation, ITax } from "@/shared/interfaces";
import {
  LossStore,
  ProfitStore,
  SharesStore,
  WeightedAveragePriceStore,
} from "@/store";

interface IProcessOperation {
  inputLine: IOperation[];
  expectedOutput: ITax[];
}

test("Integration test", async (t) => {
  const lossStore = new LossStore();
  const profitStore = new ProfitStore();
  const sharesStore = new SharesStore();
  const weightedAveragePriceStore = new WeightedAveragePriceStore();

  const buyController = new BuyController(
    sharesStore,
    weightedAveragePriceStore,
  );
  const sellController = new SellController(
    sharesStore,
    weightedAveragePriceStore,
    lossStore,
    profitStore,
  );

  const processOperation = ({
    inputLine,
    expectedOutput,
  }: IProcessOperation) => {
    const result = inputLine.map(({ operation, ...rest }) => {
      if (operation === "buy") return buyController.execute(rest);
      return sellController.execute(rest);
    });

    lossStore.clearStore();
    profitStore.clearStore();
    sharesStore.clearStore();
    weightedAveragePriceStore.clearStore();

    assert.equal(JSON.stringify(expectedOutput), JSON.stringify(result));
  };

  await t.test("Case 1", () => {
    const inputLine: IOperation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 100 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    ];
    const expectedOutput = [{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }];

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 2", () => {
    const inputLine: IOperation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    ];

    const expectedOutput = [{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }];

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 1 + 2", () => {
    const inputLine: IOperation[] = [
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

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 3", () => {
    const inputLine: IOperation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 3000 },
    ];

    const expectedOutput = [{ tax: 0.0 }, { tax: 0.0 }, { tax: 1000.0 }];

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 4", () => {
    const inputLine: IOperation[] = [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    ];

    const expectedOutput = [{ tax: 0 }, { tax: 0 }, { tax: 0 }];

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 5", () => {
    const inputLine: IOperation[] = [
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

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 6", () => {
    const inputLine: IOperation[] = [
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

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 7", () => {
    const inputLine: IOperation[] = [
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

    processOperation({ inputLine, expectedOutput });
  });

  await t.test("Case 8", () => {
    const inputLine: IOperation[] = [
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

    processOperation({ inputLine, expectedOutput });
  });
});
