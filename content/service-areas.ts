import type { Day } from '../lib/hours.ts';
import { crewDays } from './business.ts';

export interface ServiceArea {
  id: string;
  name: string;
  /** Full weekday names, drawn from the crew's open days. */
  serviceDays: Day[];
  /** Whole USD; zero means included. */
  travelFee: number;
  /** Decal coordinates in percentages of the route map. */
  mapPosition: { x: number; y: number };
  note?: string;
}

export const serviceAreas: ServiceArea[] = [
  { id: 'tempe', name: 'Tempe', serviceDays: crewDays, travelFee: 0, mapPosition: { x: 47, y: 50 }, note: 'Home base by Tempe Town Lake' },
  { id: 'scottsdale', name: 'Scottsdale', serviceDays: ['Tuesday', 'Thursday', 'Saturday'], travelFee: 0, mapPosition: { x: 61, y: 19 } },
  { id: 'paradise-valley', name: 'Paradise Valley', serviceDays: ['Tuesday', 'Thursday'], travelFee: 25, mapPosition: { x: 33, y: 27 } },
  { id: 'mesa', name: 'Mesa', serviceDays: ['Monday', 'Wednesday', 'Friday'], travelFee: 0, mapPosition: { x: 74, y: 47 } },
  { id: 'chandler', name: 'Chandler', serviceDays: ['Monday', 'Wednesday', 'Friday'], travelFee: 0, mapPosition: { x: 53, y: 80 } },
  { id: 'gilbert', name: 'Gilbert', serviceDays: ['Wednesday', 'Saturday'], travelFee: 15, mapPosition: { x: 77, y: 68 } },
  { id: 'ahwatukee', name: 'Ahwatukee', serviceDays: ['Tuesday', 'Friday'], travelFee: 15, mapPosition: { x: 23, y: 71 } },
  { id: 'central-phoenix', name: 'Central Phoenix', serviceDays: ['Thursday'], travelFee: 35, mapPosition: { x: 18, y: 43 }, note: 'Garage or covered parking required June–September' },
];
