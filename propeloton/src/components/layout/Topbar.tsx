'use client';

import Link from 'next/link';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TopbarProps {
  title: string;
  locale: string;
}

export function Topbar({ title, locale }: TopbarProps) {
  const { theme, toggle } = useTheme();
  const otherLocale = locale === 'en' ? 'fr' : 'en';

  return (
    <header
      className="h-14 flex items-center justify-between px-6 sticky top-0 z-20"
      style={{
        background: 'var(--background)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <h1 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h1>

      <div className="flex items-center gap-2">
        {/* Lang toggle */}
        <Link
          href={`/${otherLocale}/dashboard`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
          style={{ background: 'var(--card-bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}
        >
          <Globe size={13} />
          {otherLocale.toUpperCase()}
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ background: 'var(--card-bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
