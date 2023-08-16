import { sharesRepository } from "@/shared/instances";

import UnitCostEqualToWeightedAveragePriceUseCase from "../unit-cost-equal-to-weighted-average-price";

const makeUnitCostEqualToWeightedAveragePriceUseCase = () => {
  const useCase = new UnitCostEqualToWeightedAveragePriceUseCase(
    sharesRepository,
  );
  return useCase;
};

export default makeUnitCostEqualToWeightedAveragePriceUseCase;
