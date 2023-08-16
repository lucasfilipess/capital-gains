import { TAX_PERCENTAGE } from "@/config";
import {
  ProfitRepository,
  SharesRepository,
  WeightedAveragePriceRepository,
} from "@/repositories";
import { ITax } from "@/types";
import { useDecimals } from "@/utils";

interface ProfitUseCaseParams {
  "unit-cost": number;
  quantity: number;
}

export default class ProfitUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private weightedAveragePriceRepository: WeightedAveragePriceRepository,
    private profitRepository: ProfitRepository,
  ) {}

  /**
   * Profit
   * @param {ProfitUseCaseParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: ProfitUseCaseParams): ITax {
    this.sharesRepository.removeShares(params.quantity);
    const weightedAveragePrice =
      this.weightedAveragePriceRepository.getWeightedAveragePrice();
    const profit = this.profitRepository.calculateProfit({
      ...params,
      weightedAveragePrice,
    });
    const tax = useDecimals(profit * TAX_PERCENTAGE);

    return { tax };
  }
}
