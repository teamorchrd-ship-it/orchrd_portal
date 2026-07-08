const NAV_ITEMS = [
  { id: 'plant', icon: '🌱', label: 'Plant', sub: 'Blueprint' },
  { id: 'shape', icon: '🎨', label: 'Shape', sub: 'Brand' },
  { id: 'style', icon: '✨', label: 'Style', sub: 'Theme' },
  { id: 'grow', icon: '🍎', label: 'Grow', sub: 'Features' },
  { id: 'layout', icon: '📐', label: 'Layout', sub: 'Structure' },
  { id: 'content', icon: '🌿', label: 'Content', sub: 'Demo Data' },
];

export default function StudioNavRail({ activeId, onNavigate }) {
  return (
    <nav className="studio-nav-rail">
      {NAV_ITEMS.map(({ id, icon, label, sub }) => (
        <button
          key={id}
          className={`studio-nav-item ${activeId === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <span className="studio-nav-icon">{icon}</span>
          <span className="studio-nav-text">
            <span className="studio-nav-label">{label}</span>
            <span className="studio-nav-sub">{sub}</span>
          </span>
        </button>
      ))}
    </nav>
  );
}
