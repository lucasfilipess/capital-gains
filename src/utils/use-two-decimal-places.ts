/**
 * Formats the number with two decimal places
 * @param {number} value Object containing the number of shares sold and the unit cost
 * @returns {number}
 */
const useTwoDecimalPlaces = (value: number): number => Number(value.toFixed(2));

export default useTwoDecimalPlaces;
