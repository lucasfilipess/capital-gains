import {
  lossRepository,
  sharesRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";

import LossUseCase from "../loss";

const makeLossUseCase = () => {
  const useCase = new LossUseCase(
    sharesRepository,
    weightedAveragePriceRepository,
    lossRepository,
  );
  return useCase;
};

export default makeLossUseCase;
