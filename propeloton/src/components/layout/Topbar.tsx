'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  ja: 'JA',
};

interface TopbarProps {
  title: string;
  locale: string;
}

export function Topbar({ title, locale }: TopbarProps) {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  // Replace current locale segment in path with new locale
  const switchLocalePath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const otherLocales = Object.keys(LOCALE_LABELS).filter(l => l !== locale);

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
        {/* Lang switcher */}
        <div className="flex items-center gap-1">
          <Globe size={13} style={{ color: 'var(--muted)' }} />
          {otherLocales.map(l => (
            <Link
              key={l}
              href={switchLocalePath(l)}
              className="px-2 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ background: 'var(--card-bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}
            >
              {LOCALE_LABELS[l]}
            </Link>
          ))}
        </div>

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
