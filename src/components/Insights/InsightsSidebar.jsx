import { CheckCircle2, Circle, Activity, Rocket } from 'lucide-react';
import { STEPS } from '../ProgressStrip';

const CIRCUMFERENCE = 2 * Math.PI * 40;

export default function InsightsSidebar({ progress, onJoin }) {
  const completed = STEPS.filter(({ key }) => progress[key]).length;
  const total = STEPS.length;
  const percent = Math.round((completed / total) * 100);
  const allDone = completed === total;
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <aside className="insights-sidebar">
      <div className="insight-card">
        <h3 className="insight-card-title">Your Progress</h3>
        <div className="progress-ring-wrap">
          <svg className="progress-ring" viewBox="0 0 100 100">
            <circle className="progress-ring-track" cx="50" cy="50" r="40" />
            <circle
              className="progress-ring-fill"
              cx="50" cy="50" r="40"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="progress-ring-value">{percent}%</span>
        </div>
        <p className="progress-ring-caption">{allDone ? 'Ready to harvest! 🎉' : 'Almost there! 🎉'}</p>
        <ul className="insight-checklist">
          {STEPS.map(({ key, label }) => (
            <li key={key} className={`insight-checklist-item ${progress[key] ? 'done' : ''}`}>
              {progress[key] ? <CheckCircle2 size={14} /> : <Circle size={14} />}
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="insight-card">
        <h3 className="insight-card-title">
          <Activity size={15} className="insight-card-icon" />
          App Health
        </h3>
        <p className="insight-health-status">Looks great!</p>
        <p className="insight-card-copy">Your app is balanced and ready to grow.</p>
      </div>

      <div className="insight-card insight-card-cta">
        <h3 className="insight-card-title">Ready to harvest?</h3>
        <p className="insight-card-copy">
          Join early access and be the first to build and export production apps.
        </p>
        <button className="export-btn insight-join-btn" onClick={onJoin}>
          <Rocket size={13} />
          Join Early Access
        </button>
        <span className="insight-card-footnote">No commitment. Cancel anytime.</span>
      </div>
    </aside>
  );
}
