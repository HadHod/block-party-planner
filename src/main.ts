/**
 * TODO
 * - input validation
 * - handle errors
 * - unit tests
 * - calculate distance between parties
 */

import request from 'request';
import prompt, { Prompt } from 'prompt-sync';

import { BlockParty } from './models';
import { formatBlockPartyInfo, filterByDate, parseBlockParty, sortByDistance, splitAndParseNumber } from './utils';

const promptBox: Prompt = prompt({ sigint: true });
const BLOCK_PARTIES_URL: string = 'https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/brandenburg/index.php/index/all.gjson?q=';

let name: string = process.argv[2];
let numberOfBlockParties: number = process.argv[3] ? Number(process.argv[3]) : undefined;
let start: number[] = process.argv[4] ? splitAndParseNumber(process.argv[4]) : undefined;
let end: number[] = process.argv[5] ? splitAndParseNumber(process.argv[5]) : undefined;
let point: number[] = process.argv[6] ? splitAndParseNumber(process.argv[6]) : undefined;

if (!name) {
  name = promptBox('What is your name? ');
}
if (!numberOfBlockParties) {
  numberOfBlockParties = Number(promptBox('How many (maximum) block parties do you want to visit? '));
}
if (!start) {
  start = splitAndParseNumber(promptBox('Start date (YYYY-MM-DD) of your holidays '));
}
if (!end) {
  end = splitAndParseNumber(promptBox('End date (YYYY-MM-DD) '));
}
if (!point) {
  point = splitAndParseNumber(promptBox('Where are you? (latitude-longitude) '));
}

request(BLOCK_PARTIES_URL, { json: true }, (err: any, _res: any, body: any) => {
  if (err) {
    return console.log(err);
  }

  const parties: BlockParty[] = body.features.map(({ properties: { data } }: any) => parseBlockParty(data));

  console.log('All block parties:', parties.length);

  // This one is checking if start and end time overlapping block party time. It should also remember and sort by time
  // At this point we might be late to the party
  const filteredByDate: BlockParty[] = parties.filter((party: BlockParty) => filterByDate(party, start, end));

  const sortedParties: BlockParty[] = filteredByDate.sort((a: BlockParty, b: BlockParty) => sortByDistance(a, b, point));

  const resultBlockParties: BlockParty[] = sortedParties.slice(0, numberOfBlockParties);

  console.log('\n');

  if (resultBlockParties.length === 0) {
    console.log(`Oh no, there are no parties for you ${name}! :(`);
  } else if (resultBlockParties.length === 1) {
    console.log(`Ok, listen to me ${name}, I have only one party for. Here the details`, formatBlockPartyInfo(resultBlockParties[0]));
  } else {
    console.log(`I have a big plans for you ${name}! ${resultBlockParties.length} parties are waiting for you. First you go to the ${formatBlockPartyInfo(resultBlockParties[0])}`);
    if (resultBlockParties.length > 2) {
      for (let i = 1; i < resultBlockParties.length - 1; i++) {
        console.log(`and then go to ${formatBlockPartyInfo(resultBlockParties[i])}`);
      }
    }
    console.log(`At the end you can go to ${formatBlockPartyInfo(resultBlockParties[resultBlockParties.length - 1])}!`);
  }
});
