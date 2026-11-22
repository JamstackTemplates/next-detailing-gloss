import { DepthDiagram } from '../../components/art/route-map';
import { SwirlField } from '../../components/art/reflection-bay';
import { CallToAction, Heading, Kicker, Lede, RequestLink, Section, SectionIntro } from '../../components/detailing';
import { GaugeReadout } from '../../components/gauge';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { InteractiveTapeLine, TapeLine } from '../../components/tape-line';
import { packages } from '../../content/packages';
import { featuredResult, results, type Result } from '../../content/results';
import { serviceAreas } from '../../content/service-areas';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata = pageMetadata('/results/', 'Results', 'Compare illustrated detail results with before-and-after gloss and paint-depth readings.');

function DepthReadout({ shot }: { shot: Result }) {
  if (!shot.paintDepth) return null;
  return <GaugeReadout label="Paint depth">{shot.paintDepth.before} → {shot.paintDepth.after} µm</GaugeReadout>;
}

export default function ResultsPage() {
  return <>
    <PageHead title="Results" label="Contact sheet" reading={`${results.length} comparisons`}>
      See what a single pass, a two-step correction or a cabin reset can change. These illustrations show the same surface on either side of the tape.
    </PageHead>

    <Section tone="gloss">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.5fr)_minmax(14rem,1fr)] lg:gap-9">
        <figure className="grid gap-3">
          <InteractiveTapeLine shot={featuredResult} interior={!packages.find(detail => detail.id === featuredResult.packageId)?.exterior} />
          <figcaption className="text-sm text-muted">{featuredResult.vehicle} · {featuredResult.panel}</figcaption>
        </figure>
        <aside className="grid content-center gap-4 lg:border-l lg:border-tape lg:pl-6">
          <Kicker>Featured 50/50</Kicker>
          <h2 className="text-xl">{featuredResult.title}</h2>
          <p className="text-muted">{featuredResult.defects.join(' · ')}</p>
          <DepthReadout shot={featuredResult} />
        </aside>
      </div>
    </Section>

    <Section>
      <SectionIntro><Heading>The contact sheet</Heading><Lede>Each comparison shows a different defect, panel or finish.</Lede></SectionIntro>
      <div className="contact-sheet">
        {results.map((shot, index) => {
          const detail = packages.find(item => item.id === shot.packageId)!;
          const area = serviceAreas.find(item => item.id === shot.areaId)!;
          return <figure key={shot.id} id={shot.id} className="contact-frame">
            <TapeLine shot={shot} compact interior={!detail.exterior} variant={index % 4} />
            <figcaption className="grid gap-2.5 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 border-b border-line pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                <span>Frame 0{index + 1} · {shot.panel}</span>
                <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full border border-line" style={{ background: shot.paint }} aria-hidden="true" />{area.name}</span>
              </div>
              <h3 className="text-[.86rem] sm:text-base">{shot.title}</h3>
              <p className="text-sm font-semibold">{shot.vehicle}</p>
              <p className="text-sm text-muted"><SiteLink href={`/packages/#${detail.id}`} className="text-link">{detail.name}</SiteLink> · {shot.defects.join(' · ')}</p>
              <DepthReadout shot={shot} />
            </figcaption>
          </figure>;
        })}
      </div>
    </Section>

    <Section tone="plain">
      <div className="measure-scene relative isolate">
        <svg className="pointer-events-none absolute -z-10 right-0 top-0 h-full w-2/3 text-tape opacity-20" viewBox="0 0 450 280" aria-hidden="true"><SwirlField x={265} y={135} /></svg>
        <SectionIntro><Heading>How we measure</Heading></SectionIntro>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="grid gap-3">
            <h3 className="text-base">Gloss at 20°</h3>
            <Lede>A gloss meter measures how much light the finish reflects at a fixed 20° angle. We compare readings from the same spot before and after polishing.</Lede>
          </div>
          <div className="grid gap-3">
            <h3 className="text-base">Paint depth in microns</h3>
            <Lede>A depth gauge records the total coating thickness. The difference after polishing shows how much clear coat the pass removed.</Lede>
            <DepthDiagram />
          </div>
        </div>
      </div>
    </Section>

    <CallToAction><Heading>What’s showing up under your lights?</Heading><RequestLink outline>Request a detail</RequestLink></CallToAction>
  </>;
}
