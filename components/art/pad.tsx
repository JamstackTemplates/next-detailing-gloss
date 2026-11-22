import { useId } from 'react';
import type { Pad as PadColor } from '../../content/packages.ts';

export const padColors: Record<PadColor, [string, string, string]> = {
  blue: ['#3D8EC0', '#79BFE8', '#10334A'],
  gold: ['#D1A447', '#F2D58C', '#563D17'],
  white: ['#DCE0E3', '#F7F8F9', '#57626E'],
  orange: ['#E06F36', '#FFB07B', '#6A210C'],
  wool: ['#B29D7E', '#F1E7D2', '#493A2C'],
  black: ['#374550', '#7E919E', '#121920'],
};

export function Pad({ color }: { color: PadColor }) {
  const id = useId();
  const [face, edge, backing] = padColors[color];
  return <svg viewBox="0 0 120 120" aria-hidden="true" className="rack-pad">
    <defs>
      <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(24)">
        {color === 'wool' ? <path d="M-2 9Q5-3 7 3T13 5M-2 4Q2 1 5 7T11 8" fill="none" stroke={edge} strokeWidth="1.15" />
          : <><path d="M0 0h10v10H0z" fill="none" stroke={edge} strokeWidth=".85" /><circle cx="5" cy="5" r="1.6" fill={backing} /></>}
      </pattern>
      <radialGradient id={`${id}-depth`} cx=".36" cy=".32" r=".68">
        <stop stopColor={edge} stopOpacity=".42" />
        <stop offset=".65" stopColor={face} stopOpacity="0" />
        <stop offset="1" stopColor={backing} stopOpacity=".55" />
      </radialGradient>
    </defs>
    {/* Backing plate & shadow rim */}
    <circle cx="60" cy="64" r="54" fill={backing} stroke="#7f909b" strokeWidth="1.5" />
    {/* Beveled foam pad face */}
    <circle cx="60" cy="58" r="51" fill={face} stroke={edge} strokeWidth="1.6" />
    <circle cx="60" cy="58" r="51" fill={`url(#${id}-depth)`} />
    {/* Hook-and-loop outer seam & heat-relief cut */}
    <circle cx="60" cy="58" r="45.5" fill="none" stroke={backing} strokeWidth="1.3" strokeDasharray="2 2.5" />
    <circle cx="60" cy="58" r="42.5" fill={`url(#${id})`} opacity=".72" />
    <circle cx="60" cy="58" r="24" fill="none" stroke={backing} strokeWidth=".9" opacity=".45" strokeDasharray="4 4" />
    {/* Center cooling arbor hole */}
    <circle cx="60" cy="58" r="11.5" fill={backing} stroke={edge} strokeWidth="1.3" />
    <circle cx="60" cy="58" r="6.5" fill="#0d1318" stroke={backing} strokeWidth="1" />
    {/* Specular rim highlight */}
    <path d="M18 55A42 42 0 0 1 74 17" stroke={edge} opacity=".88" fill="none" strokeWidth="1.6" strokeLinecap="round" />
  </svg>;
}
