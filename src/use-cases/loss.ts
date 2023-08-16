import {
  LossRepository,
  SharesRepository,
  WeightedAveragePriceRepository,
} from "@/repositories";
import { ITax } from "@/types";

interface LossUseCaseParams {
  "unit-cost": number;
  quantity: number;
}

export default class LossUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private weightedAveragePriceRepository: WeightedAveragePriceRepository,
    private lossRepository: LossRepository,
  ) {}

  /**
   * Loss
   * @param {LossUseCaseParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: LossUseCaseParams): ITax {
    this.sharesRepository.removeShares(params.quantity);
    const weightedAveragePrice =
      this.weightedAveragePriceRepository.getWeightedAveragePrice();
    this.lossRepository.calculateLoss({ ...params, weightedAveragePrice });

    return { tax: 0 };
  }
}
