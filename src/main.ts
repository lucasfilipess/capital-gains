import { createInterface } from "readline";

import { BuyController, SellController } from "./controllers";
import { Cli } from "./stdio";
import { OperationStore } from "./store";
import { IOperation } from "./types";

const main = () => {
  const operationStore = new OperationStore();
  const buyController = new BuyController(operationStore);
  const sellController = new SellController(operationStore);
  const cli = new Cli(
    createInterface({ input: process.stdin, output: process.stdout }),
  );

  cli.waitLine((line) => {
    const operation = JSON.parse(line) as IOperation[];
    const tax = operation.map(({ operation, ...rest }) => {
      if (operation === "buy") return buyController.execute(rest);
      return sellController.execute(rest);
    });
    return JSON.stringify(tax);
  });
};

main();
