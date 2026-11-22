import { DAYS, type OpeningHours } from '../lib/hours.ts';

export const business = {
  name: 'Mirror Finish Detailing',
  email: 'hello@mirrorfinishdetailing.example',
  phone: '(480) 555-0147',
  phoneHref: 'tel:+14805550147',
  base: 'Tempe Town Lake',
  city: 'Tempe, AZ',
} as const;

export const crewHours: readonly OpeningHours[] = DAYS.map(day =>
  day === 'Sunday' ? { day } : { day, opens: '07:00', closes: '17:00' });
export const crewDays = crewHours.filter(entry => entry.opens).map(entry => entry.day);
export const crewHoursSummary = 'Mon–Sat, 7 am–5 pm (Arizona time)';
