'use client';

import { useEffect, useState } from 'react';
import { crewOpeningLabels, openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';
import { Icon } from './art/icons';

export function OpenBadge({ hours, summary, alwaysShowSchedule = false }: {
  hours: readonly OpeningHours[]; summary: string; alwaysShowSchedule?: boolean;
}) {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone, new Date(), crewOpeningLabels));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);
  return <>
    {alwaysShowSchedule && <p className="text-sm text-muted">{summary}</p>}
    {(!alwaysShowSchedule || label) && <span className={`open-status ${alwaysShowSchedule ? 'mt-2' : ''}`}>
      <Icon name="calendar" className="size-4" />{label ?? summary}
    </span>}
  </>;
}
