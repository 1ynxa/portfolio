import { getTranslations } from 'next-intl/server';
import { races } from '@/lib/mock-data/races';
import { roster } from '@/lib/mock-data/roster';
import { equipment } from '@/lib/mock-data/equipment';
import { recentActivity } from '@/lib/mock-data/activity';
import { TeamStats } from '@/components/dashboard/TeamStats';
import { UpcomingRaces } from '@/components/dashboard/UpcomingRaces';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('dashboard');
  const ts = await getTranslations('dashboard.stats');

  const today = new Date().toISOString().split('T')[0];
  const upcoming = races
    .filter(r => r.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 6);

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const racesThisMonth = races.filter(r => {
    const d = new Date(r.startDate);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  const riders = roster.filter(m => m.role === 'rider');
  const staff = roster.filter(m => m.role !== 'rider');

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
          {t('title')}
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {t('subtitle')}
        </p>
      </div>

      {/* KPI strip */}
      <TeamStats
        riderCount={riders.length}
        staffCount={staff.length}
        racesThisMonth={racesThisMonth}
        equipmentCount={equipment.length}
        labels={{
          riders: ts('riders'),
          staff: ts('staff'),
          racesThisMonth: ts('racesThisMonth'),
          equipmentItems: ts('equipmentItems'),
        }}
      />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <UpcomingRaces
            races={upcoming}
            locale={locale}
            title={t('upcomingRaces')}
          />
        </div>
        <div>
          <RecentActivity
            items={recentActivity}
            title={t('recentActivity')}
          />
        </div>
      </div>
    </div>
  );
}
