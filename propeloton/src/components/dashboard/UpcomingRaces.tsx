import Link from 'next/link';
import { MapPin, Users, ChevronRight } from 'lucide-react';
import { Race } from '@/types';
import { formatDateRange, uciCategoryLabel, uciCategoryColor, flagEmoji, daysUntil } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface UpcomingRacesProps {
  races: Race[];
  locale: string;
  title: string;
}

export function UpcomingRaces({ races, locale, title }: UpcomingRacesProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {title}
        </h2>
        <Link
          href={`/${locale}/calendar`}
          className="text-xs font-medium transition-opacity hover:opacity-80"
          style={{ color: 'var(--accent)' }}
        >
          View all
        </Link>
      </div>

      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {races.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
            No upcoming races
          </div>
        ) : (
          races.map((race) => {
            const days = daysUntil(race.startDate);
            return (
              <Link
                key={race.id}
                href={`/${locale}/calendar/${race.id}`}
                className="flex items-center gap-4 px-5 py-4 transition-all hover:opacity-90 group"
                style={{ background: 'transparent' }}
              >
                {/* Countdown */}
                <div className="w-12 text-center shrink-0">
                  {days >= 0 ? (
                    <>
                      <div className="text-lg font-bold leading-none" style={{ color: 'var(--accent)' }}>
                        {days}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                        {days === 1 ? 'day' : 'days'}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                      Past
                    </div>
                  )}
                </div>

                {/* Race info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                      {race.name}
                    </span>
                    <span
                      className={cn('text-xs px-1.5 py-0.5 rounded border font-medium', uciCategoryColor(race.uciCategory))}
                    >
                      {uciCategoryLabel(race.uciCategory)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {flagEmoji(race.countryCode)} {race.country}
                    </span>
                    <span>{formatDateRange(race.startDate, race.endDate)}</span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {race.assignedRiderIds.length}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  size={14}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--muted)' }}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
