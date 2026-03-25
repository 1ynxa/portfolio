import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UciCategory } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  if (s.toDateString() === e.toDateString()) return formatDate(start);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.getDate()} ${s.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function uciCategoryLabel(cat: UciCategory): string {
  const map: Record<UciCategory, string> = {
    'WT': 'WorldTour',
    '1.Pro': 'ProSeries',
    '2.Pro': 'ProSeries',
    '1.1': 'UCI 1.1',
    '1.2': 'UCI 1.2',
    '2.1': 'UCI 2.1',
    '2.2': 'UCI 2.2',
  };
  return map[cat] ?? cat;
}

export function uciCategoryColor(cat: UciCategory): string {
  if (cat === 'WT') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (cat === '1.Pro' || cat === '2.Pro') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
}

export function conditionColor(c: string): string {
  if (c === 'excellent') return 'bg-emerald-500/20 text-emerald-400';
  if (c === 'good') return 'bg-blue-500/20 text-blue-400';
  if (c === 'needs-service') return 'bg-amber-500/20 text-amber-400';
  return 'bg-red-500/20 text-red-400';
}

export function statusColor(s: string): string {
  if (s === 'confirmed' || s === 'active') return 'bg-emerald-500/20 text-emerald-400';
  if (s === 'tentative') return 'bg-amber-500/20 text-amber-400';
  return 'bg-red-500/20 text-red-400';
}

export function isExpiringSoon(iso: string, days = 90): boolean {
  return daysUntil(iso) <= days && daysUntil(iso) >= 0;
}

export function isExpired(iso: string): boolean {
  return daysUntil(iso) < 0;
}

export function flagEmoji(code: string): string {
  if (!code || code.length !== 2) return '';
  return code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  );
}
