import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleSection({ id, title, subtitle, value, defaultOpen = false, open: openProp, onToggle, children }) {
  const [openState, setOpenState] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;

  const toggle = () => {
    if (isControlled) onToggle?.(!open);
    else setOpenState(o => !o);
  };

  return (
    <div id={id} className="collapsible-section">
      <div className="section-header" onClick={toggle}>
        <div className="section-header-left">
          <div className="section-heading">
            <span className="section-label">{title}</span>
            {subtitle && <span className="section-subtitle">{subtitle}</span>}
          </div>
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
