export function splitAndParseNumber(input: string, separator: string = '-'): number[] {
  return input.split(separator).map((i: string) => Number(i));
}
