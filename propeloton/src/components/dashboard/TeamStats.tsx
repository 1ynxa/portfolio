import { Users, CalendarDays, Wrench, TrendingUp } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ElementType;
  sub?: string;
  accent?: boolean;
}

interface TeamStatsProps {
  riderCount: number;
  staffCount: number;
  racesThisMonth: number;
  equipmentCount: number;
  labels: {
    riders: string;
    staff: string;
    racesThisMonth: string;
    equipmentItems: string;
  };
}

export function TeamStats({ riderCount, staffCount, racesThisMonth, equipmentCount, labels }: TeamStatsProps) {
  const stats: Stat[] = [
    { label: labels.riders, value: riderCount, icon: Users, sub: 'active on roster' },
    { label: labels.staff, value: staffCount, icon: TrendingUp, sub: 'DS, mechanics, medical' },
    { label: labels.racesThisMonth, value: racesThisMonth, icon: CalendarDays, sub: 'March 2026', accent: true },
    { label: labels.equipmentItems, value: equipmentCount, icon: Wrench, sub: 'bikes, wheels, parts' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map(({ label, value, icon: Icon, sub, accent }) => (
        <div
          key={label}
          className="rounded-xl p-4"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: accent ? 'rgba(22,163,74,0.15)' : 'rgba(139,149,168,0.1)' }}
            >
              <Icon size={16} style={{ color: accent ? 'var(--accent)' : 'var(--muted)' }} />
            </div>
          </div>
          <div className="text-2xl font-bold mb-0.5" style={{ color: 'var(--foreground)' }}>
            {value}
          </div>
          <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--foreground)' }}>
            {label}
          </div>
          {sub && (
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              {sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
