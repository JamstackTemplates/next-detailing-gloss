const paths = {
  wash: 'M4 8h16l-2 12H6L4 8Zm2 0a6 6 0 0 1 12 0M6 15h12m-9 .2v3m3-3v3m3-3v3',
  clay: 'M3 9 14 5l7 4v6l-11 4-7-4V9Zm0 0 7 4 11-4m-11 4v6',
  polish: 'M3 17h10v3H3zm3 0v-5h5v5m-6-5V7l4-2 5 2 6-1 1 3-8 2-3 1H5Z',
  coat: 'M6 5V2h6v3m-7 0h8l1 4v12H4V9l1-4Zm-1 8h10m2 5h6v3h-6v-3Z',
  steam: 'M3 21 13 10l-3-3L1 17m12-7 3-4m1 5 4 1m-2-5 3-2m-5-2 1-2',
  bead: 'M12 3c3 5 6 8 6 12a6 6 0 0 1-12 0c0-4 3-7 6-12Zm-3 12a3 3 0 0 0 3 3',
  torch: 'm3 12 3-3 4 1 6-6 4 4-6 6 1 4-3 3-9-9Zm12-7 4 4m-9 6 3-3M2 6h3m15 13h3',
  van: 'M5 18H2V7h13l5 4 2 5v2h-3m-4 0H9m6-11v6h6M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  calendar: 'M4 5h16v16H4zM4 9h16M8 3v4m8-4v4m-8 7h3m2 0h3m-8 3h3',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Zm-4.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
  garage: 'm2 10 10-7 10 7v11H2V10Zm4 11v-9h12v9m-12-6h12m-12 3h12',
  key: 'M14 13a5 5 0 1 0-4-4L2 17v5h5v-3h3v-3l4-3Zm2-5h.01',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
