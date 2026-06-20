import { useState } from 'react';
import { ArrowRight, Sparkles, Send, Rocket, Smartphone, ChevronRight } from 'lucide-react';
import ThreeBackground from './ThreeBackground';
import './IntroScreen.css'; // Reusing intro styles for consistency

const OUTRO_STEPS = [
  {
    text: "Your app preview is ready.",
    icon: <Sparkles className="intro-step-icon" />,
    color: "#BA1A1A"
  },
  {
    text: "This is just the beginning — Orchrd lets you not only build your app, but also update its design, content, and layout anytime from your dashboard — without needing app updates.",
    icon: <Smartphone className="intro-step-icon" />,
    color: "#005FAF"
  },
  {
    text: "We’re building more powerful tools for ecommerce, bookings, ride-hailing, social apps, and more.",
    icon: <Rocket className="intro-step-icon" />,
    color: "#006A6A"
  },
  {
    text: "Enter your email to save your project, get early access, and be among the first to launch your app when new features go live.",
    icon: <Send className="intro-step-icon" />,
    color: "#8B5000"
  },
  {
    text: "Let’s build the future of apps together.",
    icon: <Rocket className="intro-step-icon" />,
    color: "#BA1A1A"
  }
];

export default function OutroScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStep < OUTRO_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="intro-screen-overlay">
      <ThreeBackground />
      
      <div className="intro-content-wrapper">
        <div className="intro-steps-container">
          {OUTRO_STEPS.map((step, index) => (
            <div 
              key={index} 
              className={`intro-step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'previous' : ''}`}
              style={{ '--step-color': step.color }}
            >
              <div className="intro-icon-box">
                {step.icon}
              </div>
              <h2 className="intro-step-text">{step.text}</h2>
            </div>
          ))}
        </div>

        <div className="intro-actions">
          {!isSubmitted ? (
            currentStep < OUTRO_STEPS.length - 1 ? (
              <button className="btn-primary intro-next-btn" onClick={handleNext}>
                Next <ChevronRight size={20} />
              </button>
            ) : (
              <div className="intro-form-container">
                <form onSubmit={handleSubmit} className="intro-app-name-form">
                  <div className="form-group">
                    <label className="form-label">Join Early Access</label>
                    <input
                      type="email"
                      className="input-field intro-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoFocus
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary intro-submit-btn">
                    Save My App <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            )
          ) : (
            <div className="success-state" style={{ animation: 'fadeInUp 0.8s both' }}>
              <h2 className="intro-step-text">Thank you! You're on the list.</h2>
              <p style={{ color: 'var(--portal-text-muted)', marginTop: '1rem', fontSize: '1.25rem' }}>We'll contact you soon with your saved project.</p>
              <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>
                Build Another App
              </button>
            </div>
          )}
        </div>

        <div className="intro-navigation">
          <div className="intro-dots">
            {OUTRO_STEPS.map((_, index) => (
              <div 
                key={index} 
                className={`intro-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => !isSubmitted && setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
