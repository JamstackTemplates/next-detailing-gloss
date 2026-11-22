import type { Metadata } from 'next';
import { business } from '../content/business';
import { absoluteUrl, asset } from './paths';
import { site } from './site';

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const canonical = absoluteUrl(path);
  const image = site.url ? `${site.url}/og.png` : asset('/og.png');
  return {
    title, description,
    alternates: { canonical },
    openGraph: {
      type: 'website', siteName: business.name, title, description, url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: 'Mirror Finish Detailing. A taped bonnet shows gloss readings of 38 and 91 GU.' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
