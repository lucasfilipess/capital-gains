import {
  SharesRepository,
  WeightedAveragePriceRepository,
} from "@/repositories";
import { ITax } from "@/types";

interface BuyUseCaseParams {
  "unit-cost": number;
  quantity: number;
}

export default class BuyUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private weightedAveragePriceRepository: WeightedAveragePriceRepository,
  ) {}

  /**
   * Buy operation
   * @param {BuyUseCaseParams} params Object containing the number of shares and the unit cost
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(params: BuyUseCaseParams): ITax {
    const shares = this.sharesRepository.getShares();

    this.weightedAveragePriceRepository.calculateWeightedAveragePrice({
      ...params,
      shares,
    });

    this.sharesRepository.addNewShares(params.quantity);

    return { tax: 0 };
  }
}
