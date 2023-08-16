import {
  profitRepository,
  sharesRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";

import ProfitUseCase from "../profit";

const makeProfitUseCase = () => {
  const useCase = new ProfitUseCase(
    sharesRepository,
    weightedAveragePriceRepository,
    profitRepository,
  );
  return useCase;
};

export default makeProfitUseCase;
