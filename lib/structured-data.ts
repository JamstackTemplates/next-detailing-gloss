import { business, crewHours } from '../content/business.ts';
import { packages, vehicleSizes, type VehicleSize } from '../content/packages.ts';
import { serviceAreas } from '../content/service-areas.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

export function businessStructuredData(items = packages) {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org', '@type': 'AutoWash',
    name: business.name, description: site.description, email: business.email, telephone: business.phone,
    ...(url ? { url, image: `${site.url}/og.png` } : {}),
    areaServed: serviceAreas.map(area => ({ '@type': 'Place', name: area.name })),
    openingHoursSpecification: crewHours.filter(entry => entry.opens).map(({ day, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens, closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Detailing packages',
      itemListElement: items.map(detail => ({
        '@type': 'OfferCatalog', name: detail.name,
        itemListElement: (Object.keys(vehicleSizes) as VehicleSize[]).map(size => ({
          '@type': 'Offer', name: vehicleSizes[size],
          url: absoluteUrl('/packages/') ? `${absoluteUrl('/packages/')}#${detail.id}` : undefined,
          ...(detail.available ? { price: detail.prices[size], priceCurrency: 'USD' } : {}),
          availability: detail.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemOffered: { '@type': 'Service', name: detail.name, description: detail.summary },
        })),
      })),
    },
  };
}

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
