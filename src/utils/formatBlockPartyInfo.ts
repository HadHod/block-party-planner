import { BlockParty } from '../models';

const getTimeOrEmpty = (time: string) => time === '' ? '' : ` at ${time}`;

const getRemarksOrEmpty = (remarks: string) => remarks === '' ? '' : ` also remember about ${remarks}!`;

export function formatBlockPartyInfo({ place, street, from, to, time, remarks }: BlockParty): string {
  let result: string = `${place} on ${street} street (between ${from} and ${to}${getTimeOrEmpty(time)})`;
  if (from === to) {
    result = `${place} on ${street} street (${from}${getTimeOrEmpty(time)})`;
  }
  return result + getRemarksOrEmpty(remarks);
}
