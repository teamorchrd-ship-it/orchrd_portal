import { Sun, Moon, Monitor } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

const PRESETS = [
  '#6750A4', '#C62828', '#00695C',
  '#E65100', '#1565C0', '#37474F',
];

const CORNERS = [
  { id: 'small',  label: 'Sharp' },
  { id: 'medium', label: 'Rounded' },
  { id: 'large',  label: 'Pill' },
];

const MODES = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark',  label: 'Dark',  icon: Moon },
  { id: 'auto',  label: 'Auto',  icon: Monitor },
];

export default function AppearanceSection({ theme, onChange }) {
  const activeMode = MODES.find(m => m.id === theme.mode) || MODES[0];

  const handleMode = (id) => {
    if (id === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      onChange('mode', prefersDark ? 'dark' : 'light');
    } else {
      onChange('mode', id);
    }
  };

  return (
    <CollapsibleSection title="Appearance" value={activeMode.label}>
      <div className="form-group">
        <label className="form-label">Theme</label>
        <div className="chips-grid">
          {MODES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`chip ${theme.mode === id ? 'active' : ''}`}
              onClick={() => handleMode(id)}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Accent Color</label>
        <div className="color-swatches" style={{ marginBottom: '8px' }}>
          {PRESETS.map(c => (
            <button
              key={c}
              className={`color-swatch ${theme.primaryColor === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => onChange('primaryColor', c)}
              title={c}
            />
          ))}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 10px', background: 'var(--portal-bg)',
          borderRadius: '9px', border: '1px solid var(--portal-border)',
        }}>
          <input
            type="color"
            value={theme.primaryColor}
            onInput={e => onChange('primaryColor', e.target.value)}
            style={{ width: '30px', height: '30px', border: 'none', borderRadius: '6px', cursor: 'pointer', padding: 0, background: 'none' }}
          />
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--portal-text-secondary)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            {theme.primaryColor.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Shape</label>
        <div className="chips-grid">
          {CORNERS.map(({ id, label }) => (
            <button
              key={id}
              className={`chip ${theme.cornerRadius === id ? 'active' : ''}`}
              onClick={() => onChange('cornerRadius', id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
