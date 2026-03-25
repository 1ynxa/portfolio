'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarDays, Users, Wrench, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  locale: string;
  navLabels: {
    dashboard: string;
    calendar: string;
    roster: string;
    equipment: string;
  };
}

export function Sidebar({ locale, navLabels }: SidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: `/${locale}/dashboard`, label: navLabels.dashboard, icon: LayoutDashboard },
    { href: `/${locale}/calendar`, label: navLabels.calendar, icon: CalendarDays },
    { href: `/${locale}/roster`, label: navLabels.roster, icon: Users },
    { href: `/${locale}/equipment`, label: navLabels.equipment, icon: Wrench },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col z-30"
      style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'var(--accent)' }}
        >
          PP
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight" style={{ color: 'var(--foreground)' }}>
            ProPeloton
          </div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            Veloce Pro Cycling
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group',
                active
                  ? 'font-medium'
                  : 'hover:opacity-100 opacity-70',
              )}
              style={{
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#fff' : 'var(--foreground)',
              }}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: '#2563eb' }}
          >
            DS
          </div>
          <div>
            <div className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
              Team Admin
            </div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              admin@veloce.cc
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
