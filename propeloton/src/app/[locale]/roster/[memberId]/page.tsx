import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Mail, Phone, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { roster } from '@/lib/mock-data/roster';
import { races } from '@/lib/mock-data/races';
import { formatDate, flagEmoji, statusColor, isExpiringSoon, isExpired, cn } from '@/lib/utils';
import type { MemberRole } from '@/types';

interface Props {
  params: Promise<{ locale: string; memberId: string }>;
}

const ROLE_LABELS: Record<MemberRole, string> = {
  rider: 'Rider', ds: 'Directeur Sportif', mechanic: 'Mechanic',
  doctor: 'Doctor', soigneur: 'Soigneur', coach: 'Coach', manager: 'Manager',
};

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#d97706', '#059669', '#0891b2'];
function avatarColor(id: string) {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

export default async function MemberDetailPage({ params }: Props) {
  const { locale, memberId } = await params;
  const member = roster.find(m => m.id === memberId);
  if (!member) notFound();

  const memberRaces = races.filter(r =>
    r.assignedRiderIds.includes(member.id) || r.assignedStaffIds.includes(member.id)
  ).sort((a, b) => a.startDate.localeCompare(b.startDate));

  const docs = [
    { label: 'UCI License', expiry: member.licenseExpiry },
    { label: 'Passport', expiry: member.passportExpiry },
    { label: 'Contract', expiry: member.contractEnd },
  ];

  return (
    <div className="max-w-4xl">
      {/* Back button */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/${locale}/roster`}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <ArrowLeft size={15} />
        </Link>
        <span className="text-sm" style={{ color: 'var(--muted)' }}>Team Roster</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main profile */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile header */}
          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                style={{ background: member.role === 'rider' ? avatarColor(member.id) : '#6366f1' }}
              >
                {member.firstName[0]}{member.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                  {member.firstName} {member.lastName}
                </h1>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>
                    {ROLE_LABELS[member.role]}
                  </span>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>
                    {flagEmoji(member.countryCode)} {member.nationality}
                  </span>
                  <span className={cn('text-xs px-2 py-0.5 rounded font-medium', statusColor(member.status))}>
                    {member.status}
                  </span>
                </div>
                {member.specialties && (
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map(s => (
                      <span
                        key={s}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: 'rgba(22,163,74,0.12)', color: 'var(--accent)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {member.uciRanking && (
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold font-mono" style={{ color: 'var(--foreground)' }}>
                    #{member.uciRanking}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>UCI Rank</div>
                </div>
              )}
            </div>

            <div
              className="grid grid-cols-2 gap-4 mt-5 pt-5"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <ContactItem icon={Mail} value={member.email} />
              <ContactItem icon={Phone} value={member.phone} />
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Date of Birth</div>
                <div className="text-sm" style={{ color: 'var(--foreground)' }}>
                  {formatDate(member.dateOfBirth)}
                </div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Contract Period</div>
                <div className="text-sm" style={{ color: 'var(--foreground)' }}>
                  {formatDate(member.contractStart)} – {formatDate(member.contractEnd)}
                </div>
              </div>
            </div>
          </div>

          {/* Assigned races */}
          {memberRaces.length > 0 && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <div
                className="flex items-center gap-2 px-5 py-4"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <Calendar size={14} style={{ color: 'var(--muted)' }} />
                <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  Assigned Races ({memberRaces.length})
                </h2>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {memberRaces.map(race => (
                  <Link
                    key={race.id}
                    href={`/${locale}/calendar/${race.id}`}
                    className="flex items-center justify-between px-5 py-3 hover:opacity-80 transition-opacity"
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {flagEmoji(race.countryCode)} {race.name}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>
                        {formatDate(race.startDate)}
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ background: 'rgba(139,149,168,0.12)', color: 'var(--muted)' }}
                    >
                      {race.uciCategory}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Documents sidebar */}
        <div className="space-y-4">
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
          >
            <div
              className="px-5 py-4"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Documents
              </h2>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {docs.map(({ label, expiry }) => {
                const expired = isExpired(expiry);
                const expiring = isExpiringSoon(expiry);
                return (
                  <div key={label} className="px-5 py-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                        {label}
                      </span>
                      {expired ? (
                        <AlertTriangle size={13} style={{ color: '#ef4444' }} />
                      ) : expiring ? (
                        <AlertTriangle size={13} style={{ color: '#eab308' }} />
                      ) : (
                        <CheckCircle size={13} style={{ color: 'var(--accent)' }} />
                      )}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: expired ? '#ef4444' : expiring ? '#eab308' : 'var(--foreground)' }}
                    >
                      {formatDate(expiry)}
                    </div>
                    {expiring && !expired && (
                      <div className="text-xs mt-0.5" style={{ color: '#eab308' }}>
                        Expiring soon
                      </div>
                    )}
                    {expired && (
                      <div className="text-xs mt-0.5" style={{ color: '#ef4444' }}>
                        Expired
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--muted)' }}>
        <Icon size={12} />
        <span className="text-xs">Contact</span>
      </div>
      <div className="text-sm" style={{ color: 'var(--foreground)' }}>{value}</div>
    </div>
  );
}
