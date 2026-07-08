const STEPS = [
  { icon: '🌱', label: 'Plant', copy: 'Start with a blueprint' },
  { icon: '🎨', label: 'Shape', copy: 'Brand it your way' },
  { icon: '🍎', label: 'Grow', copy: 'Add features & modules' },
  { icon: '🚀', label: 'Harvest', copy: 'Launch your app' },
];

export default function Footer() {
  return (
    <footer className="portal-footer">
      <div className="portal-footer-steps">
        {STEPS.map(({ icon, label, copy }, i) => (
          <div className="portal-footer-step" key={label}>
            <div className="portal-footer-step-body">
              <span className="portal-footer-step-icon">{icon}</span>
              <div>
                <p className="portal-footer-step-label">{label}</p>
                <p className="portal-footer-step-copy">{copy}</p>
              </div>
            </div>
            {i < STEPS.length - 1 && <span className="portal-footer-arrow">→</span>}
          </div>
        ))}
      </div>
      <blockquote className="portal-footer-quote">
        “Orchrd helps you go from idea to interactive app faster than ever before.”
        <cite>— Build. Preview. Launch.</cite>
      </blockquote>
    </footer>
  );
}
