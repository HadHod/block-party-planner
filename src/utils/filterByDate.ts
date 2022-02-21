import { splitAndParseNumber } from '.';
import { BlockParty } from '../models';

function compareDates(a: number[], b: number[]): number {
  const d1: Date = new Date(a[0], a[1] - 1, a[2]);
  const d2: Date = new Date(b[0], b[1] - 1, b[2]);

  if (d1 === d2) {
    return 0;
  }

  if (d1 > d2) {
    return 1;
  }

  return 0;
}

export function filterByDate({ from, to }: BlockParty, start: number[], end: number[]): boolean {
  const fromSplitted: number[] = splitAndParseNumber(from);
  const toSplitted: number[] = splitAndParseNumber(to);

  // Starts too late
  if (compareDates(fromSplitted, end) === 1) {
    return false;
  }

  // Ends too fast
  if (compareDates(start, toSplitted) === 1) {
    return false;
  }

  return true;
}
