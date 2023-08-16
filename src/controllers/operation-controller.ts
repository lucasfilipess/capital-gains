import { TOTAL_TAX_FREE_TRANSACTION_AMOUNT } from "@/config";
import {
  lossRepository,
  profitRepository,
  weightedAveragePriceRepository,
} from "@/shared/instances";
import { ITax } from "@/types";
import {
  makeBuyUseCase,
  makeLossGreaterThanProfitUseCase,
  makeLossUseCase,
  makeProfitUseCase,
  makeProfitWithLossDiscountUseCase,
  makeTotalAmountTaxFreeUseCase,
  makeUnitCostEqualToWeightedAveragePriceUseCase,
} from "@/use-cases/factories";

interface OperationControllerParams {
  operation: "sell" | "buy";
  "unit-cost": number;
  quantity: number;
}

export default class OperationController {
  execute(params: OperationControllerParams): ITax {
    const { operation, "unit-cost": unitCost, quantity } = params;

    const buyUseCase = makeBuyUseCase();
    const lossGreaterThanProfitUseCase = makeLossGreaterThanProfitUseCase();
    const lossUseCase = makeLossUseCase();
    const profitWithLossDiscountUseCase = makeProfitWithLossDiscountUseCase();
    const profitUseCase = makeProfitUseCase();
    const totalAmountTaxFreeUseCase = makeTotalAmountTaxFreeUseCase();
    const unitCostEqualToWeightedAveragePriceUseCase =
      makeUnitCostEqualToWeightedAveragePriceUseCase();

    if (operation === "buy") {
      return buyUseCase.execute({ "unit-cost": unitCost, quantity });
    }

    if (unitCost === weightedAveragePriceRepository.getWeightedAveragePrice()) {
      return unitCostEqualToWeightedAveragePriceUseCase.execute(quantity);
    }

    if (unitCost * quantity <= TOTAL_TAX_FREE_TRANSACTION_AMOUNT) {
      return totalAmountTaxFreeUseCase.execute({
        "unit-cost": unitCost,
        quantity,
      });
    }

    if (lossRepository.getLoss() > profitRepository.getProfit()) {
      return lossGreaterThanProfitUseCase.execute({
        "unit-cost": unitCost,
        quantity,
      });
    }

    if (unitCost < weightedAveragePriceRepository.getWeightedAveragePrice()) {
      return lossUseCase.execute({ "unit-cost": unitCost, quantity });
    }

    if (lossRepository.getLoss() > 0) {
      return profitWithLossDiscountUseCase.execute({
        "unit-cost": unitCost,
        quantity,
      });
    }

    return profitUseCase.execute({ "unit-cost": unitCost, quantity });
  }
}
