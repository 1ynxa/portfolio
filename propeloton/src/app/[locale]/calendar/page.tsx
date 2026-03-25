import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { races } from '@/lib/mock-data/races';
import { RaceCard } from '@/components/calendar/RaceCard';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CalendarPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('calendar');

  const sorted = [...races].sort((a, b) => a.startDate.localeCompare(b.startDate));

  // Group by month
  const grouped: Record<string, typeof races> = {};
  for (const race of sorted) {
    const month = new Date(race.startDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(race);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
            {t('title')}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {races.length} races · 2026 season
          </p>
        </div>
        <Link
          href={`/${locale}/calendar/new`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: 'var(--accent)' }}
        >
          <Plus size={15} />
          {t('newRace')}
        </Link>
      </div>

      {/* Race groups by month */}
      <div className="space-y-8">
        {Object.entries(grouped).map(([month, monthRaces]) => (
          <section key={month}>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
              {month}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {monthRaces.map(race => (
                <RaceCard key={race.id} race={race} locale={locale} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
