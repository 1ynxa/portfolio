import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  const navLabels = {
    dashboard: t('dashboard'),
    calendar: t('calendar'),
    roster: t('roster'),
    equipment: t('equipment'),
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
          <Sidebar locale={locale} navLabels={navLabels} />
          <div className="flex flex-col flex-1 ml-60 overflow-hidden">
            <Topbar title="ProPeloton" locale={locale} />
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
