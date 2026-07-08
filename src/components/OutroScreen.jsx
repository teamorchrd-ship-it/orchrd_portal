import { useState } from 'react';
import { Star, ArrowRight, RefreshCw, Mail } from 'lucide-react';
import ThreeBackground from './ThreeBackground';
import { getAttribution, getSessionId } from '../lib/analytics';
import { buildFeedback } from '../lib/feedback';
import './IntroScreen.css'; // Reusing intro styles for consistency

const PRIMARY_USE_OPTIONS = [
  'MVP validation', 'Client presentations', 'Startup idea',
  'Internal business app', 'Agency work', 'UI exploration', 'Other',
];

const FAVORITE_FEATURE_OPTIONS = [
  'Live Preview', 'Templates', 'Theme Customization',
  'Layout Switching', 'App Features', 'Overall Experience',
];

const LIKELIHOOD_OPTIONS = ['Definitely', 'Probably', 'Maybe', 'Not likely'];

const PRICE_OPTIONS = ['Free', 'Under $10', '$10–25', '$25–50', '$50–100', '$100+'];

function StarRating({ value, onChange }) {
  return (
    <div className="outro-star-row" role="radiogroup" aria-label="How useful did Orchrd feel?">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          type="button"
          key={n}
          className={`outro-star-btn ${n <= value ? 'active' : ''}`}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-pressed={n <= value}
          onClick={() => onChange(n)}
        >
          <Star size={26} fill={n <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}

export default function OutroScreen() {
  const [rating, setRating] = useState(0);
  const [primaryUse, setPrimaryUse] = useState('');
  const [favoriteFeature, setFavoriteFeature] = useState('');
  const [missingFeature, setMissingFeature] = useState('');
  const [likelihoodToUse, setLikelihoodToUse] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [email, setEmail] = useState('');
  const [wantsNotify, setWantsNotify] = useState(true);
  const [wantsInterview, setWantsInterview] = useState(false);
  const [company, setCompany] = useState(''); // honeypot — real users never fill this
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | success | error

  const submitFeedback = async () => {
    const feedback = buildFeedback({
      rating,
      primaryUse,
      favoriteFeature,
      missingFeature: missingFeature.trim(),
      likelihoodToUse,
      expectedPrice,
      email: email.trim(),
      wantsInterview,
      wantsNotify,
    });

    // Honeypot tripped — silently accept without sending anywhere.
    if (company.trim()) {
      setSubmitState('success');
      return;
    }

    const payload = { type: 'lead', sessionId: getSessionId(), ...feedback, ...getAttribution() };
    const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    if (!googleSheetUrl) {
      console.warn('VITE_GOOGLE_SHEETS_URL is not set — feedback was not sent anywhere:', payload);
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
      console.error('Failed to submit feedback:', error);
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
    if (!rating || !email.trim()) return;
    submitFeedback();
  };

  const mailtoFallback = `mailto:team.orchrd@gmail.com?subject=${encodeURIComponent('Orchrd feedback')}&body=${encodeURIComponent(
    `Rating: ${rating}/5\nPrimary use: ${primaryUse}\nFavorite feature: ${favoriteFeature}\nLikelihood to use: ${likelihoodToUse}\nExpected price: ${expectedPrice}\nEmail: ${email}\nWhat confused you: ${missingFeature}`
  )}`;

  return (
    <div className="intro-screen-overlay">
      <ThreeBackground />

      <div className="intro-content-wrapper">
        {submitState === 'success' ? (
          <div className="success-state" style={{ animation: 'fadeInUp 0.8s both' }}>
            <h2 className="intro-step-text" style={{ fontSize: '2.5rem' }}>🎉 Thank you!</h2>
            <p style={{ color: 'var(--portal-text-muted)', marginTop: '1rem', fontSize: '1.1rem' }}>
              Your feedback will directly influence the first public version of Orchrd.
              We'll notify you when early access becomes available.
            </p>
            <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
              Build Another App
            </button>
          </div>
        ) : (
          <div className="outro-form-wrapper" style={{ animation: 'fadeInUp 0.6s both' }}>
            <h2 className="intro-step-text outro-form-title" style={{ marginBottom: '0.6rem' }}>
              🎉 Thanks for trying Orchrd!
            </h2>
            <p className="outro-form-subtitle">
              You're helping shape the future of mobile app development. We'd love your honest feedback.
            </p>

            <form onSubmit={handleSubmit} className="outro-feedback-form">
              <div className="outro-question">
                <label className="form-label">How useful did Orchrd feel?</label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="outro-question">
                <label className="form-label">What would you primarily use Orchrd for?</label>
                <div className="outro-chip-row">
                  {PRIMARY_USE_OPTIONS.map(opt => (
                    <button
                      type="button"
                      key={opt}
                      className={`outro-chip ${primaryUse === opt ? 'active' : ''}`}
                      onClick={() => setPrimaryUse(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="outro-question">
                <label className="form-label">Which feature impressed you most?</label>
                <div className="outro-chip-row">
                  {FAVORITE_FEATURE_OPTIONS.map(opt => (
                    <button
                      type="button"
                      key={opt}
                      className={`outro-chip ${favoriteFeature === opt ? 'active' : ''}`}
                      onClick={() => setFavoriteFeature(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="outro-question">
                <label className="form-label">What confused you? (optional)</label>
                <textarea
                  className="input-field outro-textarea"
                  value={missingFeature}
                  onChange={(e) => setMissingFeature(e.target.value)}
                  placeholder="Tell us what felt missing or confusing."
                  rows={2}
                />
              </div>

              <div className="outro-question">
                <label className="form-label">If Orchrd launched today, how likely would you be to use it?</label>
                <div className="outro-chip-row">
                  {LIKELIHOOD_OPTIONS.map(opt => (
                    <button
                      type="button"
                      key={opt}
                      className={`outro-chip ${likelihoodToUse === opt ? 'active' : ''}`}
                      onClick={() => setLikelihoodToUse(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="outro-question">
                <label className="form-label">What monthly price would feel reasonable?</label>
                <div className="outro-chip-row">
                  {PRICE_OPTIONS.map(opt => (
                    <button
                      type="button"
                      key={opt}
                      className={`outro-chip ${expectedPrice === opt ? 'active' : ''}`}
                      onClick={() => setExpectedPrice(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
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
                  placeholder="your@email.com"
                  required
                />
                <label className="outro-checkbox-row">
                  <input type="checkbox" checked={wantsNotify} onChange={(e) => setWantsNotify(e.target.checked)} />
                  Notify me when Orchrd launches
                </label>
              </div>

              <label className="outro-checkbox-row">
                <input type="checkbox" checked={wantsInterview} onChange={(e) => setWantsInterview(e.target.checked)} />
                I'd love to join a 15-minute feedback interview.
              </label>

              {submitState === 'error' && (
                <div className="outro-error-banner">
                  <span>Something went wrong sending that — your answers are saved locally.</span>
                  <div className="outro-error-actions">
                    <button type="button" className="outro-retry-btn" onClick={submitFeedback}>
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
                disabled={!rating || !email.trim() || submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'Sending…' : <>Submit Feedback <ArrowRight size={20} /></>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
