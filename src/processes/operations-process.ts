import { createOperationStore, OperationStore } from "../store";
import { Operation } from "../types";

export type ProcessOperation = {
  operation: Operation;
  store: OperationStore;
  tax: number;
  success: boolean;
};

export type OperationsModules = Array<
  (input: ProcessOperation) => ProcessOperation
>;

const createProcessOperations =
  (modules: OperationsModules) => (operations: Operation[]) => {
    const operationStore = createOperationStore();

    let result = {
      store: operationStore,
      tax: 0,
      success: false,
    } as ProcessOperation;

    return operations.map((operation) => {
      modules.forEach((callbackFunction) => {
        result = callbackFunction({ ...result, operation }) || result;
      });
      return { tax: result.tax };
    });
  };

export default createProcessOperations;
