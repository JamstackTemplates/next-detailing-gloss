const bonnet = 'M116 336C192 283 310 255 468 230L690 212C782 235 876 278 954 328L988 462C952 528 812 580 630 578L142 510C88 478 77 408 116 336Z';

export function SwirlField({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor">
    {Array.from({ length: 68 }, (_, index) => {
      const r = 9 + index * 3.1;
      const angle = index * 49 % 360;
      return <path key={index} transform={`rotate(${angle})`}
        d={`M ${r} 0 A ${r} ${r * .62} 0 0 1 ${r * -.76} ${r * .42}`}
        opacity={.2 + (index % 5) * .14} strokeWidth={index % 6 === 0 ? 1.45 : .65} />;
    })}
  </g>;
}

export function HexLights({ className }: { className?: string }) {
  return <g className={className} fill="none" stroke="currentColor" strokeLinejoin="round">
    {[[0,0], [112,0], [224,0], [336,0], [448,0], [560,0], [56,98], [168,98], [280,98], [392,98], [504,98]].map(([x,y]) =>
      <path key={`${x}-${y}`} transform={`translate(${x} ${y})`} d="M0 0 33-55H79L112 0 79 55H33Z" />)}
  </g>;
}

export function Polisher({ transform }: { transform: string }) {
  return <g transform={transform} strokeWidth="1.4" strokeLinejoin="round">
    <path d="M128 24c42-27 70-20 96-6s54 14 82-4" fill="none" stroke="#859bb0" strokeWidth="1.8" />
    <ellipse cx="48" cy="86" rx="47" ry="12" fill="#05070a" opacity=".82" />
    <path d="M3 72h90v12c-14 14-76 14-90-1z" fill="#b3400e" stroke="#ff9f72" />
    <ellipse cx="48" cy="72" rx="45" ry="10" fill="#ed7841" stroke="#ffb894" />
    <ellipse cx="48" cy="70" rx="37" ry="7" fill="#202a33" stroke="#6f8799" />
    <path d="M22 61l6-23h39l9 24c-6 8-46 8-54-1Z" fill="#1e272f" stroke="#99b3c4" />
    <circle cx="46" cy="48" r="5" fill="#10161c" stroke="#7f9cb0" />
    <path d="M17 42C9 31 19 14 35 10l33-2 23 7 46-6 18 6 2 13-68 13-14 8-41 1Z" fill="#2c3842" stroke="#b0cde0" />
    <path d="M23 25l17-8 27-1 16 7 65-8M81 31l66-10M34 44l34-1" fill="none" stroke="#d5f2fc" opacity=".62" />
    <path d="M35 23h25v12H35z" fill="#b3400e" stroke="#ffa57d" />
    <path d="M102 18h18v7h-18z" fill="#161f27" stroke="#7c97a9" />
  </g>;
}

export function ReflectionBay() {
  return <svg className="bay-art" viewBox="0 0 900 690" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A black bonnet under hexagonal inspection lights with a blue tape line and a polisher resting on the wing">
    <defs>
      <linearGradient id="bay-wall" x2=".8" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="#05070a" /><stop offset=".45" stopColor="#142330" /><stop offset="1" stopColor="#05080c" />
      </linearGradient>
      <linearGradient id="bay-coat" x1=".05" y1=".1" x2=".82" y2="1">
        <stop stopColor="#5c6c75" /><stop offset=".19" stopColor="#141f28" /><stop offset=".42" stopColor="#2b4152" /><stop offset=".66" stopColor="#070c11" /><stop offset=".84" stopColor="#1b2a37" /><stop offset="1" stopColor="#05070a" />
      </linearGradient>
      <linearGradient id="bay-wing" x1=".08" y1="0" x2=".68" y2="1">
        <stop stopColor="#4c6170" /><stop offset=".35" stopColor="#121e28" /><stop offset=".58" stopColor="#06080c" /><stop offset=".78" stopColor="#182937" /><stop offset="1" stopColor="#070b0f" />
      </linearGradient>
      <linearGradient id="bay-glass" x1=".1" y1=".03" x2=".76" y2="1">
        <stop stopColor="#436377" /><stop offset=".26" stopColor="#111e29" /><stop offset=".64" stopColor="#05080c" /><stop offset="1" stopColor="#2e495a" />
      </linearGradient>
      <linearGradient id="bay-spec" x1="0" y1="0" x2="1" y2=".35">
        <stop stopColor="#edfbff" stopOpacity=".04" /><stop offset=".55" stopColor="var(--reflection)" stopOpacity=".85" /><stop offset="1" stopColor="#f3fdff" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="bay-hotspot" cx=".34" cy=".54" r=".32">
        <stop stopColor="#e8f7fc" stopOpacity=".36" /><stop offset=".5" stopColor="#9ec2d1" stopOpacity=".14" /><stop offset="1" stopColor="#0b151e" stopOpacity="0" />
      </radialGradient>
      <filter id="bay-bloom"><feGaussianBlur stdDeviation="8" /></filter>
      <filter id="bay-soft"><feGaussianBlur stdDeviation="1.7" /></filter>
      <filter id="bay-flake"><feTurbulence type="fractalNoise" baseFrequency=".84" numOctaves="3" stitchTiles="stitch" /></filter>
      <clipPath id="bay-bonnet"><path d={bonnet} /></clipPath>
      <clipPath id="bay-corrected"><path d="M515 215 1000 200V610H408Z" /></clipPath>
      <clipPath id="bay-uncorrected"><path d="M0 210H515L408 610H0Z" /></clipPath>
    </defs>
    <path d="M0 0h900v690H0z" fill="url(#bay-wall)" />
    <path d="M0 178 900 84v44L0 208ZM0 232 900 151v7L0 239ZM0 296 900 218v4L0 299Z" fill="var(--reflection)" opacity=".09" />
    <g transform="translate(-24 84) skewX(-19) scale(1.46 .64)" color="var(--reflection)">
      <g opacity=".45" strokeWidth="11" filter="url(#bay-bloom)"><HexLights /></g>
      <g opacity=".55" strokeWidth="1.6"><HexLights /></g>
    </g>
    <path d="M0 495 900 284v406H0Z" fill="#080d14" opacity=".82" />
    <ellipse cx="562" cy="614" rx="495" ry="52" fill="#000308" filter="url(#bay-bloom)" />
    {/* Rear A-pillar, side mirror and fender body */}
    <path d="M715 190c30-22 65-25 89-8 14 10 15 28-4 40-26 14-64 11-94-4Z" fill="#182734" stroke="#8aa6ba" strokeWidth="1.5" />
    <path d="M120 348c39-66 112-123 199-170 44-24 134-35 212-32 90 4 148 20 208 53 47 25 82 50 112 80l154 62-14 230c-45 45-132 73-262 81L188 584c-68-18-114-58-121-114-7-40 14-94 53-122Z" fill="url(#bay-wing)" stroke="#a3bcd0" strokeWidth="1.5" />
    <path d="M266 209c49-31 99-45 168-49 121-7 221 20 306 82l-66-13-206 9-283 64c26-33 52-62 81-93Z" fill="url(#bay-glass)" stroke="#95b2c7" strokeWidth="1.5" />
    <path d="M289 206c90-35 201-48 316-18l56 17c-130-27-246-19-371 20Z" fill="var(--reflection)" opacity=".28" />
    <path d="M174 313c40-33 90-61 158-87l-92 19c-47 13-68 25-84 44-10 12-5 23 18 24Z" fill="#16232e" stroke="#99b4c7" strokeWidth="1.5" />
    {/* Main sculpted bonnet */}
    <path d={bonnet} fill="url(#bay-coat)" stroke="#b6cad8" strokeWidth="1.6" />
    <g clipPath="url(#bay-bonnet)">
      {/* Hood power dome crease lines */}
      <path d="M168 364C295 312 466 276 708 248M245 488C432 436 638 398 928 378" fill="none" stroke="#85a6ba" strokeWidth="1.2" opacity=".4" />
      <path d="M56 468c218-62 486-119 912-112l32 42c-388 5-652 60-940 125Z" fill="url(#bay-spec)" opacity=".65" />
      <path d="M70 500c340-76 602-98 906-104M106 526c313-32 608-96 860-80" fill="none" stroke="var(--reflection)" strokeWidth="1.5" opacity=".52" />
      {/* Corrected right side: mirror depth, sharp hex array, clear street sign & desert palm reflection */}
      <g clipPath="url(#bay-corrected)" color="var(--reflection)">
        <path d="M405 205h590v395H405Z" fill="#04080e" opacity=".34" />
        <g transform="translate(285 262) skewX(-28) scale(1.13 .67)" strokeWidth="14" opacity=".76" filter="url(#bay-bloom)"><HexLights /></g>
        <g transform="translate(285 262) skewX(-28) scale(1.13 .67)" strokeWidth="2.6"><HexLights /></g>
        <g transform="translate(285 262) skewX(-28) scale(1.13 .67)" stroke="#ffffff" strokeWidth="1" opacity=".85"><HexLights /></g>
        <g transform="translate(620 452) skewX(-28) scale(1.06 -.6)" opacity=".78">
          <path d="M22-24v88m-40 0h102v28H-18z" stroke="#d5f3fc" strokeWidth="1.8" fill="#2c5361" />
          <text x="-7" y="83" fill="#f3fcff" fontSize="13.5" fontWeight="700" letterSpacing="1.6">MILL AVE</text>
          <path d="M136-10q5 58-9 106m0 0q-27 34-54-5m54 5q14 35 54 19m-54-19q-40 9-56-18m56 18q38 9 60-30m-60 30q-10 38-36 39" fill="none" stroke="#07111a" strokeWidth="3.4" />
        </g>
      </g>
      {/* Uncorrected left side: oxidized grey haze, halogen inspection hotspot, fragmented hex grid & dense spiderweb swirls */}
      <g clipPath="url(#bay-uncorrected)">
        <path d="M78 338c118-96 268-122 436-104l-78 265-350 48Z" fill="#9fb2bd" opacity=".22" />
        <ellipse cx="295" cy="375" rx="220" ry="135" fill="url(#bay-hotspot)" />
        <g transform="translate(8 302) skewX(-25) scale(.93 .55)" strokeWidth="8.5" color="#9ab3bf" opacity=".46" filter="url(#bay-soft)" strokeDasharray="12 10 20 4"><HexLights /></g>
        <g transform="translate(274 370) skewX(-18)" color="#dcebf0" opacity=".76"><SwirlField /></g>
        <g transform="translate(388 302) scale(.52)" color="#dcebf0" opacity=".58"><SwirlField /></g>
        <g transform="translate(178 424) scale(.42)" color="#c8dce3" opacity=".5"><SwirlField /></g>
      </g>
      <path d="M75 220h910v360H75z" filter="url(#bay-flake)" opacity=".14" style={{ mixBlendMode: 'soft-light' }} />
    </g>
    {/* Masking tape line with torn edge and fiber ribs */}
    <path d="M510 217l6 2 5-3 6 3-86 324-6-4-5 5-5-4-7 3Z" fill="var(--tape)" stroke="#ccebff" strokeWidth="1.2" />
    <path d="M516 222 423 538m95-310-90 306" stroke="#e4f4ff" opacity=".42" strokeDasharray="1 3 7 1" />
    {/* In-bay instrument callout badges on the bonnet */}
    <g transform="translate(170 280)" aria-hidden="true">
      <rect width="136" height="33" rx="4" fill="#09121ae6" stroke="#7c98ab" strokeWidth="1.2" />
      <text x="10" y="13" fill="#aebec9" fontSize="8.5" fontWeight="650" letterSpacing="1.3">BEFORE · SWIRLS</text>
      <text x="10" y="26.5" fill="#dce7ee" fontFamily="var(--font-display)" fontSize="10.5">38 GU · 128 µm</text>
    </g>
    <g transform="translate(550 248)" aria-hidden="true">
      <rect width="142" height="33" rx="4" fill="#07131ce6" stroke="var(--reflection)" strokeWidth="1.2" />
      <text x="10" y="13" fill="var(--reflection)" fontSize="8.5" fontWeight="650" letterSpacing="1.3">AFTER · 2-STEP</text>
      <text x="10" y="26.5" fill="#ffffff" fontFamily="var(--font-display)" fontSize="10.5">91 GU · 122 µm</text>
    </g>
    {/* Front headlamps, DRL blades & splitter */}
    <path d="M104 437c39 24 116 41 212 53l-16 32c-80 1-147-11-197-37l-12-20Z" fill="#102230" stroke="#b4cfe0" strokeWidth="1.5" />
    <path d="M104 446c50 22 118 37 197 50l-8 9c-68-2-134-14-192-38Z" fill="#d2f8ff" />
    <path d="M590 547c126-7 267-40 370-92l-17 52c-89 57-239 85-365 81Z" fill="#09141e" stroke="#89a8bd" strokeWidth="1.5" />
    <path d="M607 554c123-13 250-42 342-88l-8 18c-80 43-221 74-337 84Z" fill="var(--reflection)" filter="url(#bay-bloom)" />
    <path d="M607 554c123-13 250-42 342-88l-8 10c-80 44-221 75-337 87Z" fill="#daf8ff" />
    <path d="M170 552c201 54 414 73 584 62l-82 24-441-51Z" fill="#0d1720" stroke="#687c8b" strokeWidth="1.5" />
    <Polisher transform="translate(708 212) rotate(8) scale(1.12)" />
  </svg>;
}
