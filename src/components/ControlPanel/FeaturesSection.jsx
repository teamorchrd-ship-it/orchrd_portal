import { Search, Bell, MessageCircle, Heart, ShoppingCart, User, Play, Plus, LayoutList } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

const ALL_FEATURES = [
  { key: 'search',        label: 'Search Bar',    icon: Search,       templates: ['social', 'ecommerce', 'ride'] },
  { key: 'notifications', label: 'Notifications', icon: Bell,         templates: ['social', 'ecommerce', 'ride'] },
  { key: 'chat',          label: 'Chat',          icon: MessageCircle,templates: ['social'] },
  { key: 'stories',       label: 'Stories',       icon: Play,         templates: ['social'] },
  { key: 'wishlist',      label: 'Wishlist',      icon: Heart,        templates: ['ecommerce'] },
  { key: 'cart',          label: 'Cart',          icon: ShoppingCart, templates: ['ecommerce'] },
  { key: 'profile',       label: 'Profile',       icon: User,         templates: ['social', 'ecommerce'] },
  { key: 'fab',           label: 'Action Button', icon: Plus,         templates: ['social', 'ecommerce'] },
  { key: 'bottomNav',     label: 'Bottom Nav',    icon: LayoutList,   templates: ['social', 'ecommerce', 'ride'] },
];

const Toggle = ({ checked, onChange }) => (
  <label className="toggle">
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    <span className="slider" />
  </label>
);

export default function FeaturesSection({ template, features, onChange }) {
  const visible = ALL_FEATURES.filter(f => f.templates.includes(template));
  const activeCount = visible.filter(({ key }) => features[key]).length;

  return (
    <CollapsibleSection title="Features" value={`${activeCount} on`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {visible.map(({ key, label, icon: Icon }) => (
          <div key={key} className="toggle-row">
            <span className="toggle-label">
              <Icon size={13} style={{ color: 'var(--portal-text-secondary)', flexShrink: 0 }} />
              {label}
            </span>
            <Toggle checked={!!features[key]} onChange={v => onChange(key, v)} />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
