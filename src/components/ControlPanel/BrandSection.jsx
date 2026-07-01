import { Upload } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

export default function BrandSection({ appName, logoUrl, onNameChange, onLogoChange }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onLogoChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <CollapsibleSection title="Brand" value={appName} defaultOpen={true}>
      <div className="form-group">
        <label className="form-label">App Name</label>
        <input
          className="input-field"
          value={appName}
          onChange={e => onNameChange(e.target.value)}
          placeholder="My App"
          maxLength={24}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Logo</label>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{
            width: '52px', height: '52px', flexShrink: 0,
            borderRadius: '12px', overflow: 'hidden',
            border: '1px solid var(--portal-border)',
            background: 'var(--portal-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src={logoUrl}
              alt="Logo preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <input
              type="url"
              className="input-field"
              style={{ fontSize: '0.78rem' }}
              value={logoUrl}
              onChange={e => onLogoChange(e.target.value)}
              placeholder="https://..."
            />
            <input type="file" accept="image/*" id="logo-file-upload" onChange={handleFile} style={{ display: 'none' }} />
            <label htmlFor="logo-file-upload" className="upload-btn">
              <Upload size={12} />
              Upload image
            </label>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
