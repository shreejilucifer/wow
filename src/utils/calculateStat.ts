import { PreviousValue } from '../generated/graphql';

export const calculateStat = (previousValues: PreviousValue[]): string => {
  let len = previousValues.length;
  let stat: string;
  if (len === 1) stat = 'up';
  else
    stat =
      previousValues[len].shareValue > previousValues[len - 1].shareValue
        ? 'up'
        : 'down';

  return stat;
};
