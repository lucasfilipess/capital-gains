import {
  lossRepository,
  profitRepository,
  sharesRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";

import TotalAmountTaxFreeUseCase from "../total-amount-tax-free";

const makeTotalAmountTaxFreeUseCase = () => {
  const useCase = new TotalAmountTaxFreeUseCase(
    sharesRepository,
    weightedAveragePriceRepository,
    profitRepository,
    lossRepository,
  );
  return useCase;
};

export default makeTotalAmountTaxFreeUseCase;
