import { business, crewHoursSummary } from '../content/business';
import { serviceAreas } from '../content/service-areas';
import { RigCutaway } from './art/rig-cutaway';
import { ShutLine } from './detailing';
import { SiteLink } from './site-link';
import { Wordmark } from './site-header';

export function ContactLinks() {
  return <address className="grid gap-1 font-semibold not-italic">
    <a className="wrap-anywhere underline" href={`mailto:${business.email}`}>{business.email}</a>
    <a className="w-fit underline" href={business.phoneHref}>{business.phone}</a>
  </address>;
}

export function SiteFooter() {
  return <footer className="primer">
    <ShutLine />
    <div className="wrap grid gap-8 py-10 md:grid-cols-[1fr_.8fr] md:items-center sm:py-13">
      <div className="grid gap-4">
        <Wordmark />
        <ContactLinks />
        <p className="text-sm text-muted">{crewHoursSummary} · Mobile service only</p>
      </div>
      <div className="no-print mx-auto w-full max-w-90 text-muted"><RigCutaway compact /></div>
      <ul className="no-print flex flex-wrap gap-2 text-sm md:col-span-2" aria-label="Service areas">
        {serviceAreas.map(area => <li key={area.id}><SiteLink href={`/service-areas/#${area.id}`} className="decal block hover:underline">{area.name}</SiteLink></li>)}
      </ul>
    </div>
  </footer>;
}
