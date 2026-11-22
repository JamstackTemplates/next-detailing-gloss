'use client';

import { useEffect, useId, useState } from 'react';
import { vehicleSizes, type DetailPackage, type VehicleSize } from '../content/packages';
import { Pad } from './art/pad';
import { SiteLink } from './site-link';

const sizes = Object.keys(vehicleSizes) as VehicleSize[];
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function PadRack({ items }: { items: readonly DetailPackage[] }) {
  return <ul className="pad-rack pad-rack-home">
    {items.map(detail => <li key={detail.id}>
      <SiteLink href={`/packages/#${detail.id}`} className={`rack-tag rack-hangtag group ${detail.featured ? 'rack-hangtag-featured' : ''}`}>
        <Pad color={detail.pad} />
        <span className="rack-card">
          <span className="rack-hole" aria-hidden="true" />
          <span className="rack-name group-hover:underline">{detail.name}</span>
          <span className="rack-info">{detail.available ? <>From <b>{usd.format(detail.prices.sedan)}</b></> : 'Paused this season'}</span>
          <small className="text-muted">{detail.hours} hours</small>
          {detail.featured && <small className="rack-feature">Most requested</small>}
        </span>
      </SiteLink>
    </li>)}
  </ul>;
}

export function PackageRack({ items }: { items: readonly DetailPackage[] }) {
  const name = useId();
  const [selectedSize, setSelectedSize] = useState<VehicleSize | null>(null);
  const [linkedId, setLinkedId] = useState('');

  useEffect(() => {
    setSelectedSize('sedan');
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (items.some(item => item.id === id)) setLinkedId(id);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [items]);

  return <div className="grid gap-6">
    {selectedSize && <fieldset className="size-switch">
      <legend className="mb-2 text-sm font-semibold uppercase tracking-widest">Vehicle size</legend>
      <div className="inline-flex flex-wrap rounded-ui border border-line bg-bg p-1">
        {sizes.map(size => <label key={size} className="size-choice">
          <input type="radio" name={name} value={size} checked={size === selectedSize} onChange={() => setSelectedSize(size)} />
          <span>{vehicleSizes[size]}</span>
        </label>)}
      </div>
    </fieldset>}
    <ul className="pad-rack pad-rack-spec">
      {items.map(detail => {
        const prerequisite = items.find(item => item.id === detail.requires);
        return <li key={detail.id} id={detail.id} className="min-w-0">
          <details className={`rack-details ${detail.featured ? 'rack-details-featured' : ''}`} open={detail.id === linkedId ? true : undefined}>
            <summary className="rack-tag">
              <Pad color={detail.pad} />
              <span className="rack-name">{detail.name}</span>
              {detail.available
                ? selectedSize && <strong className="rack-info rack-live-price">{usd.format(detail.prices[selectedSize])}</strong>
                : <span className="rack-info">Paused this season</span>}
              <small className="text-muted">{detail.hours} hours</small>
              {detail.featured && <small className="rack-feature">Most requested</small>}
              <span className="rack-expand" aria-hidden="true" />
            </summary>
            <div className="grid gap-3 border-t border-line bg-surface p-3.5">
              {detail.available && <dl className={`rack-all-prices text-sm ${selectedSize ? 'hidden' : ''}`}>
                {sizes.map(size => <div key={size} className="flex justify-between gap-2">
                  <dt>{vehicleSizes[size]}</dt><dd>{usd.format(detail.prices[size])}</dd>
                </div>)}
              </dl>}
              <p className="text-sm font-medium">{detail.summary}</p>
              <ul className="list-disc space-y-1 ps-4 text-sm text-muted">{detail.includes.map(item => <li key={item}>{item}</li>)}</ul>
              {prerequisite && <p className="text-sm">Requires <a href={`#${prerequisite.id}`} className="text-link">{prerequisite.name}</a>.</p>}
            </div>
          </details>
        </li>;
      })}
    </ul>
  </div>;
}
