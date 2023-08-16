import { createInterface } from "readline";

import { BuyController, SellController } from "./controllers";
import { IOperation } from "./shared/interfaces";
import { Cli } from "./stdio";
import {
  LossStore,
  ProfitStore,
  SharesStore,
  WeightedAveragePriceStore,
} from "./store";

class Main {
  init() {
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
    const cli = new Cli(
      createInterface({ input: process.stdin, output: process.stdout }),
    );

    cli.waitLine((line) => {
      const operation = JSON.parse(line) as IOperation[];
      const tax = operation.map(({ operation, ...rest }) => {
        if (operation === "buy") return buyController.execute(rest);
        return sellController.execute(rest);
      });

      lossStore.clearStore();
      profitStore.clearStore();
      sharesStore.clearStore();
      weightedAveragePriceStore.clearStore();
      return tax;
    });
  }
}

const main = new Main();

main.init();
