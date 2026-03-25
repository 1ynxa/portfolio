import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Wrench, Calendar, Tag, User } from 'lucide-react';
import { equipment } from '@/lib/mock-data/equipment';
import { roster } from '@/lib/mock-data/roster';
import { formatDate, conditionColor, cn } from '@/lib/utils';
import type { EquipmentType } from '@/types';

interface Props {
  params: Promise<{ locale: string; itemId: string }>;
}

const TYPE_LABELS: Record<EquipmentType, string> = {
  road_bike: 'Road Bike', tt_bike: 'TT Bike', wheel: 'Wheel Set',
  component: 'Component', clothing: 'Clothing',
};

export default async function EquipmentDetailPage({ params }: Props) {
  const { locale, itemId } = await params;
  const item = equipment.find(e => e.id === itemId);
  if (!item) notFound();

  const assignee = item.assignedTo ? roster.find(m => m.id === item.assignedTo) : null;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/${locale}/equipment`}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <ArrowLeft size={15} />
        </Link>
        <span className="text-sm" style={{ color: 'var(--muted)' }}>Equipment</span>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
              {item.brand} {item.model}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: 'var(--muted)' }}>
                {TYPE_LABELS[item.type]}
              </span>
              <span
                className={cn('text-xs px-2 py-0.5 rounded font-medium', conditionColor(item.condition))}
              >
                {item.condition === 'needs-service' ? 'Needs Service' : item.condition}
              </span>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-5">
          <Detail icon={Tag} label="Serial Number" value={item.serialNumber} mono />
          <Detail icon={Calendar} label="Purchase Date" value={formatDate(item.purchaseDate)} />
          <Detail icon={Wrench} label="Last Service" value={formatDate(item.lastService)} />
          {item.weight && (
            <Detail icon={Wrench} label="Weight" value={`${(item.weight / 1000).toFixed(3)} kg (${item.weight} g)`} mono />
          )}
          <Detail
            icon={User}
            label="Assigned To"
            value={assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unassigned'}
          />
        </div>

        {item.notes && (
          <div
            className="mt-5 pt-5"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="text-xs font-medium mb-1" style={{ color: 'var(--muted)' }}>Notes</div>
            <p className="text-sm" style={{ color: 'var(--foreground)' }}>{item.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--accent)' }}
          >
            Log Service
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
            style={{ background: 'var(--background)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            Reassign
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--muted)' }}>
        <Icon size={12} />
        <span className="text-xs">{label}</span>
      </div>
      <div
        className={cn('text-sm', mono && 'font-mono')}
        style={{ color: 'var(--foreground)' }}
      >
        {value}
      </div>
    </div>
  );
}
