const STEPS = [
  { key: 'template', label: 'Blueprint selected' },
  { key: 'brand', label: 'Brand customized' },
  { key: 'theme', label: 'Style applied' },
  { key: 'features', label: 'Features added' },
  { key: 'layout', label: 'Layout selected' },
  { key: 'content', label: 'Demo content' },
];

export { STEPS };

export default function ProgressStrip({ progress, onViewSummary }) {
  const completed = STEPS.filter(({ key }) => progress[key]).length;
  const total = STEPS.length;
  const percent = (completed / total) * 100;
  const allDone = completed === total;

  return (
    <div className={`tree-progress-card ${allDone ? 'ready' : ''}`}>
      <p className="tree-progress-title">
        Your app is taking shape <span>🌱</span>
      </p>
      <div className="tree-illustration" aria-hidden="true">🪴</div>
      <p className="tree-progress-copy">Every change you make grows your app in real time.</p>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="tree-progress-count">{completed}/{total} Completed</span>
      <button className="view-summary-btn" onClick={onViewSummary}>View Summary</button>
    </div>
  );
}
