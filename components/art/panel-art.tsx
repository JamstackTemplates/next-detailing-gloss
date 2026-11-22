import { useId } from 'react';
import { HexLights, Polisher, SwirlField } from './reflection-bay';

export function PanelArt({ paint, corrected, interior = false, variant = 0 }: {
  paint: string; corrected: boolean; interior?: boolean; variant?: number;
}) {
  const id = useId();
  const silhouette = 'M-30 104Q144 45 334 34T808 35l16 276H-30Z';
  return <svg viewBox="0 0 800 360" preserveAspectRatio="xMidYMid slice" className="absolute size-full" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-coat`} x1=".1" y1="0" x2=".64" y2="1">
        <stop stopColor="#9abbc9" /><stop offset=".24" stopColor={paint} /><stop offset=".54" stopColor="#060b10" />
        <stop offset=".75" stopColor={paint} /><stop offset="1" stopColor="#05080c" />
      </linearGradient>
      <linearGradient id={`${id}-bar`}>
        <stop stopColor="var(--reflection)" stopOpacity="0" /><stop offset=".62" stopColor="var(--reflection)" stopOpacity=".88" /><stop offset="1" stopColor="var(--reflection)" stopOpacity=".06" />
      </linearGradient>
      <radialGradient id={`${id}-spot`} cx=".32" cy=".5" r=".36">
        <stop stopColor="#eaf7fc" stopOpacity=".28" /><stop offset=".6" stopColor="#9ab6c4" stopOpacity=".1" /><stop offset="1" stopColor="#0b1118" stopOpacity="0" />
      </radialGradient>
      <clipPath id={`${id}-skin`}><path d={silhouette} /></clipPath>
      <filter id={`${id}-blur`}><feGaussianBlur stdDeviation={corrected ? 6.5 : 3} /></filter>
      <filter id={`${id}-flake`}><feTurbulence type="fractalNoise" baseFrequency=".86" numOctaves="3" stitchTiles="stitch" /></filter>
    </defs>
    <path d="M0 0h800v360H0Z" fill="#090e15" />
    {interior ? <g transform="translate(88 8)">
      {[0, 354].map(x => <g key={x} transform={`translate(${x} 0)`}>
        <path d="M49 110q-23-27 0-55l33-4 3-22q3-13 15-14h57q12 0 16 14l3 23 28 6q26 21 7 55l-6 105 37 35q10 14 5 42-4 28-28 32H43q-36-8-34-44 0-19 14-28l33-26Z" fill={`url(#${id}-coat)`} stroke="#9eb2bf" strokeWidth="1.5" />
        <path d="M80 70q47 12 95 0l12 131q-58 30-113 2Zm-19 173q63-27 144-5l18 47q-88 28-186 0Z" fill={paint} stroke="#a6b9c4" strokeDasharray="3 3" strokeWidth="1.5" />
        <path d="M86 109h81m-79 23h81m-80 23h80m-80 23h86M59 257q65-10 132-2m-143 18q78-12 153 0" fill="none" stroke="#899fab" opacity=".6" />
        {!corrected && Array.from({ length: 32 }, (_, i) => <ellipse key={i} cx={62 + i * 29 % 138} cy={100 + i * 47 % 175} rx={3 + i % 7} ry={2 + i % 4} fill="#d8b996" opacity={.18 + i % 4 * .09} />)}
      </g>)}
    </g> : <>
      <path d={silhouette} fill={`url(#${id}-coat)`} stroke="#b2cbd8" strokeWidth="1.5" />
      <g clipPath={`url(#${id}-skin)`}>
        <path d="M-12 192Q338 92 818 104" fill="none" stroke="#85a6ba" strokeWidth="1" opacity=".35" />
        <path d="M-10 228Q348 101 826 115l8 19Q400 145-15 260Z" fill={`url(#${id}-bar)`} opacity={corrected ? '.9' : '.36'} />
        <path d="M-13 245Q362 139 828 136M0 281Q424 183 807 177" stroke="var(--reflection)" fill="none" opacity={corrected ? '.52' : '.3'} strokeWidth="1.35" />
        <g transform={`translate(${40 - variant * 11} ${113 + variant * 7}) skewX(${-27 + variant * 3}) scale(1.38 .68)`} color="var(--reflection)">
          <g filter={`url(#${id}-blur)`} opacity={corrected ? '.72' : '.34'} strokeWidth={corrected ? '14' : '8'}><HexLights /></g>
          <g strokeWidth={corrected ? '2.5' : '1.4'} opacity={corrected ? '1' : '.38'} strokeDasharray={corrected ? undefined : '12 9 2 4 24 14'}><HexLights /></g>
          {corrected && <g stroke="#ffffff" strokeWidth=".9" opacity=".82"><HexLights /></g>}
        </g>
        {corrected ? <g transform="translate(502 246) skewX(-27) scale(1.04 -.68)" opacity=".84">
          <path d="M43-20v89M-5 69h114v27H-5Z" fill="#2b5260" stroke="#d5f3fc" strokeWidth="1.6" />
          <text x="5" y="87" fill="#f3fcff" fontSize="14" fontWeight="700" letterSpacing="2">MILL AVE</text>
          <path d="M132-8q4 46-7 85m0 0q-20 26-41-4m41 4q10 26 40 14m-40-14q-30 7-42-13" fill="none" stroke="#07131d" strokeWidth="2.6" />
        </g> : <>
          <path d="M0 0h800v360H0Z" fill="#90a4b0" opacity=".11" />
          <ellipse cx="246" cy="176" rx="220" ry="132" fill={`url(#${id}-spot)`} />
          <g color="#e4eef4" opacity=".76"><SwirlField x={224} y={160} /><g transform="translate(522 178) scale(.64)"><SwirlField /></g></g>
        </>}
        <path d="M0 0h800v360H0Z" filter={`url(#${id}-flake)`} opacity=".12" style={{ mixBlendMode: 'soft-light' }} />
      </g>
      <path d="M-30 309C194 314 522 284 830 243l-2 51C516 342 189 355-30 350Z" fill="#121f2a" stroke="#6c889b" strokeWidth="1.5" />
      <path d="M-10 322c275 7 564-28 835-74" fill="none" stroke="var(--reflection)" opacity=".5" strokeWidth="1.5" />
    </>}
  </svg>;
}

export function BurnThrough() {
  return <svg viewBox="0 0 1000 320" className="block w-full" role="img" aria-label="Polisher lifted above a bodywork edge worn down to grey primer">
    <defs><linearGradient id="burn-sheen"><stop stopColor="#080d14" /><stop offset=".48" stopColor="#354e5e" /><stop offset=".7" stopColor="#0e1720" /><stop offset="1" stopColor="#06090e" /></linearGradient></defs>
    <path d="M-10 168Q298 80 621 84T1010 154v166H-10Z" fill="url(#burn-sheen)" stroke="#98b6c8" strokeWidth="1.5" />
    <path d="M0 216Q322 127 711 135t289 40M0 244q378-105 738-81t273 37" fill="none" stroke="var(--reflection)" strokeWidth="1.5" opacity=".72" />
    <path d="M294 236c82-22 226-34 254-22l-13 6 28 4-45 6 20 5c-55 19-212 35-238 18l14-4-25-4Z" fill="#7a848d" stroke="#f0a07c" strokeWidth="1.3" />
    <path d="M312 239c68-16 188-26 212-16l-10 5 20 3-34 5c-44 13-168 25-188 12Z" fill="#b4bcc4" stroke="#e4eaf0" strokeWidth="1.2" />
    <path d="M310 265q164-14 256-46" fill="none" stroke="#d4dbe2" opacity=".55" />
    <Polisher transform="translate(361 52) rotate(-12) scale(1.45)" />
  </svg>;
}
