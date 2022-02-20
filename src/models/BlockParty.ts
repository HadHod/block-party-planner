import { Coordinates } from './Coordinates';

export interface BlockParty {
  id: number;
  place: string;        // ort
  description: string;  // bezeichnung
  street: string;
  postcode: number;     // plz
  from: string;
  to: string;
  time: string;
  organizer: string;    // veranstalter
  mail: string;
  www: string;
  remarks: string;      // bemerkungen
  coordinates: Coordinates;
}
