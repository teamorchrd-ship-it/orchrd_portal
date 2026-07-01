import { useState } from 'react';
import { ArrowRight, Sparkles, Rocket, ChevronRight, RefreshCw, Mail } from 'lucide-react';
import ThreeBackground from './ThreeBackground';
import { track, getAttribution, getSessionId } from '../lib/analytics';
import './IntroScreen.css'; // Reusing intro styles for consistency

const OUTRO_STEPS = [
  {
    text: "Your fully functional app prototype is ready.",
    icon: <Sparkles className="intro-step-icon" />,
    color: "#BA1A1A"
  },
  {
    text: "We're building this into a full platform — help us shape what comes next.",
    icon: <Rocket className="intro-step-icon" />,
    color: "#006A6A"
  }
];

const USAGE_OPTIONS = [
  { value: 'yes', label: 'Yes, definitely' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
];

const PRICE_OPTIONS = [
  { value: 'free', label: 'Only if free' },
  { value: '9-19', label: '$9 – $19/mo' },
  { value: '20-49', label: '$20 – $49/mo' },
  { value: '50+', label: '$50+/mo' },
];

export default function OutroScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [wouldUse, setWouldUse] = useState('');
  const [priceBucket, setPriceBucket] = useState('');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot — real users never fill this
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | success | error

  const revealForm = () => {
    setShowForm(true);
    track('outro_form_viewed');
  };

  const handleNext = () => {
    if (currentStep < OUTRO_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      revealForm();
    }
  };

  const submitLead = async () => {
    const payload = {
      type: 'lead',
      sessionId: getSessionId(),
      email: email.trim(),
      wouldUse,
      priceBucket,
      feedback: feedback.trim(),
      timestamp: new Date().toISOString(),
      ...getAttribution(),
    };

    // Honeypot tripped — silently accept without sending anywhere.
    if (company.trim()) {
      setSubmitState('success');
      return;
    }

    const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (!googleSheetUrl) {
      console.warn('VITE_GOOGLE_SHEETS_URL is not set — lead was not sent anywhere:', payload);
      setSubmitState('success');
      return;
    }

    setSubmitState('submitting');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      await fetch(googleSheetUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script doesn't return CORS headers
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      // 'no-cors' gives an opaque response — a resolved fetch is the best
      // success signal available; network/timeout failures still throw.
      setSubmitState('success');
    } catch (error) {
      console.error('Failed to submit lead:', error);
      try {
        const backup = JSON.parse(localStorage.getItem('orchrd_lead_backup') || '[]');
        backup.push(payload);
        localStorage.setItem('orchrd_lead_backup', JSON.stringify(backup));
      } catch { /* localStorage unavailable — nothing more we can do */ }
      setSubmitState('error');
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !wouldUse || !priceBucket) return;
    submitLead();
  };

  const mailtoFallback = `mailto:team.orchrd@gmail.com?subject=${encodeURIComponent('Orchrd early access')}&body=${encodeURIComponent(
    `Email: ${email}\nWould use: ${wouldUse}\nWould pay: ${priceBucket}\nFeedback: ${feedback}`
  )}`;

  return (
    <div className="intro-screen-overlay">
      <ThreeBackground />

      <div className="intro-content-wrapper">
        {!showForm ? (
          <>
            <div className="intro-steps-container">
              {OUTRO_STEPS.map((step, index) => (
                <div
                  key={index}
                  className={`intro-step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'previous' : ''}`}
                  style={{ '--step-color': step.color }}
                >
                  <div className="intro-icon-box">{step.icon}</div>
                  <h2 className="intro-step-text">{step.text}</h2>
                </div>
              ))}
            </div>

            <div className="intro-actions">
              <button className="btn-primary intro-next-btn" onClick={handleNext}>
                Next <ChevronRight size={20} />
              </button>
            </div>

            <div className="intro-navigation">
              <div className="intro-dots">
                {OUTRO_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`intro-dot ${index === currentStep ? 'active' : ''}`}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>
              <button className="outro-skip-btn" onClick={revealForm}>
                Skip to feedback
              </button>
            </div>
          </>
        ) : submitState === 'success' ? (
          <div className="success-state" style={{ animation: 'fadeInUp 0.8s both' }}>
            <h2 className="intro-step-text" style={{ fontSize: '2.5rem' }}>Thank you — that's incredibly helpful.</h2>
            <p style={{ color: 'var(--portal-text-muted)', marginTop: '1rem', fontSize: '1.1rem' }}>
              We'll reach out to {email} when early access opens.
            </p>
            <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
              Build Another App
            </button>
          </div>
        ) : (
          <div className="outro-form-wrapper" style={{ animation: 'fadeInUp 0.6s both' }}>
            <h2 className="intro-step-text outro-form-title">One last thing — three quick questions.</h2>

            <form onSubmit={handleSubmit} className="outro-feedback-form">
              <div className="outro-question">
                <label className="form-label">Would you use Orchrd to build your app?</label>
                <div className="outro-chip-row">
                  {USAGE_OPTIONS.map(opt => (
                    <button
                      type="button"
                      key={opt.value}
                      className={`outro-chip ${wouldUse === opt.value ? 'active' : ''}`}
                      onClick={() => setWouldUse(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="outro-question">
                <label className="form-label">What would you expect to pay, per month?</label>
                <div className="outro-chip-row">
                  {PRICE_OPTIONS.map(opt => (
                    <button
                      type="button"
                      key={opt.value}
                      className={`outro-chip ${priceBucket === opt.value ? 'active' : ''}`}
                      onClick={() => setPriceBucket(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="outro-question">
                <label className="form-label">Anything you'd want to build with it? (optional)</label>
                <textarea
                  className="input-field outro-textarea"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g. a booking app for my studio"
                  rows={2}
                />
              </div>

              {/* Honeypot — hidden from real users via CSS, bots tend to fill every field */}
              <div className="outro-honeypot" aria-hidden="true">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="outro-question">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
                <p className="outro-privacy-note">
                  We'll only use this to reach out about early access — no spam, unsubscribe anytime.
                </p>
              </div>

              {submitState === 'error' && (
                <div className="outro-error-banner">
                  <span>Something went wrong sending that — your answers are saved locally.</span>
                  <div className="outro-error-actions">
                    <button type="button" className="outro-retry-btn" onClick={submitLead}>
                      <RefreshCw size={13} /> Retry
                    </button>
                    <a className="outro-retry-btn" href={mailtoFallback}>
                      <Mail size={13} /> Email us instead
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary intro-submit-btn"
                disabled={!email.trim() || !wouldUse || !priceBucket || submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'Sending…' : <>Save My App <ArrowRight size={20} /></>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
