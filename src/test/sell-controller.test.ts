import assert from "node:assert";
import { test } from "node:test";

import { ITax } from "@/shared/interfaces";
import {
  LossStore,
  ProfitStore,
  SharesStore,
  WeightedAveragePriceStore,
} from "@/store";

import BuyController from "../controllers/buy-controller";
import SellController from "../controllers/sell-controller";

test("Sell operation", () => {
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
  const inputLines = [
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

  const operationResult: ITax[] = [];

  inputLines.forEach(({ operation, ...rest }) => {
    if (operation === "buy") {
      const result = buyController.execute(rest);
      operationResult.push(result);
      assert.equal(JSON.stringify(result), JSON.stringify({ tax: 0 }));
    } else {
      operationResult.push(sellController.execute(rest));
    }
  });

  assert.equal(JSON.stringify(expectedOutput), JSON.stringify(operationResult));
});
