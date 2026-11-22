import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('Phoenix crew closes at 5 pm Saturday and stays off the road all Sunday', async () => {
  const { crewHours } = await import('../content/business.ts');
  const { crewOpeningLabels } = await import('../lib/hours.ts');
  const atPhoenix = (instant: string) => openingLabel(crewHours, 'America/Phoenix', new Date(instant), crewOpeningLabels);
  assert.equal(atPhoenix('2026-11-21T23:59:00Z'), 'On the road now · until 5 pm');
  for (const instant of ['2026-11-22T00:00:00Z', '2026-11-22T07:00:00Z', '2026-11-23T06:59:00Z']) {
    assert.equal(atPhoenix(instant), 'Off the road · back Monday 7 am');
  }
  assert.equal(atPhoenix('2026-11-23T14:00:00Z'), 'On the road now · until 5 pm');
});

test('Denver’s March and November DST changes do not move the Phoenix crew schedule', async () => {
  const { crewHours } = await import('../content/business.ts');
  const { crewOpeningLabels } = await import('../lib/hours.ts');
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', timeZoneName: 'shortOffset' });
  const denverOffset = (instant: string) => offset.formatToParts(new Date(instant)).find(part => part.type === 'timeZoneName')?.value;
  for (const [before, after, monday] of [
    ['2026-03-08T08:59:00Z', '2026-03-08T09:00:00Z', '2026-03-09T14:00:00Z'],
    ['2026-11-01T07:59:00Z', '2026-11-01T08:00:00Z', '2026-11-02T14:00:00Z'],
  ]) {
    assert.notEqual(denverOffset(before), denverOffset(after));
    for (const instant of [before, after]) {
      assert.equal(openingLabel(crewHours, 'America/Phoenix', new Date(instant), crewOpeningLabels), 'Off the road · back Monday 7 am');
    }
    assert.equal(openingLabel(crewHours, 'America/Phoenix', new Date(monday), crewOpeningLabels), 'On the road now · until 5 pm');
  }
});
