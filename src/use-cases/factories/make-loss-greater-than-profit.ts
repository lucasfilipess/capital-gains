import {
  lossRepository,
  profitRepository,
  sharesRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";

import LossGreaterThanProfitUseCase from "../loss-greater-than-profit";

const makeLossGreaterThanProfitUseCase = () => {
  const useCase = new LossGreaterThanProfitUseCase(
    sharesRepository,
    weightedAveragePriceRepository,
    profitRepository,
    lossRepository,
  );
  return useCase;
};

export default makeLossGreaterThanProfitUseCase;
