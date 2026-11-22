import { addons, type AddOn } from './addons.ts';
import { business, crewDays, crewHours } from './business.ts';
import { packages, pads, vehicleSizes, type DetailPackage, type VehicleSize } from './packages.ts';
import { results, type Result } from './results.ts';
import { serviceAreas, type ServiceArea } from './service-areas.ts';
import { validateHours } from '../lib/hours.ts';

type Collections = { packages: DetailPackage[]; addons: AddOn[]; serviceAreas: ServiceArea[]; results: Result[] };

function requireField(condition: unknown, id: string, field: string, message: string): asserts condition {
  if (!condition) throw new Error(`${id}.${field}: ${message}`);
}
const filled = (value: unknown) => typeof value === 'string' && value.trim().length > 0;
const between = (value: number, min: number, max: number) => Number.isFinite(value) && value >= min && value <= max;
const whole = (value: number, min: number, max: number) => Number.isInteger(value) && between(value, min, max);
const nonemptyList = (value: unknown) => Array.isArray(value) && value.length > 0 && value.every(filled);

function exactlyOneFeatured(items: (DetailPackage | Result)[], collection: string) {
  const featured = items.filter(item => item.featured).map(item => item.id);
  requireField(featured.length === 1, featured.join(', ') || items.map(item => item.id).join(', ') || collection,
    'featured', `${collection} needs exactly one featured item`);
}

export function validateContent(data: Collections = { packages, addons, serviceAreas, results }) {
  validateHours(crewHours);
  for (const key of ['name', 'email', 'phone', 'phoneHref', 'base', 'city'] as const) {
    requireField(filled(business[key]), 'business', key, 'required');
  }
  requireField(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email), 'business', 'email', 'expected a public email address');
  requireField(business.phoneHref === `tel:+1${business.phone.replace(/\D/g, '')}`, 'business', 'phoneHref', 'must match phone');

  const seen = new Set<string>();
  for (const [collection, items] of Object.entries(data)) {
    for (const item of items) {
      const id = item.id || collection;
      requireField(filled(item.id) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id), id, 'id', 'expected a lowercase URL-safe identifier');
      requireField(!seen.has(item.id), id, 'id', 'duplicate identifier');
      seen.add(item.id);
    }
  }

  const byPackage = new Map(data.packages.map(detail => [detail.id, detail]));
  const byArea = new Set(data.serviceAreas.map(area => area.id));

  for (const detail of data.packages) {
    const { id, prices } = detail;
    requireField(filled(detail.name), id, 'name', 'required');
    requireField(filled(detail.summary), id, 'summary', 'required');
    requireField(pads.includes(detail.pad), id, 'pad', 'unknown pad colour');
    for (const size of Object.keys(vehicleSizes) as VehicleSize[]) {
      requireField(whole(prices?.[size], 50, 5000), id, `prices.${size}`, 'expected whole USD from 50 to 5000');
    }
    requireField(prices.sedan <= prices.suv && prices.suv <= prices.truck, id, 'prices', 'must ascend from sedan to SUV to truck');
    requireField(whole(detail.hours, 1, 20), id, 'hours', 'expected a whole number from 1 to 20');
    requireField(nonemptyList(detail.includes), id, 'includes', 'list at least one inclusion');
    requireField(typeof detail.available === 'boolean', id, 'available', 'expected true or false');
    requireField(typeof detail.featured === 'boolean', id, 'featured', 'expected true or false');
    requireField(typeof detail.exterior === 'boolean', id, 'exterior', 'expected true or false');

    const visited = new Set([id]);
    let requires = detail.requires;
    while (requires !== undefined) {
      const prerequisite = byPackage.get(requires);
      requireField(prerequisite, id, 'requires', `unknown package "${requires}"`);
      requireField(!visited.has(requires), id, 'requires', `circular prerequisite "${requires}"`);
      visited.add(requires);
      requires = prerequisite.requires;
    }
  }
  exactlyOneFeatured(data.packages, 'packages');

  for (const addon of data.addons) {
    const { id } = addon;
    requireField(filled(addon.name), id, 'name', 'required');
    requireField(whole(addon.price, 10, 1000), id, 'price', 'expected whole USD from 10 to 1000');
    requireField(typeof addon.available === 'boolean', id, 'available', 'expected true or false');
    requireField(nonemptyList(addon.appliesTo), id, 'appliesTo', 'list at least one package ID');
    for (const ref of addon.appliesTo) requireField(byPackage.has(ref), id, 'appliesTo', `unknown package "${ref}"`);
    requireField(new Set(addon.appliesTo).size === addon.appliesTo.length, id, 'appliesTo', 'package IDs must be unique');
  }

  for (const area of data.serviceAreas) {
    const { id } = area;
    requireField(filled(area.name), id, 'name', 'required');
    requireField(nonemptyList(area.serviceDays) && area.serviceDays.every(day => crewDays.includes(day)), id, 'serviceDays', 'use the crew’s open weekdays');
    requireField(new Set(area.serviceDays).size === area.serviceDays.length, id, 'serviceDays', 'weekdays must be unique');
    requireField(whole(area.travelFee, 0, 100), id, 'travelFee', 'expected whole USD from 0 to 100');
    for (const axis of ['x', 'y'] as const) {
      requireField(between(area.mapPosition?.[axis], 0, 100), id, `mapPosition.${axis}`, 'expected a percentage from 0 to 100');
    }
    requireField(area.note === undefined || filled(area.note), id, 'note', 'expected nonempty text');
  }

  for (const shot of data.results) {
    const { id, gloss, paintDepth } = shot;
    for (const field of ['title', 'vehicle', 'panel'] as const) requireField(filled(shot[field]), id, field, 'required');
    const detail = byPackage.get(shot.packageId);
    requireField(detail, id, 'packageId', `unknown package "${shot.packageId}"`);
    requireField(byArea.has(shot.areaId), id, 'areaId', `unknown service area "${shot.areaId}"`);
    requireField(nonemptyList(shot.defects), id, 'defects', 'list at least one defect');
    requireField(/^#[a-f0-9]{6}$/i.test(shot.paint), id, 'paint', 'expected a six-digit hex colour');
    requireField(typeof shot.featured === 'boolean', id, 'featured', 'expected true or false');
    requireField((gloss === undefined) === (paintDepth === undefined), id, 'gloss / paintDepth', 'provide both reading pairs or omit both');
    if (gloss !== undefined && paintDepth !== undefined) {
      requireField(detail.exterior, id, 'gloss / paintDepth', 'readings apply only to exterior packages');
      for (const side of ['before', 'after'] as const) {
        requireField(between(gloss?.[side], 0, 100), id, `gloss.${side}`, 'expected 0 to 100 GU');
        requireField(between(paintDepth?.[side], 60, 250), id, `paintDepth.${side}`, 'expected 60 to 250 µm');
      }
      requireField(gloss.after > gloss.before, id, 'gloss.after', 'must improve on the before reading');
      requireField(paintDepth.after <= paintDepth.before && paintDepth.before - paintDepth.after <= 10,
        id, 'paintDepth.after', 'must be at or below before, with at most 10 µm removed');
    }
  }
  exactlyOneFeatured(data.results, 'results');
}
