import { BlockParty } from '../models/BlockParty';
import { Coordinates } from '../models/Coordinates';

export function parseBlockParty(data: any): BlockParty {
  return {
    id: Number(data.id),
    place: data.ort,
    description: data.bezeichnung,
    street: data.strasse,
    postcode: Number(data.plz),
    from: data.von,
    to: data.bis,
    time: data.zeit,
    organizer: data.veranstalter,
    mail: data.mail,
    www: data.www,
    remarks: data.bemerkungen,
    coordinates: {
      latitude: Number(data._wgs84_lat),
      longitude: Number(data._wgs84_lon),
    } as Coordinates,
  } as BlockParty;
}
