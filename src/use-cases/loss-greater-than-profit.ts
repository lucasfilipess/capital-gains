import {
  LossRepository,
  ProfitRepository,
  SharesRepository,
  WeightedAveragePriceRepository,
} from "@/repositories";
import { ITax } from "@/types";

interface LossGreaterThanProfitUseCaseParams {
  "unit-cost": number;
  quantity: number;
}

export default class LossGreaterThanProfitUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private weightedAveragePriceRepository: WeightedAveragePriceRepository,
    private profitRepository: ProfitRepository,
    private lossRepository: LossRepository,
  ) {}

  /**
   * Profit less than losses to be discounted
   * @param {LossGreaterThanProfitUseCaseParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: LossGreaterThanProfitUseCaseParams): ITax {
    this.sharesRepository.removeShares(params.quantity);
    const weightedAveragePrice =
      this.weightedAveragePriceRepository.getWeightedAveragePrice();
    const profit = this.profitRepository.calculateProfit({
      ...params,
      weightedAveragePrice,
    });
    this.lossRepository.discountLoss(profit);

    return { tax: 0 };
  }
}
