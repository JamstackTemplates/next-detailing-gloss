import { Icon } from '../../components/art/icons';
import { Pad, padColors } from '../../components/art/pad';
import { CallToAction, FAQItem, Heading, Lede, RequestLink, Section, SectionIntro, ShutLine } from '../../components/detailing';
import { PageHead } from '../../components/page-head';
import { PackageRack } from '../../components/pad-rack';
import { addons } from '../../content/addons';
import { packages, type Pad as PadColor } from '../../content/packages';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata = pageMetadata('/packages/', 'Packages', 'Compare mobile detailing, paint correction and ceramic coating prices for sedans, SUVs, trucks and vans.');

const padKey: { pad: PadColor; label: string }[] = [
  { pad: 'wool', label: 'Heavy cut' }, { pad: 'orange', label: 'Polishing cut' },
  { pad: 'white', label: 'Refine' }, { pad: 'black', label: 'Finish' },
  { pad: 'blue', label: 'Wash' }, { pad: 'gold', label: 'Interior' },
];

export default function PackagesPage() {
  return <>
    <PageHead title="Packages" label="On the rack" reading={`${packages.length} packages`}>
      Choose a vehicle size, then open a package for the work, time on site and price.
    </PageHead>

    <Section>
      <SectionIntro><Heading>Pick a pad</Heading></SectionIntro>
      <PackageRack items={packages} />
      <div className="mt-9">
        <ShutLine />
        <h2 className="my-5 text-base sm:text-lg">What each pad does</h2>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {padKey.map(({ pad, label }) => <li key={pad} className="flex flex-wrap items-center gap-2 border-b-3 pb-2 text-sm font-semibold" style={{ borderColor: padColors[pad][0] }}>
            <div className="w-8"><Pad color={pad} /></div>{label}
          </li>)}
        </ul>
      </div>
    </Section>

    <Section tone="gloss">
      <SectionIntro><Heading>Add-ons</Heading><Lede>Extra work for specific parts of the car.</Lede></SectionIntro>
      <ul className="menu-board">
        {addons.map(addon => <li key={addon.id} id={addon.id} className="menu-row">
          <div className="flex items-baseline gap-3">
            <strong className={`text-base sm:text-lg ${addon.available ? '' : 'line-through'}`}>{addon.name}</strong>
            <span className="min-w-4 flex-1 border-b border-dotted border-line" aria-hidden="true" />
            <span className={`shrink-0 font-semibold ${addon.available ? 'font-display text-reflection' : 'max-w-24 text-right text-sm text-muted sm:max-w-none'}`}>
              {addon.available ? `$${addon.price}` : 'Not offered right now'}
            </span>
          </div>
          <p className="text-sm text-muted">{addon.appliesTo.length === packages.length ? 'All packages' : packages.filter(detail => addon.appliesTo.includes(detail.id)).map(detail => detail.name).join(' · ')}</p>
        </li>)}
      </ul>
    </Section>

    <Section>
      <div className="mb-12 flex items-start gap-4 border-l-3 border-tape bg-bg p-5 sm:mb-17 sm:p-8">
        <Icon name="coat" className="size-8 shrink-0 text-accent-ink" />
        <div className="grid gap-3">
          <h2 className="text-base sm:text-xl">Before we coat</h2>
          <Lede>Five-Year Ceramic Coating requires a One-Step Polish. We also need a garage or covered space where the car can stay dry for the 24-hour cure.</Lede>
        </div>
      </div>
      <Heading>Common questions</Heading>
      <div className="mt-5">
        <ShutLine />
        <FAQItem question="Do you need my water or power?">Our vans bring a water tank, generator, deionised rinse and lighting. We need space to work and access to the car.</FAQItem>
        <FAQItem question="How long does a coating cure?">The car needs 24 hours under cover after application. Keep it dry during that time.</FAQItem>
        <FAQItem question="Can you work in direct summer sun?">We polish and coat only in shade from June through September. A garage or covered parking works well.</FAQItem>
        <FAQItem question="What if it rains?">If there’s dry, covered space we can work there. If rain will reach the work area, we’ll arrange another day.</FAQItem>
        <FAQItem question="Do you remove every scratch?">Scratches that go through the clear coat need paint repair. Polishing can reduce shallower defects when the paint-depth readings allow it.</FAQItem>
      </div>
    </Section>

    <CallToAction><Heading>Find the right package for your paint.</Heading><RequestLink outline>Request a detail</RequestLink></CallToAction>
  </>;
}
