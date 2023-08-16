import {
  LossRepository,
  ProfitRepository,
  SharesRepository,
  WeightedAveragePriceRepository,
} from "@/repositories";
import { ITax } from "@/types";
import { useDecimals } from "@/utils";

interface ProfitWithLossDiscountUseCaseParams {
  "unit-cost": number;
  quantity: number;
}

export default class ProfitWithLossDiscountUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private weightedAveragePriceRepository: WeightedAveragePriceRepository,
    private profitRepository: ProfitRepository,
    private lossRepository: LossRepository,
  ) {}

  /**
   * Profit with loss to be discounted
   * @param {ProfitWithLossDiscountUseCaseParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: ProfitWithLossDiscountUseCaseParams): ITax {
    this.sharesRepository.removeShares(params.quantity);
    const weightedAveragePrice =
      this.weightedAveragePriceRepository.getWeightedAveragePrice();
    const profit = this.profitRepository.calculateProfit({
      ...params,
      weightedAveragePrice,
    });
    const loss = this.lossRepository.getLoss();
    const tax = useDecimals((profit - loss) * 0.2);
    this.lossRepository.discountLoss(profit);

    return { tax };
  }
}
