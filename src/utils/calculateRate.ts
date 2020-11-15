import { PreviousValue } from '../generated/graphql';

export const calculateRate = (
  previousValues: PreviousValue[],
  currentValue: number
): number => {
  let len = previousValues.length;

  let previousValue =
    len === 1
      ? previousValues[0].shareValue
      : previousValues[len - 1].shareValue;
  let numerator = previousValue - currentValue;
  let rate = (numerator / previousValue) * 100;
  return parseInt(rate.toFixed(2));
};
