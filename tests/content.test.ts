import assert from 'node:assert/strict';
import { test } from 'node:test';
import { addons } from '../content/addons.ts';
import { packages } from '../content/packages.ts';
import { results } from '../content/results.ts';
import { serviceAreas } from '../content/service-areas.ts';
import { validateContent } from '../content/validate.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const copy = () => structuredClone({ packages, addons, results, serviceAreas });

test('business content, packages, add-ons, areas and results validate', () => {
  assert.doesNotThrow(() => validateContent());
});

test('invalid owner edits identify the item and field', () => {
  const data = copy();
  const detail = data.packages.find(item => item.id === 'mirror-detail')!;
  detail.prices.sedan = 401;
  assert.throws(() => validateContent(data), /mirror-detail\.prices/);
  detail.prices.sedan = 49;
  assert.throws(() => validateContent(data), /mirror-detail\.prices\.sedan/);

  const addon = copy();
  addon.addons[2].appliesTo = ['unknown-package'];
  assert.throws(() => validateContent(addon), /pet-hair\.appliesTo/);

  const shot = copy();
  const featured = shot.results.find(item => item.featured)!;
  delete featured.paintDepth;
  assert.throws(() => validateContent(shot), /mustang-bonnet\.gloss \/ paintDepth/);

  const depth = copy();
  depth.results[0].paintDepth!.after = 110;
  assert.throws(() => validateContent(depth), /mustang-bonnet\.paintDepth\.after/);

  const area = copy();
  area.serviceAreas[0].serviceDays.push('Sunday');
  assert.throws(() => validateContent(area), /tempe\.serviceDays/);
});

const invalidEdits: [string, (data: ReturnType<typeof copy>) => void, RegExp][] = [
  ['unsafe add-on ID', data => { data.addons[0].id = 'Headlight restore'; }, /Headlight restore\.id/],
  ['duplicate ID across collections', data => { data.results[0].id = 'tempe'; }, /tempe\.id/],
  ['fractional package price', data => { data.packages[0].prices.suv = 109.5; }, /gloss-wash\.prices\.suv/],
  ['missing prerequisite', data => { data.packages[5].requires = 'missing'; }, /ceramic-coating\.requires/],
  ['no featured package', data => { data.packages[2].featured = false; }, /mirror-detail.*\.featured/],
  ['two featured results', data => { data.results[1].featured = true; }, /mustang-bonnet, model3-door\.featured/],
  ['out-of-range add-on price', data => { data.addons[0].price = 1001; }, /headlight-restore\.price/],
  ['out-of-range travel fee', data => { data.serviceAreas[0].travelFee = 101; }, /tempe\.travelFee/],
  ['unknown result package', data => { data.results[0].packageId = 'missing'; }, /mustang-bonnet\.packageId/],
  ['unknown result area', data => { data.results[0].areaId = 'missing'; }, /mustang-bonnet\.areaId/],
  ['out-of-range gloss', data => { data.results[0].gloss!.after = 101; }, /mustang-bonnet\.gloss\.after/],
  ['gloss does not improve', data => { data.results[0].gloss!.after = 38; }, /mustang-bonnet\.gloss\.after/],
  ['out-of-range depth', data => { data.results[0].paintDepth!.before = 251; }, /mustang-bonnet\.paintDepth\.before/],
  ['depth increases', data => { data.results[0].paintDepth!.after = 129; }, /mustang-bonnet\.paintDepth\.after/],
  ['interior includes paint readings', data => {
    data.results[5].gloss = data.results[0].gloss;
    data.results[5].paintDepth = data.results[0].paintDepth;
  }, /wrangler-seats\.gloss \/ paintDepth/],
];

for (const [name, edit, expected] of invalidEdits) {
  test(`content rejects ${name}`, () => {
    const data = copy();
    edit(data);
    assert.throws(() => validateContent(data), expected);
  });
}

test('AutoWash schema follows service areas and package price or availability edits', () => {
  const data = copy();
  const mirror = data.packages.find(item => item.id === 'mirror-detail')!;
  mirror.prices.sedan = 299;
  const wash = data.packages.find(item => item.id === 'gloss-wash')!;
  wash.available = false;
  const schema = businessStructuredData(data.packages);
  assert.equal(schema['@type'], 'AutoWash');
  assert.ok(!('address' in schema));
  assert.deepEqual(schema.areaServed.map(area => area.name), serviceAreas.map(area => area.name));
  const items = schema.hasOfferCatalog.itemListElement;
  assert.equal(items.find(item => item.name === mirror.name)?.itemListElement[0].price, 299);
  assert.equal(items.find(item => item.name === wash.name)?.itemListElement[0].price, undefined);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
