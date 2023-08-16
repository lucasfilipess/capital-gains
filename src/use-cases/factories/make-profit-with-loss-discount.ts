import {
  lossRepository,
  profitRepository,
  sharesRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";

import ProfitWithLossDiscountUseCase from "../profit-with-loss-discount";

const makeProfitWithLossDiscountUseCase = () => {
  const useCase = new ProfitWithLossDiscountUseCase(
    sharesRepository,
    weightedAveragePriceRepository,
    profitRepository,
    lossRepository,
  );
  return useCase;
};

export default makeProfitWithLossDiscountUseCase;
