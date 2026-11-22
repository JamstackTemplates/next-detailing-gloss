import { Icon } from '../components/art/icons';
import { RigCutaway } from '../components/art/rig-cutaway';
import { CallToAction, Heading, Kicker, Lede, RequestLink, Section, SectionIntro, ShutLine, Step } from '../components/detailing';
import { Hero } from '../components/hero';
import { OpenBadge } from '../components/open-badge';
import { PadRack } from '../components/pad-rack';
import { SiteLink } from '../components/site-link';
import { InteractiveTapeLine } from '../components/tape-line';
import { business, crewHours, crewHoursSummary } from '../content/business';
import { packages } from '../content/packages';
import { featuredResult } from '../content/results';
import { serviceAreas } from '../content/service-areas';
import { pageMetadata } from '../lib/page-metadata';
import { site } from '../lib/site';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata = { ...pageMetadata('/', business.name, site.description), title: { absolute: business.name } };

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    <Hero>
      <Kicker>Mobile detailing · East Valley, AZ</Kicker>
      <Hero.Heading><span>Paint so clear</span>{' '}<span>it reflects</span>{' '}<em>the street sign.</em></Hero.Heading>
      <Hero.Introduction>Mobile paint correction and ceramic coating across the East Valley. We bring the water, the power and the light. You bring the keys.</Hero.Introduction>
      <Hero.Actions><RequestLink>Request a detail</RequestLink><Hero.Packages>Compare packages</Hero.Packages></Hero.Actions>
      <div><OpenBadge hours={crewHours} summary={`Crew hours ${crewHoursSummary}`} /></div>
    </Hero>

    <Section tone="gloss">
      <div className="grid gap-7 lg:grid-cols-[.78fr_1.55fr] lg:items-center lg:gap-15">
        <div className="grid gap-4">
          <Kicker>Before / after</Kicker>
          <Heading>The tape line</Heading>
          <Lede>We tape off half the panel and polish the other half under the same inspection lights.</Lede>
          <SiteLink href="/results/" className="text-link w-fit">See all results</SiteLink>
        </div>
        <figure className="grid min-w-0 gap-3">
          <InteractiveTapeLine shot={featuredResult} interior={packages.some(detail => detail.id === featuredResult.packageId && !detail.exterior)} />
          <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-muted">
            <span>{featuredResult.vehicle} · {featuredResult.panel}</span>
            {featuredResult.paintDepth && <span>Depth {featuredResult.paintDepth.before} → {featuredResult.paintDepth.after} µm · Gloss measured at 20°</span>}
          </figcaption>
        </figure>
      </div>
    </Section>

    <Section>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-3"><Kicker>Sedan starting prices</Kicker><Heading>The package rack</Heading></div>
        <SiteLink href="/packages/" className="text-link">Compare packages</SiteLink>
      </div>
      <PadRack items={packages} />
    </Section>

    <ShutLine />
    <Section tone="plain">
      <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <SectionIntro>
          <Heading>How a correction day runs</Heading>
          <Lede>We inspect the paint before the first pass and check it again before applying protection.</Lede>
        </SectionIntro>
        <ol className="correction-rail">
          <Step number="01" icon="clay" title="Decon wash">Hand wash, dissolve embedded iron and lift bonded grit with clay.</Step>
          <Step number="02" icon="torch" title="Measure">Take paint-depth readings across the panels and test a small spot under inspection lights.</Step>
          <Step number="03" icon="polish" title="Correct">Work panel by panel with the pad and compound that suit the paint.</Step>
          <Step number="04" icon="coat" title="Protect">Wipe down the corrected paint and apply the sealant or coating for your package.</Step>
        </ol>
      </div>
    </Section>

    <Section tone="gloss">
      <div className="rig-scene">
        <div className="rig-intro grid gap-3">
          <Kicker>Self-contained mobile rigs</Kicker>
          <Heading>We bring the bay</Heading>
          <Lede>Our two vans carry their own water, power and lights. A parking-sized space is all we need to set up.</Lede>
        </div>
        <RigCutaway />
        <p className="mt-2 text-sm text-muted sm:hidden">Water tank · Hose reel · Generator · Deionised rinse · Pad rack · Inspection lights</p>
      </div>
    </Section>

    <Section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-3"><Kicker>Tempe-based mobile crew</Kicker><Heading>Where we run</Heading></div>
        <SiteLink href="/service-areas/" className="text-link">See days and travel fees</SiteLink>
      </div>
      <ul className="area-strip" aria-label="Service areas and travel fees">
        {serviceAreas.map(area => <li key={area.id}>
          <SiteLink href={`/service-areas/#${area.id}`} className="decal flex items-center gap-2 hover:underline">
            <Icon name="pin" className="size-4 text-accent-ink" />{area.name}
            <small className="rounded-sm bg-bg px-1.5 text-xs text-muted">{area.travelFee ? `$${area.travelFee}` : 'Free'}</small>
          </SiteLink>
        </li>)}
      </ul>
    </Section>

    <CallToAction><Heading>Tell us the car, the colour and the worry.</Heading><RequestLink outline>Request a detail</RequestLink></CallToAction>
  </>;
}
