import { OperationsModules, ProcessOperation } from "./operations-process";

const createSellProcess =
  (modules: OperationsModules) => (data: ProcessOperation) => {
    if (data.operation.operation === "sell") {
      let result = data;
      modules.forEach((callbackFunction) => {
        data = callbackFunction(data);
        if (data.success) result = data;
      });
      return result;
    }
    return data;
  };

export default createSellProcess;
