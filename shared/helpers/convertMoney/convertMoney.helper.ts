import { Accuracies, AccuracySlugType } from '../../values/Accuracies';

/**
 * Converts value from
 * model value (as it should be stored in the database and for math calculations, in integer)
 * to
 * view value (as it should be displayed and edited by user, in float)
 * Examples: 53500 => 5.35, 12345 => 1.2345, 120006500 => 12000.65
 * @param {number} modelValue - integer
 * @param {number} roundingType - integer
 * @returns {number} viewValue - float
 */
export function convertModelToView(modelValue: number, roundingType: AccuracySlugType): number {
  return modelValue / Accuracies[roundingType];
}

/**
 * Converts value from
 * view value (as it should be displayed and edited by user, in float)
 * to
 * model value (as it should be stored in the database and for math calculations, in integer)
 * Examples: 5.35 => 53500, 1.2345 => 12345, 12000.65 => 120006500
 * @param {number} viewValue - float
 * @param {number} roundingType - integer
 * @returns {number} modelValue - integer
 */
export function convertViewToModel(viewValue: number, roundingType: AccuracySlugType): number {
  return Math.round(viewValue * Accuracies[roundingType]);
}

/**
 * Round value to specified number of decimal points. Needs when we keep value in model or DB without any multiplier but
 * want to round it.
 * @param viewValue - float
 * @param roundingType - integer
 * @returns {number} modelValue - float
 */
export function roundView(viewValue: number, roundingType: AccuracySlugType): number {
  const accuracy = Accuracies[roundingType];
  return Math.round(viewValue * accuracy) / accuracy;
}
