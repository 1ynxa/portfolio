import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { AlertTriangle } from 'lucide-react';
import { roster } from '@/lib/mock-data/roster';
import { flagEmoji, statusColor, isExpiringSoon, isExpired, formatDate, cn } from '@/lib/utils';
import type { MemberRole } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

const ROLE_LABELS: Record<MemberRole, string> = {
  rider: 'Rider',
  ds: 'Directeur Sportif',
  mechanic: 'Mechanic',
  doctor: 'Doctor',
  soigneur: 'Soigneur',
  coach: 'Coach',
  manager: 'Manager',
};

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#d97706', '#059669', '#0891b2'];
function avatarColor(id: string): string {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

export default async function RosterPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('roster');

  const riders = roster.filter(m => m.role === 'rider');
  const staff = roster.filter(m => m.role !== 'rider');

  const alertCount = roster.filter(m =>
    isExpiringSoon(m.licenseExpiry) || isExpiringSoon(m.passportExpiry) ||
    isExpired(m.licenseExpiry) || isExpired(m.passportExpiry)
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
            {t('title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {riders.length} riders · {staff.length} staff
          </p>
        </div>
        {alertCount > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(234,179,8,0.15)', color: '#eab308', border: '1px solid rgba(234,179,8,0.3)' }}
          >
            <AlertTriangle size={13} />
            {alertCount} document{alertCount > 1 ? 's' : ''} expiring
          </div>
        )}
      </div>

      {/* Riders */}
      <section className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
          {t('riders')} ({riders.length})
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <Th>Rider</Th>
                <Th>Nationality</Th>
                <Th>Specialties</Th>
                <Th>UCI Rank</Th>
                <Th>Status</Th>
                <Th>License</Th>
                <Th>Contract</Th>
              </tr>
            </thead>
            <tbody>
              {riders.map((member, i) => {
                const licenseWarn = isExpiringSoon(member.licenseExpiry);
                const licenseExp = isExpired(member.licenseExpiry);
                return (
                  <tr
                    key={member.id}
                    style={{ borderBottom: i < riders.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/${locale}/roster/${member.id}`}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: avatarColor(member.id) }}
                        >
                          {member.firstName[0]}{member.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: 'var(--foreground)' }}>
                            {member.firstName} {member.lastName}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <Td>{flagEmoji(member.countryCode)} {member.nationality}</Td>
                    <Td>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties?.map(s => (
                          <span
                            key={s}
                            className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(139,149,168,0.12)', color: 'var(--muted)' }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </Td>
                    <Td>
                      {member.uciRanking ? (
                        <span className="font-mono text-xs" style={{ color: 'var(--foreground)' }}>
                          #{member.uciRanking}
                        </span>
                      ) : '—'}
                    </Td>
                    <Td>
                      <span className={cn('text-xs px-2 py-0.5 rounded font-medium', statusColor(member.status))}>
                        {member.status}
                      </span>
                    </Td>
                    <Td>
                      <span
                        className="text-xs font-medium"
                        style={{ color: licenseExp ? '#ef4444' : licenseWarn ? '#eab308' : 'var(--muted)' }}
                      >
                        {licenseExp && <AlertTriangle size={11} className="inline mr-1" />}
                        {formatDate(member.licenseExpiry)}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>
                        until {formatDate(member.contractEnd)}
                      </span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Staff */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
          {t('staff')} ({staff.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {staff.map(member => (
            <Link
              key={member.id}
              href={`/${locale}/roster/${member.id}`}
              className="flex items-center gap-3 p-4 rounded-xl transition-all hover:opacity-80"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: '#6366f1' }}
              >
                {member.firstName[0]}{member.lastName[0]}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  {member.firstName} {member.lastName}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>
                  {ROLE_LABELS[member.role]} · {flagEmoji(member.countryCode)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-medium" style={{ color: 'var(--muted)' }}>
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-5 py-3 text-sm" style={{ color: 'var(--muted)' }}>
      {children}
    </td>
  );
}
