import { DarkModeToggle } from 'jamstacks';
import { RequestLink } from './detailing';
import { SiteLink } from './site-link';

const navigation = [
  ['/packages/', 'Packages'], ['/results/', 'Results'],
  ['/service-areas/', 'Service areas'], ['/contact/', 'Contact'],
] as const;

export function Wordmark() {
  return <SiteLink href="/" className="wordmark">
    <strong>MIRROR FINISH</strong><small>Detailing</small>
  </SiteLink>;
}

export function SiteHeader() {
  return <header className="gloss tape-edge light-bar">
    <div className="wrap site-header">
      <Wordmark />
      <nav aria-label="Main" className="main-nav">
        {navigation.map(([href, label]) => <SiteLink key={href} href={href} markCurrent="page">{label}</SiteLink>)}
      </nav>
      <div className="header-actions flex items-center gap-4">
        <div className="hidden lg:block"><RequestLink>Request a detail</RequestLink></div>
        <DarkModeToggle />
      </div>
    </div>
  </header>;
}
