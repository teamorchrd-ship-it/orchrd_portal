import CollapsibleSection from './CollapsibleSection';

export const LAYOUTS = {
  social: [
    { id: 'feed',     label: 'Feed' },
    { id: 'cards',    label: 'Cards' },
    { id: 'magazine', label: 'Magazine' },
    { id: 'minimal',  label: 'Minimal' },
  ],
  ecommerce: [
    { id: 'grid', label: 'Grid' },
    { id: 'list', label: 'List' },
    { id: 'cards', label: 'Cards' },
  ],
  ride: [
    { id: 'map',  label: 'Map View' },
    { id: 'list', label: 'Ride List' },
  ],
};

export default function LayoutSection({ template, value, onChange, open, onToggle }) {
  const options = LAYOUTS[template] || LAYOUTS.social;
  const active = options.find(o => o.id === value) || options[0];

  return (
    <CollapsibleSection
      id="section-layout"
      title="📐 Structure & layout"
      subtitle="Arrange your content"
      value={active?.label}
      open={open}
      onToggle={onToggle}
    >
      <div className="chips-grid">
        {options.map(({ id, label }) => (
          <button
            key={id}
            className={`chip ${value === id ? 'active' : ''}`}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </CollapsibleSection>
  );
}
