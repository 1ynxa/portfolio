import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function NewRacePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('calendar');

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/${locale}/calendar`}
          className="p-2 rounded-lg transition-all hover:opacity-80"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
        >
          <ArrowLeft size={15} />
        </Link>
        <h1 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
          {t('newRace')}
        </h1>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        <div className="grid grid-cols-1 gap-5">
          <Field label="Race name" placeholder="e.g. Tour de France" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start date" type="date" placeholder="" />
            <Field label="End date" type="date" placeholder="" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="UCI Category" options={['WT', '1.Pro', '2.Pro', '1.1', '1.2', '2.1', '2.2']} />
            <Field label="Country" placeholder="e.g. France" />
          </div>
          <Field label="Number of stages" type="number" placeholder="1" />
          <Field label="Description" placeholder="Optional notes about this race..." textarea />
          <SelectField label="Status" options={['confirmed', 'tentative', 'cancelled']} />
        </div>

        <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            className="px-5 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--accent)' }}
          >
            Save Race
          </button>
          <Link
            href={`/${locale}/calendar`}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  textarea = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg text-sm resize-none outline-none"
          style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            background: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
          }}
        />
      )}
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>
        {label}
      </label>
      <select
        className="w-full px-3 py-2 rounded-lg text-sm outline-none"
        style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
