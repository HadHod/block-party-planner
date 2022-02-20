import request from 'request';
import prompt from 'prompt-sync';
import { BlockParty } from './models/BlockParty';
import { parseBlockParty } from './utils';

const promptBox = prompt({ sigint: true });
const BLOCK_PARTIES_URL = 'https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/brandenburg/index.php/index/all.gjson?q=';

const name: string = promptBox('What is your name?');
console.log(`Hey there ${name}`);

const numberOfBlockParties: number = Number(promptBox('How many (maximum) block parties do you want to visit?'));
console.log(`Hey there oldi ${numberOfBlockParties}`);

const start: number[] = promptBox('Start date (YYYY-MM-DD)').split('-').map(n => Number(n));
console.log(start);

const end: number[] = promptBox('End date (YYYY-MM-DD)').split('-').map(n => Number(n));
console.log(end);

const point: number[] = promptBox('Where are you?').split('-').map(n => Number(n));
console.log(point);

request(BLOCK_PARTIES_URL, { json: true }, (err: any, _res: any, body: any) => {
  if (err) {
    return console.log(err);
  }

  const parties: BlockParty[] = body.features.map(({ properties: { data } }: any) => parseBlockParty(data));

  console.log(parties);

  // const filteredByDate: BlockParty[] =
});
