import type { ServiceArea } from '../../content/service-areas';

const roads = [
  { name: 'I-10', path: 'M-12 185H210q32 0 38 38l15 94q4 33 34 56l47 39', x: 221, y: 288 },
  { name: 'LOOP 101', path: 'M340-10v91q0 32 26 45l42 21q17 9 17 31v235', x: 422, y: 295 },
  { name: 'LOOP 202', path: 'M-10 147h158q18 0 39 13l15 10H584q39 0 39 43v136q0 29-31 29H326', x: 547, y: 156 },
  { name: 'US-60', path: 'M247 224q8 24 35 24h371', x: 545, y: 240 },
];

export function RouteMap({ areas }: { areas: readonly ServiceArea[] }) {
  return <svg viewBox="0 0 640 400" role="img" aria-label="Schematic East Valley route map showing the eight service areas and Tempe Town Lake" className="w-full rounded-ui border border-line bg-surface shadow-sm">
    <defs>
      <pattern id="route-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke="var(--rule)" strokeWidth=".9" fill="none" opacity=".75" />
      </pattern>
      <pattern id="route-major" width="96" height="96" patternUnits="userSpaceOnUse">
        <path d="M96 0H0V96" stroke="var(--rule)" strokeWidth="1.4" fill="none" />
      </pattern>
    </defs>
    <path d="M0 0h640v400H0Z" fill="url(#route-grid)" />
    <path d="M0 0h640v400H0Z" fill="url(#route-major)" />
    {/* South Mountain & Camelback topographic contours */}
    <path d="M0 284q74-29 113-26l37 22 44 13 21 51L0 391Zm0-229q73-22 112 2l37 22 21 27-71 18L0 102Z" fill="var(--tape)" opacity=".12" stroke="var(--tape)" strokeWidth="1" strokeDasharray="3 3" />
    {/* Salt River channel & Tempe Town Lake */}
    <path d="M-10 204q98 10 159-16t175-17q101 12 147-10t180-27" fill="none" stroke="var(--tape)" opacity=".5" strokeWidth="4" />
    <ellipse cx="298" cy="174" rx="58" ry="9" fill="var(--tape)" transform="rotate(4 298 174)" />
    <path d="M273 172l54 5m-45-1 34 3" stroke="var(--reflection)" strokeWidth="1.3" />
    <text x="287" y="151" textAnchor="middle" fill="var(--ink-muted)" fontSize="13.5" fontWeight="650" letterSpacing=".5">Tempe Town Lake</text>
    {/* East Valley freeways */}
    {roads.map(road => <g key={road.name}>
      <path d={road.path} fill="none" stroke="var(--tape)" strokeWidth="4.5" opacity=".76" />
      <path d={road.path} fill="none" stroke="var(--surface)" strokeWidth="1.35" strokeDasharray="6 4" />
      <rect x={road.x - 34} y={road.y - 12} width="68" height="17" rx="3" fill="var(--surface)" stroke="var(--rule)" strokeWidth="1" />
      <text x={road.x} y={road.y} textAnchor="middle" fill="var(--ink)" fontWeight="700" fontSize="10.5" letterSpacing=".6">{road.name}</text>
    </g>)}
    {/* Base dispatch radar rings around Tempe */}
    <circle cx={47 * 6.4} cy={50 * 4} r="32" fill="none" stroke="var(--primary)" strokeWidth="1.2" strokeDasharray="3 3" opacity=".6" />
    <g transform="translate(596 42)" fill="var(--ink-muted)" textAnchor="middle" fontSize="14" fontWeight="700">
      <circle r="20" fill="var(--surface)" stroke="var(--rule)" strokeWidth="1.2" />
      <text y="-7" fontSize="10">N</text><path d="m0-4 5 15-5-4-5 4Z" fill="var(--tape)" />
    </g>
    {areas.map((area, index) => {
      const width = area.name.length * 8.6 + 44;
      const isBase = area.id === 'tempe';
      return <g key={area.id} transform={`translate(${area.mapPosition.x * 6.4} ${area.mapPosition.y * 4})`}>
        <rect x={-width / 2} y="-15" width={width} height="30" rx="4" fill="var(--surface-gloss)" stroke={isBase ? 'var(--primary)' : 'var(--tape)'} strokeWidth="1.6" />
        <rect x={-width / 2 + 4} y="-11" width="22" height="22" rx="2.5" fill={isBase ? 'var(--primary)' : 'var(--tape)'} />
        <text x={-width / 2 + 15} y="5" textAnchor="middle" fill={isBase ? '#ffffff' : '#05080c'} fontSize="13.5" fontWeight="750">{index + 1}</text>
        <text x={13} y="5.5" textAnchor="middle" fill="#edf2f6" fontSize="15.5" fontWeight="650">{area.name}</text>
      </g>;
    })}
  </svg>;
}

export function DepthDiagram() {
  return <svg viewBox="0 0 460 215" className="w-full rounded-ui border border-line bg-surface p-3" role="img" aria-label="Paint cross-section showing material removed from the clear coat above the base coat, primer and metal">
    <g stroke="var(--ink)" strokeWidth="1.25">
      {/* Unpolished vs polished clear coat step */}
      <path d="M24 56h114c27 0 32 16 56 16h74v29H24Z" fill="var(--tape)" opacity=".88" />
      <path d="M138 56h130v16H138Z" fill="var(--tape)" opacity=".2" stroke="none" />
      {/* Base coat, primer, steel panel */}
      <path d="M24 101h244v22H24Z" fill="#b45c3a" />
      <path d="M24 123h244v21H24Z" fill="#9aa6b0" />
      <path d="M24 144h244v28H24Z" fill="#485561" />
      {/* Micron removal tolerance lines */}
      <path d="M138 56h150m-14 0v16m-8 0h16" stroke="var(--ink)" strokeDasharray="3 3" fill="none" />
      {/* Ultrasonic gauge probe head resting on clear coat */}
      <path d="M64 55V20h56v35m-46-24h36v15H74z" fill="var(--surface-gloss)" stroke="var(--tape)" strokeWidth="1.4" />
      <text x="92" y="41" textAnchor="middle" fill="var(--reflection)" fontFamily="var(--font-display)" fontSize="9.5">122µm</text>
    </g>
    <g fill="var(--ink)" fontSize="14.5" fontWeight="650">
      <text x="296" y="67" fill="var(--accent-ink)">3–6 µm removed</text>
      <text x="280" y="91">Clear coat (45–60 µm)</text>
      <text x="280" y="117">Colour base coat</text>
      <text x="280" y="138">Factory primer</text>
      <text x="280" y="163">Body panel</text>
    </g>
  </svg>;
}
