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
import { formatBlockPartyInfo, filterByDate, parseBlockParty, sortByDistance } from './utils';

const promptBox: Prompt = prompt({ sigint: true });
const BLOCK_PARTIES_URL: string = 'https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/brandenburg/index.php/index/all.gjson?q=';

const name: string = promptBox('What is your name? ');
const numberOfBlockParties: number = Number(promptBox('How many (maximum) block parties do you want to visit? '));
const start: number[] = promptBox('Start date (YYYY-MM-DD) of your holidays ').split('-').map(n => Number(n));
const end: number[] = promptBox('End date (YYYY-MM-DD) ').split('-').map(n => Number(n));
const point: number[] = promptBox('Where are you? (latitude-longitude) ').split('-').map(n => Number(n));

request(BLOCK_PARTIES_URL, { json: true }, (err: any, _res: any, body: any) => {
  if (err) {
    return console.log(err);
  }

  const parties: BlockParty[] = body.features.map(({ properties: { data } }: any) => parseBlockParty(data));

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
