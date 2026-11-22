import { Icon, type IconName } from '../../components/art/icons';
import { RouteMap } from '../../components/art/route-map';
import { CallToAction, Heading, Lede, RequestLink, Section, SectionIntro } from '../../components/detailing';
import { PageHead } from '../../components/page-head';
import { business, crewDays } from '../../content/business';
import { serviceAreas } from '../../content/service-areas';
import { pageMetadata } from '../../lib/page-metadata';

export const metadata = pageMetadata('/service-areas/', 'Service areas', 'Find mobile detailing routes, crew days and travel fees for Tempe and the surrounding Phoenix-area communities.');
const fee = (amount: number) => amount ? `$${amount}` : 'Free';

const setup: { icon: IconName; title: string; copy: string }[] = [
  { icon: 'van', title: 'Parking-sized space', copy: 'A driveway or an office parking space with room to work around the car.' },
  { icon: 'garage', title: 'Cover for coatings', copy: 'A garage or covered space where the car can stay dry for the cure.' },
  { icon: 'key', title: 'Access to the car', copy: 'Leave the keys with us when we arrive. We bring our own hose, water and power.' },
];

export default function ServiceAreasPage() {
  return <>
    <PageHead title="Service areas" label="East Valley routes" reading={`${serviceAreas.length} areas`}>
      Our prep yard is near {business.base} in {business.city} and is closed to visitors. The crew does all detailing at your home or office.
    </PageHead>

    <Section>
      <div className="grid items-start gap-6 lg:grid-cols-[1.55fr_.9fr] lg:gap-9">
        <div className="grid gap-5"><Heading>The route map</Heading><RouteMap areas={serviceAreas} /></div>
        <ol className="divide-y divide-line border-y border-line" aria-label="Map legend and travel fees">
          {serviceAreas.map((area, index) => <li key={area.id} className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 py-2.5">
            <span className="area-number">{index + 1}</span>
            <div><p className="font-semibold">{area.name}</p>
              <p className="text-sm text-muted">{area.serviceDays.length === crewDays.length ? 'Mon–Sat' : area.serviceDays.map(day => day.slice(0, 3)).join(', ')}</p>
            </div>
            <span className="text-sm font-semibold">{fee(area.travelFee)}</span>
          </li>)}
        </ol>
      </div>
    </Section>

    <Section tone="plain">
      <SectionIntro><Heading>Crew timetable</Heading><Lede>The van marks each day we serve an area.</Lede></SectionIntro>
      <div className="timetable relative overflow-x-auto rounded-ui border border-line" role="region" aria-label="Scrollable crew timetable" tabIndex={0}>
        <table className="w-full min-w-160 border-collapse text-center">
          <caption className="sr-only">Service days and travel fees by area</caption>
          <thead className="gloss"><tr>
            <th scope="col" className="p-3 text-left">Area</th>
            {crewDays.map(day => <th key={day} scope="col" className="px-2 py-3"><abbr title={day} className="no-underline">{day.slice(0, 3)}</abbr></th>)}
            <th scope="col" className="p-3">Travel fee</th>
          </tr></thead>
          <tbody className="bg-surface">
            {serviceAreas.map(area => <tr key={area.id} id={area.id} className="border-b border-line last:border-b-0">
              <th scope="row" className="p-3 text-left font-semibold">{area.name}{area.note && <small className="block max-w-36 font-normal text-muted">{area.note}</small>}</th>
              {crewDays.map(day => <td key={day} className="p-2">
                {area.serviceDays.includes(day) ? <><Icon name="van" className="mx-auto text-accent-ink" /><span className="sr-only">Served</span></>
                  : <><span aria-hidden="true" className="text-muted">–</span><span className="sr-only">Unavailable</span></>}
              </td>)}
              <td className="p-3 font-semibold">{fee(area.travelFee)}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Section>

    <Section>
      <SectionIntro><Heading>What we need on site</Heading></SectionIntro>
      <ul className="grid gap-5 md:grid-cols-3 md:gap-8">
        {setup.map(({ icon, title, copy }) => <li key={icon} className="flex items-start gap-3">
          <Icon name={icon} className="size-8 shrink-0 text-accent-ink" />
          <div><h3 className="text-sm">{title}</h3><p className="mt-2 text-muted">{copy}</p></div>
        </li>)}
      </ul>
      <aside className="mt-8 border-l-4 border-accent bg-bg p-5 sm:mt-12 sm:p-7">
        <h3 className="text-base">Summer heat · June–September</h3>
        <p className="mt-2 text-muted">We polish and coat only in shade through the hottest months. Central Phoenix visits require a garage or covered parking during this period.</p>
      </aside>
    </Section>

    <CallToAction><Heading>Tell us where the car is parked.</Heading><RequestLink outline>Request a detail</RequestLink></CallToAction>
  </>;
}
