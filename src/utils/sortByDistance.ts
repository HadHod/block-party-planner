import { BlockParty } from '../models';

function getDistance(
  { coordinates: { latitude: x1, longitude: y1 } }: BlockParty,
  { x2, y2 }: { x2: number, y2: number }
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function sortByDistance(bp1: BlockParty, bp2: BlockParty, point: number[]): number {
  const [x2, y2] = point;
  return getDistance(bp1, { x2, y2 }) - getDistance(bp2, { x2, y2 });
}