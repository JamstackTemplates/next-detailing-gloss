import type { ReactNode } from 'react';

export function GaugeReadout({ label, children }: { label: string; children: ReactNode }) {
  return <span className="gauge"><small>{label}</small><b>{children}</b></span>;
}
