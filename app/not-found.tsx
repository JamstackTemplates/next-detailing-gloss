import { BurnThrough } from '../components/art/panel-art';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return <div className="primer">
    <div className="gloss tape-edge"><div className="wrap max-w-260"><BurnThrough /></div></div>
    <div className="wrap grid gap-6 py-9 sm:py-15">
      <h1 className="max-w-[25ch] text-[clamp(1.6rem,4vw,3.4rem)]">Burned through. This page went past the clear coat.</h1>
      <nav className="flex flex-wrap gap-2" aria-label="Find a page">
        <SiteLink className="decal hover:underline" href="/">Home</SiteLink>
        <SiteLink className="decal hover:underline" href="/packages/">Packages</SiteLink>
        <SiteLink className="decal hover:underline" href="/contact/">Contact</SiteLink>
      </nav>
    </div>
  </div>;
}
