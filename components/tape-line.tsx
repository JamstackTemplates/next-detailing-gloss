'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import type { Result } from '../content/results';
import { PanelArt } from './art/panel-art';
import { GaugeReadout } from './gauge';

type TapeProps = { shot: Result; interior: boolean; compact?: boolean; variant?: number };

function TapePanel({ shot, interior, compact, variant, split, onMove }: TapeProps & {
  split: number; onMove?: (split: number) => void;
}) {
  return <div className={`tape-panel ${compact ? 'tape-panel-small' : ''}`} style={{ '--split': `${split}%` } as CSSProperties}>
    <PanelArt paint={shot.paint} corrected interior={interior} variant={variant} />
    <div className="absolute inset-0 tape-before">
      <PanelArt paint={shot.paint} corrected={false} interior={interior} variant={variant} />
    </div>
    <span className="tape-seam" aria-hidden="true" />
    <div className="tape-gauges">
      {shot.gloss ? <>
        <GaugeReadout label="Before · gloss">{shot.gloss.before} GU</GaugeReadout>
        <GaugeReadout label="After · gloss">{shot.gloss.after} GU</GaugeReadout>
      </> : <><span className="gauge">Before</span><span className="gauge">After</span></>}
    </div>
    {onMove && <input className="tape-range" type="range" min="0" max="100" value={split}
      aria-label="Move the tape line" aria-valuetext={`${100 - split}% after${shot.gloss ? `, ${shot.gloss.after} GU` : ''}`}
      onChange={event => onMove(event.currentTarget.valueAsNumber)} />}
  </div>;
}

export function TapeLine(props: TapeProps) {
  return <TapePanel {...props} split={50} />;
}

export function InteractiveTapeLine(props: TapeProps) {
  const [split, setSplit] = useState(50);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <TapePanel {...props} split={split} onMove={ready ? setSplit : undefined} />;
}
