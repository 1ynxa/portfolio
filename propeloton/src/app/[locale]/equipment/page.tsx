import Link from 'next/link';
import { Plus, AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { equipment } from '@/lib/mock-data/equipment';
import { roster } from '@/lib/mock-data/roster';
import { formatDate, conditionColor, cn } from '@/lib/utils';
import type { EquipmentType } from '@/types';

interface Props {
  params: Promise<{ locale: string }>;
}

const TYPE_LABELS: Record<EquipmentType, string> = {
  road_bike: 'Road Bike',
  tt_bike: 'TT Bike',
  wheel: 'Wheel Set',
  component: 'Component',
  clothing: 'Clothing',
};

const TYPE_ORDER: EquipmentType[] = ['road_bike', 'tt_bike', 'wheel', 'component', 'clothing'];

export default async function EquipmentPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('equipment');

  const memberMap = Object.fromEntries(roster.map(m => [m.id, m]));
  const needsService = equipment.filter(e => e.condition === 'needs-service');

  // Group by type
  const grouped: Partial<Record<EquipmentType, typeof equipment>> = {};
  for (const item of equipment) {
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type]!.push(item);
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
            {equipment.length} items
          </p>
        </div>
        <div className="flex items-center gap-3">
          {needsService.length > 0 && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(234,179,8,0.15)', color: '#eab308', border: '1px solid rgba(234,179,8,0.3)' }}
            >
              <AlertTriangle size={13} />
              {needsService.length} need service
            </div>
          )}
          <Link
            href={`/${locale}/equipment/new`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <Plus size={15} />
            {t('addItem')}
          </Link>
        </div>
      </div>

      {/* Grouped tables */}
      <div className="space-y-6">
        {TYPE_ORDER.filter(type => grouped[type]?.length).map(type => (
          <section key={type}>
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
              {TYPE_LABELS[type]} ({grouped[type]!.length})
            </h2>
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <Th>Item</Th>
                    <Th>Serial No.</Th>
                    <Th>Assigned To</Th>
                    <Th>Condition</Th>
                    <Th>Last Service</Th>
                    {type === 'road_bike' || type === 'tt_bike' || type === 'wheel' ? <Th>Weight</Th> : null}
                  </tr>
                </thead>
                <tbody>
                  {grouped[type]!.map((item, i) => {
                    const assignee = item.assignedTo ? memberMap[item.assignedTo] : null;
                    const showWeight = type === 'road_bike' || type === 'tt_bike' || type === 'wheel';
                    return (
                      <tr
                        key={item.id}
                        style={{ borderBottom: i < grouped[type]!.length - 1 ? '1px solid var(--border)' : 'none' }}
                      >
                        <td className="px-5 py-3">
                          <Link
                            href={`/${locale}/equipment/${item.id}`}
                            className="hover:opacity-80 transition-opacity"
                          >
                            <div className="font-medium" style={{ color: 'var(--foreground)' }}>
                              {item.brand} {item.model}
                            </div>
                            {item.notes && (
                              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                                {item.notes}
                              </div>
                            )}
                          </Link>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                            {item.serialNumber}
                          </span>
                        </td>
                        <Td>
                          {assignee ? (
                            <Link
                              href={`/${locale}/roster/${assignee.id}`}
                              className="text-sm font-medium hover:opacity-80 transition-opacity"
                              style={{ color: 'var(--foreground)' }}
                            >
                              {assignee.firstName} {assignee.lastName}
                            </Link>
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--muted)' }}>—</span>
                          )}
                        </Td>
                        <Td>
                          <span className={cn('text-xs px-2 py-0.5 rounded font-medium', conditionColor(item.condition))}>
                            {item.condition === 'needs-service' ? 'Needs Service' : item.condition}
                          </span>
                        </Td>
                        <Td>{formatDate(item.lastService)}</Td>
                        {showWeight && (
                          <Td>
                            {item.weight ? (
                              <span className="text-xs font-mono">
                                {(item.weight / 1000).toFixed(2)} kg
                              </span>
                            ) : '—'}
                          </Td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
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
