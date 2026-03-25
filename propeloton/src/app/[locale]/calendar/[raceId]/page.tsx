import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Route, Mountain, Users, Calendar } from 'lucide-react';
import { races } from '@/lib/mock-data/races';
import { roster } from '@/lib/mock-data/roster';
import { formatDateRange, uciCategoryLabel, uciCategoryColor, flagEmoji, statusColor, cn } from '@/lib/utils';

interface Props {
  params: Promise<{ locale: string; raceId: string }>;
}

export default async function RaceDetailPage({ params }: Props) {
  const { locale, raceId } = await params;
  const race = races.find(r => r.id === raceId);
  if (!race) notFound();

  const assignedRiders = roster.filter(m => race.assignedRiderIds.includes(m.id));
  const assignedStaff = roster.filter(m => race.assignedStaffIds.includes(m.id));

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/${locale}/calendar`}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <ArrowLeft size={15} />
        </Link>
        <div>
          <h1 className="text-xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>
            {flagEmoji(race.countryCode)} {race.name}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {formatDateRange(race.startDate, race.endDate)}
          </p>
        </div>

        <div className="ml-auto flex gap-2">
          <span className={cn('text-xs px-2 py-1 rounded border font-medium', uciCategoryColor(race.uciCategory))}>
            {uciCategoryLabel(race.uciCategory)}
          </span>
          <span className={cn('text-xs px-2 py-1 rounded font-medium', statusColor(race.status))}>
            {race.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Race details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats card */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
              Race Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat icon={Calendar} label="Stages" value={race.stageCount.toString()} />
              {race.distance && <Stat icon={Route} label="Distance" value={`${race.distance.toLocaleString()} km`} />}
              {race.elevation && <Stat icon={Mountain} label="Elevation" value={`${race.elevation.toLocaleString()} m`} />}
              <Stat icon={MapPin} label="Country" value={`${flagEmoji(race.countryCode)} ${race.country}`} />
            </div>
            {race.description && (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {race.description}
              </p>
            )}
          </div>

          {/* Assigned Riders */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                <Users size={14} />
                Assigned Riders
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(22,163,74,0.15)', color: 'var(--accent)' }}
                >
                  {assignedRiders.length}
                </span>
              </h2>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {assignedRiders.map(rider => (
                <Link
                  key={rider.id}
                  href={`/${locale}/roster/${rider.id}`}
                  className="flex items-center gap-4 px-5 py-3 transition-all hover:opacity-80"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: getAvatarColor(rider.id) }}
                  >
                    {rider.firstName[0]}{rider.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {rider.firstName} {rider.lastName}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>
                      {flagEmoji(rider.countryCode)} {rider.nationality}
                      {rider.specialties && ` · ${rider.specialties.join(', ')}`}
                    </div>
                  </div>
                  {rider.uciRanking && (
                    <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                      #{rider.uciRanking}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Staff sidebar */}
        <div
          className="rounded-xl overflow-hidden h-fit"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <div
            className="px-5 py-4"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Staff
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {assignedStaff.map(member => (
              <div key={member.id} className="flex items-center gap-3 px-5 py-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: '#6366f1' }}
                >
                  {member.firstName[0]}{member.lastName[0]}
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-xs capitalize" style={{ color: 'var(--muted)' }}>
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--muted)' }}>
        <Icon size={12} />
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
        {value}
      </div>
    </div>
  );
}

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#d97706', '#059669', '#0891b2'];
function getAvatarColor(id: string): string {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}
