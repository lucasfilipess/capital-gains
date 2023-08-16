export interface ISharesRepository {
  getShares(): number;
  addNewShares(increase: number): void;
  removeShares(decrease: number): void;
}

export default class SharesRepository implements ISharesRepository {
  private shares = 0;

  /**
   * Total quantity of shares obtained in operations
   * @returns {number}
   */
  getShares(): number {
    return this.shares;
  }

  /**
   * Increase the total quantity of shares according to the value passed in the param
   * @param {number} quantity Number of shares to be increased
   * @returns {number} Total quantity of shares obtained in operations
   */
  addNewShares(quantity: number): number {
    this.shares += quantity;
    return this.shares;
  }

  /**
   * Decrease the total of shares according to the value passed in the param
   * @param {number} quantity Number of shares to be decreased
   * @returns {number} Total quantity of shares obtained in operations
   */
  removeShares(quantity: number): number {
    this.shares -= quantity;
    return this.shares;
  }
}
