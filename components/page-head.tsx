import type { ReactNode } from 'react';
import { GaugeReadout } from './gauge';

export function PageHead({ title, label, reading, children }: {
  title: string; label: string; reading: ReactNode; children?: ReactNode;
}) {
  return <header className="gloss light-bar tape-edge py-11 sm:py-16">
    <div className="wrap flex flex-wrap items-end justify-between gap-5">
      <div className="grid gap-4">
        <h1 className="text-[clamp(1.75rem,5.2vw,4.6rem)]">{title}</h1>
        {children && <p className="max-w-[57ch] text-base text-muted sm:text-lg">{children}</p>}
      </div>
      <GaugeReadout label={label}>{reading}</GaugeReadout>
    </div>
  </header>;
}
