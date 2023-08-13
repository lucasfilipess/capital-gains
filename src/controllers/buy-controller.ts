import { IOperationStore } from "@/store";
import { IOperationParams, ITax } from "@/types";

export default class BuyController {
  constructor(private operationStore: IOperationStore) {}

  execute(params: IOperationParams): ITax {
    this.operationStore.calculateNewWeightedAveragePrice(params);
    this.operationStore.addNewShares(params.quantity);

    return { tax: 0 };
  }
}
