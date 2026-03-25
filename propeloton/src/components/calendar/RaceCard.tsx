import Link from 'next/link';
import { MapPin, Users, Mountain, Route } from 'lucide-react';
import { Race } from '@/types';
import { formatDateRange, uciCategoryLabel, uciCategoryColor, flagEmoji, statusColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface RaceCardProps {
  race: Race;
  locale: string;
}

export function RaceCard({ race, locale }: RaceCardProps) {
  return (
    <Link
      href={`/${locale}/calendar/${race.id}`}
      className="block rounded-xl p-4 transition-all hover:scale-[1.01]"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate mb-1" style={{ color: 'var(--foreground)' }}>
            {flagEmoji(race.countryCode)} {race.name}
          </div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            {formatDateRange(race.startDate, race.endDate)}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={cn('text-xs px-1.5 py-0.5 rounded border font-medium', uciCategoryColor(race.uciCategory))}>
            {uciCategoryLabel(race.uciCategory)}
          </span>
          <span className={cn('text-xs px-1.5 py-0.5 rounded font-medium', statusColor(race.status))}>
            {race.status}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
        <span className="flex items-center gap-1">
          <MapPin size={11} />
          {race.stageCount} {race.stageCount === 1 ? 'stage' : 'stages'}
        </span>
        {race.distance && (
          <span className="flex items-center gap-1">
            <Route size={11} />
            {race.distance.toLocaleString()} km
          </span>
        )}
        {race.elevation && (
          <span className="flex items-center gap-1">
            <Mountain size={11} />
            {race.elevation.toLocaleString()} m
          </span>
        )}
        <span className="flex items-center gap-1 ml-auto">
          <Users size={11} />
          {race.assignedRiderIds.length} riders
        </span>
      </div>
    </Link>
  );
}
