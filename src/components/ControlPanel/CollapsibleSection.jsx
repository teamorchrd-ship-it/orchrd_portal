import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleSection({ title, value, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <div className="section-header-left">
          <span className="section-label">{title}</span>
          {value && !open && <span className="section-value">{value}</span>}
        </div>
        <ChevronDown size={13} className={`section-chevron ${open ? 'open' : ''}`} />
      </div>
      <div className={`section-body ${open ? 'open' : ''}`}>
        <div className="section-content">
          {children}
        </div>
      </div>
    </div>
  );
}
