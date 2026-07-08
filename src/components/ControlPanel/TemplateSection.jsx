import { ShoppingCart, MessageCircle, Car, Utensils, Heart, GraduationCap, DollarSign } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

const TEMPLATES = [
  { id: 'social',    label: 'Social',       icon: MessageCircle, available: true },
  { id: 'ecommerce', label: 'E-commerce',   icon: ShoppingCart,  available: true },
  { id: 'ride',      label: 'Ride-Hailing', icon: Car,           available: true },
  { id: 'food',      label: 'Food Delivery',icon: Utensils,      available: false },
  { id: 'health',    label: 'Healthcare',   icon: Heart,         available: false },
  { id: 'edu',       label: 'Education',    icon: GraduationCap, available: false },
  { id: 'finance',   label: 'Finance',      icon: DollarSign,    available: false },
];

export default function TemplateSection({ value, onChange, open, onToggle }) {
  const active = TEMPLATES.find(t => t.id === value);

  return (
    <CollapsibleSection
      id="section-plant"
      title="🌱 Plant your idea"
      subtitle="Choose a blueprint to get started"
      value={active?.label}
      open={open}
      onToggle={onToggle}
    >
      <div className="template-chips-grid">
        {TEMPLATES.map(({ id, label, icon: Icon, available }) => (
          <button
            key={id}
            onClick={() => available && onChange(id)}
            className={`template-chip ${value === id ? 'active' : ''} ${!available ? 'disabled' : ''}`}
          >
            <Icon size={17} />
            {label}
            {!available && <span className="template-chip-soon">Soon</span>}
          </button>
        ))}
      </div>
    </CollapsibleSection>
  );
}
