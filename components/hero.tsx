import type { ReactNode } from 'react';
import { asset } from '../lib/paths';
import { SiteLink } from './site-link';

type CopyProps = { children: ReactNode };

const HERO_ALT = 'A Shadow Black Mustang GT bonnet under hexagonal inspection lights with a blue painter’s tape line splitting swirled paint on the left from a mirror reflection of the Mill Ave street sign and palm tree on the right, with a dual-action polisher resting on the wing';

function HomeHero({ children }: CopyProps) {
  return <section className="hero matte">
    <div className="hero-copy">{children}</div>
    <div className="hero-visual">
      <img
        src={asset('/hero-light.jpg')}
        alt={HERO_ALT}
        width={2000}
        height={1493}
        fetchPriority="high"
        decoding="async"
        className="bay-art bay-art-light"
      />
      <img
        src={asset('/hero-dark.jpg')}
        alt=""
        aria-hidden="true"
        width={2000}
        height={1493}
        fetchPriority="high"
        decoding="async"
        className="bay-art bay-art-dark"
      />
    </div>
  </section>;
}
function Heading({ children }: CopyProps) {
  return <h1 className="hero-title">{children}</h1>;
}
function Introduction({ children }: CopyProps) {
  return <p className="hero-intro text-muted">{children}</p>;
}
function Actions({ children }: CopyProps) {
  return <div className="hero-actions">{children}</div>;
}
function Packages({ children }: CopyProps) {
  return <SiteLink className="text-link min-h-9 content-center" href="/packages/">{children}</SiteLink>;
}

export const Hero = Object.assign(HomeHero, { Heading, Introduction, Actions, Packages });
