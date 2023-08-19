import { createInterface } from "readline";

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
} from "./processes";
import { createCli } from "./stdio";

const main = () => {
  const { waitLine } = createCli(
    createInterface({ input: process.stdin, output: process.stdout }),
  );
  const buyProcess = createBuyProcess([buyModule]);
  const sellProcess = createSellProcess([
    lossModule,
    taxFreeProfitModule,
    taxedProfitModule,
    zeroBalanceModule,
  ]);
  const operationsProcess = createOperationsProcess([buyProcess, sellProcess]);

  waitLine(operationsProcess);
};

main();
