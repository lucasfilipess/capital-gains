export interface ISharesStore {
  shares: number;
  addShares(increase: number): number;
  removeShares(decrease: number): number;
  clearStore(): void;
}

export default class SharesStore implements ISharesStore {
  private _shares = 0;

  /**
   * Total quantity of shares obtained in operations
   * @returns {number}
   */
  get shares(): number {
    return this._shares;
  }

  /**
   * Increase the total quantity of shares according to the value passed in the param
   * @param {number} quantity Number of shares to be increased
   * @returns {number} Total quantity of shares obtained in operations
   */
  addShares(quantity: number): number {
    this._shares += quantity;
    return this._shares;
  }

  /**
   * Decrease the total of shares according to the value passed in the param
   * @param {number} quantity Number of shares to be decreased
   * @returns {number} Total quantity of shares obtained in operations
   */
  removeShares(quantity: number): number {
    this._shares -= quantity;
    return this._shares;
  }
  /**
   * Reset the store values
   * @returns {void}
   */

  clearStore(): void {
    this._shares = 0;
  }
}
