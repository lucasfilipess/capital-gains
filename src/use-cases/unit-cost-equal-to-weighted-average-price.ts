import { SharesRepository } from "@/repositories";
import { ITax } from "@/types";

export default class UnitCostEqualToWeightedAveragePriceUseCase {
  constructor(private sharesRepository: SharesRepository) {}

  /**
   * Unit cost equal to weighted average price
   * @param {number} quantity  Number of shares to be decreased
   * @returns {ITax} Object containing the amount of tax to be paid
   */
  execute(quantity: number): ITax {
    this.sharesRepository.removeShares(quantity);

    return { tax: 0 };
  }
}
