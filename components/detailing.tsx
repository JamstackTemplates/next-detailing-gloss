import type { ReactNode } from 'react';
import { Icon, type IconName } from './art/icons';
import { SiteLink } from './site-link';

type CopyProps = { children: ReactNode };

export function Section({ children, tone = 'primer', id }: CopyProps & { tone?: 'primer' | 'gloss' | 'plain'; id?: string }) {
  return <section id={id} className={`${tone === 'plain' ? 'matte' : tone} py-13 sm:py-20`}>
    <div className="wrap">{children}</div>
  </section>;
}

export function ShutLine() {
  return <div className="shut-line" aria-hidden="true" />;
}

export function Kicker({ children }: CopyProps) {
  return <p className="eyebrow">{children}</p>;
}

export function Heading({ children }: CopyProps) {
  return <h2 className="text-[clamp(1.4rem,3.45vw,2.8rem)]">{children}</h2>;
}

export function Lede({ children }: CopyProps) {
  return <p className="max-w-[56ch] text-base text-muted sm:text-lg">{children}</p>;
}

export function SectionIntro({ children }: CopyProps) {
  return <div className="mb-7 grid gap-3 self-start sm:mb-10">{children}</div>;
}

export function RequestLink({ children, outline = false }: CopyProps & { outline?: boolean }) {
  return <SiteLink href="/contact/" className={`button ${outline ? 'button-outline' : ''}`}>{children}</SiteLink>;
}

export function CallToAction({ children }: CopyProps) {
  return <section className="call-to-action light-bar tape-edge bg-accent py-11 text-on-accent sm:py-16">
    <div className="wrap flex flex-wrap items-center justify-between gap-6">{children}</div>
  </section>;
}

export function Step({ number, icon, title, children }: CopyProps & { number: string; icon: IconName; title: string }) {
  return <li className="correction-step grid grid-cols-[auto_1fr] items-center gap-4 border-b border-line py-5 sm:gap-7 sm:py-7">
    <span className="step-number font-display" aria-hidden="true">{number}</span>
    <div className="space-y-2">
      <h3 className="flex items-center gap-2.5 text-sm sm:text-base">
        <span className="inline-grid size-7 place-items-center rounded-sm border border-line bg-surface text-accent-ink"><Icon name={icon} className="size-4.5 shrink-0" /></span>
        {title}
      </h3>
      <p className="max-w-[42ch] text-muted">{children}</p>
    </div>
  </li>;
}

export function FAQItem({ question, children }: CopyProps & { question: string }) {
  return <details className="faq-item">
    <summary className="py-4 text-lg font-semibold">{question}</summary>
    <p className="max-w-[65ch] pb-5 text-muted">{children}</p>
    <ShutLine />
  </details>;
}
