import {
  LossRepository,
  ProfitRepository,
  SharesRepository,
  WeightedAveragePriceRepository,
} from "@/repositories";

export const lossRepository = new LossRepository();
export const profitRepository = new ProfitRepository();
export const sharesRepository = new SharesRepository();
export const weightedAveragePriceRepository =
  new WeightedAveragePriceRepository();
