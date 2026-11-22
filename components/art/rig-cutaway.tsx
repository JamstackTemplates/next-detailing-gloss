const callouts = [
  { label: 'Water tank', sub: '100 gal baffled', x: 219, y: 211, end: 105, top: true },
  { label: 'Hose reel', sub: '100 ft pressure line', x: 348, y: 167, end: 325, top: true },
  { label: 'Pad rack', sub: '6-stage foam & wool', x: 486, y: 135, end: 500, top: true },
  { label: 'Inspection lights', sub: 'Dual colour-match stands', x: 590, y: 153, end: 682, top: true },
  { label: 'Generator', sub: 'Quiet inverter power', x: 415, y: 244, end: 345, top: false },
  { label: 'Deionised rinse', sub: '0 ppm spot-free resin', x: 544, y: 239, end: 575, top: false },
];

export function RigCutaway({ compact = false }: { compact?: boolean }) {
  return <svg viewBox={compact ? '45 85 930 260' : '0 0 1000 398'} className="block w-full"
    role={compact ? undefined : 'img'} aria-hidden={compact ? true : undefined}
    aria-label={compact ? undefined : 'Mobile detailing van cutaway showing a water tank, hose reel, pad rack, inspection lights, generator and deionised rinse'}>
    <path d="M44 318h916M105 325h796" fill="none" stroke="currentColor" strokeWidth="1" opacity=".38" />
    {/* Sprinter van body shell */}
    <path d="M67 265l5-129c1-31 15-46 44-47h585c40 0 65 8 85 33l46 59 54 23c16 5 23 16 25 31l9 49-17 12H76l-18-13Z" fill="#e2eaf0" stroke="#647587" strokeWidth="1.5" />
    <path d="M68 245h841l11 39-17 12H76l-18-13Z" fill="#8b9ead" stroke="#c4dbe9" strokeWidth="1.5" />
    {/* Tape-blue body beltline stripe */}
    <path d="M70 237h835l2 6H70Z" fill="var(--tape)" opacity=".85" />
    {/* Cutaway cargo bay dark interior */}
    <path d="M82 101h588v166H88l-9-17z" fill="#131f2a" stroke="#628091" strokeWidth="1.5" />
    <path d="M97 114h559v135H97z" fill="#0c141b" stroke="#5b7a8a" strokeWidth="1.5" />
    <path d="M99 248h552v20H99z" fill="#374c5e" stroke="#99aeb9" strokeWidth="1.5" />
    {/* Interior ribs & shelving */}
    <path d="M119 120v124m188-124v124m158-124v124m108-124v124" stroke="#7c9cae" strokeWidth="1.5" opacity=".55" />
    <path d="M116 152h540m-540 71h540" stroke="#6e8190" strokeWidth="1" opacity=".45" />
    {/* Cab window & door lines */}
    <path d="M706 112c33 0 58 13 74 31l35 45H707Z" fill="#213847" stroke="#5a7084" strokeWidth="1.5" />
    <path d="M715 124c26 2 45 11 66 34l-66-14Z" fill="#94bcd0" opacity=".4" />
    <path d="M690 101v162m139-56v44m-120-51h23m152 17 25 11m-840-14h17" fill="none" stroke="#52677a" strokeWidth="1.5" />
    <path d="M895 212l16 6-3 18-15-4Z" fill="#d4f4ff" stroke="#5c788a" strokeWidth="1.2" />
    {/* 100-gal baffled water tank with sight glass */}
    <path d="M114 176q0-14 13-14h146q13 0 13 14v67H114Z" fill="#5e90aa" stroke="#b0dfF0" strokeWidth="1.5" />
    <path d="M119 201c62-12 106 9 161-3v38H119Z" fill="var(--tape)" opacity=".82" />
    <path d="M136 163v78m123-78v78m-93-81v-9h29v9m80 54h16v16h16" fill="none" stroke="#c6e5f0" strokeWidth="1.5" />
    {/* Hose reel */}
    <g fill="none" stroke="#d98c50" strokeWidth="1.5">
      {[11, 16, 21, 26, 31].map(r => <circle key={r} cx="346" cy="169" r={r} />)}
      <path d="M346 138v-10h15v7m16 31c14 22-12 31-20 44" />
    </g>
    {/* Inverter generator */}
    <path d="M383 218h67v34h-67Zm7-3v-13h54v13m-49 8h24v17h-24zm29 3h18m-18 5h18m-18 5h18" fill="#273e4d" stroke="#b0c7d4" strokeWidth="1.5" />
    <rect x="392" y="225" width="10" height="7" fill="#b3400e" />
    {/* Pad rack inside bay */}
    <path d="M452 116h110v28H452z" fill="#293b45" stroke="#85a3af" strokeWidth="1.5" />
    {['#b29d7e','#e06f36','#dce0e3','#374550','#3d8ec0','#d1a447'].map((color,index) => <circle key={color} cx={466 + index * 16} cy="130" r="7" fill={color} stroke="#b2c6d1" />)}
    {/* Dual DI resin vessels */}
    <path d="M497 246v-59q0-7 13-7t13 7v59Zm34 0v-59q0-7 13-7t13 7v59Z" fill="#3d7394" stroke="#b2e0f0" strokeWidth="1.5" />
    <path d="M510 180v-10h33v10m14 15h13v18" fill="none" stroke="#a2c6d8" strokeWidth="1.5" />
    {/* Tripod inspection lights */}
    <path d="M597 151v66l-16 26m16-26 16 26m7-89v61l-12 25m12-25 19 25m-53-107h20v17h-20zm24-4h19v17h-19Z" fill="none" stroke="var(--reflection)" strokeWidth="1.6" />
    {/* Wheels */}
    {[186, 784].map(x => <g key={x}>
      <circle cx={x} cy="287" r="38" fill="#0f171d" stroke="#899ca8" strokeWidth="1.5" />
      <circle cx={x} cy="287" r="23" fill="#415361" stroke="#c0d0da" strokeWidth="1.5" />
      <circle cx={x} cy="287" r="10" fill="#a8b6c4" stroke="#1f303c" strokeWidth="1.5" />
    </g>)}
    <text x="756" y="224" fill="#13202b" fontFamily="var(--font-display)" fontSize="9.5" letterSpacing="1" textAnchor="middle">MIRROR FINISH</text>
    {!compact && <g fill="currentColor">
      {callouts.map(({ label, sub, x, y, end, top }) => <g key={label}>
        <path d={`M${x} ${y} ${end} ${top ? 62 : 346}h26`} fill="none" stroke="var(--tape)" strokeWidth="1.5" />
        <circle cx={x} cy={y} r="3.5" fill="var(--reflection)" stroke="#081018" strokeWidth="1" />
        <text x={end} y={top ? 41 : 368} fontSize="18" fontWeight="650">{label}</text>
        <text x={end} y={top ? 56 : 385} fontSize="12.5" opacity=".72">{sub}</text>
      </g>)}
    </g>}
  </svg>;
}
