import {
  sharesRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";

import BuyUseCase from "../buy";

const makeBuyUseCase = () => {
  const useCase = new BuyUseCase(
    sharesRepository,
    weightedAveragePriceRepository,
  );
  return useCase;
};

export default makeBuyUseCase;
