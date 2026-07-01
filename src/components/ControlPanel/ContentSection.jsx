import CollapsibleSection from './CollapsibleSection';

const STYLES = [
  { id: 'professional', label: 'Professional' },
  { id: 'startup',      label: 'Startup' },
  { id: 'fashion',      label: 'Fashion' },
  { id: 'technology',   label: 'Technology' },
  { id: 'travel',       label: 'Travel' },
  { id: 'food',         label: 'Food' },
  { id: 'sports',       label: 'Sports' },
];

export default function ContentSection({ value, onChange }) {
  const active = STYLES.find(s => s.id === value);

  return (
    <CollapsibleSection title="Content Style" value={active?.label}>
      <div className="chips-grid">
        {STYLES.map(({ id, label }) => (
          <button
            key={id}
            className={`chip ${value === id ? 'active' : ''}`}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '0.72rem', color: 'var(--portal-text-secondary)', lineHeight: 1.5, marginTop: 2 }}>
        Swaps the demo content in the preview to match your industry.
      </p>
    </CollapsibleSection>
  );
}
