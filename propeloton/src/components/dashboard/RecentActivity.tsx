import { Calendar, User, Package, Plus } from 'lucide-react';
import { ActivityItem } from '@/types';
import { formatDate } from '@/lib/utils';

const iconMap = {
  race_added: Calendar,
  rider_assigned: User,
  equipment_updated: Package,
  member_added: Plus,
};

interface RecentActivityProps {
  items: ActivityItem[];
  title: string;
}

export function RecentActivity({ items, title }: RecentActivityProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      <div
        className="px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {title}
        </h2>
      </div>

      <div className="px-5 py-2">
        {items.map((item, i) => {
          const Icon = iconMap[item.type] ?? Calendar;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 py-3"
              style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(139,149,168,0.12)' }}
              >
                <Icon size={13} style={{ color: 'var(--muted)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm" style={{ color: 'var(--foreground)' }}>
                  {item.description}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  {formatDate(item.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
