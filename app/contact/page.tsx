import { RigCutaway } from '../../components/art/rig-cutaway';
import { Heading, Lede } from '../../components/detailing';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { ContactLinks } from '../../components/site-footer';
import { business, crewHours, crewHoursSummary } from '../../content/business';
import { pageMetadata } from '../../lib/page-metadata';
import { site } from '../../lib/site';

export const metadata = pageMetadata('/contact/', 'Contact', 'Tell us about your car and suburb to request a mobile detail, paint correction or ceramic coating.');

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead title="Request a detail" label="Enquiries" reading="Mobile crew" />
    <div className="wrap grid gap-5 py-8 md:grid-cols-2 md:py-13">
      <section className="gloss rounded-2xl p-5 sm:p-8">
        <Lede>Tell us about the car and we'll reply with a suggested package, a price for your vehicle size and the days we're in your area.</Lede>
        <h2 className="mt-6 text-base">Put in your message</h2>
        <ul className="tape-checklist my-4 grid gap-2">
          <li>Year, make, model and colour</li>
          <li>Sedan, SUV or truck/van</li>
          <li>The package you're considering, or what's bothering you about the paint</li>
          <li>Your suburb, and whether there's a garage or shade</li>
          <li>Two or three days that suit you</li>
        </ul>
        <ContactLinks />
        <div className="mt-4"><OpenBadge hours={crewHours} summary={`Crew hours ${crewHoursSummary}`} alwaysShowSchedule /></div>
        <p className="mt-5 border-t border-line pt-4 text-sm text-muted">Sending this doesn't reserve a time. We'll reply to agree a day and a price, and nothing is confirmed until then.</p>
      </section>
      <section aria-label="Contact options" className="primer rounded-2xl border border-line p-5 sm:p-8">
        {hosted ? <>
          <Heading>Send an enquiry</Heading>
          <div className="mt-4"><JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} /></div>
        </> : <div className="grid gap-4">
          <Heading>Write to the crew</Heading>
          <Lede>Email the details of your car or give us a call with a question.</Lede>
          <ContactLinks />
        </div>}
      </section>
      <div className="no-print mx-auto w-full max-w-110 text-muted md:col-span-2"><RigCutaway compact /></div>
    </div>
  </>;
}
