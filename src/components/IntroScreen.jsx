import { useState } from 'react';
import { ArrowRight, Smartphone, Sparkles, Zap, Rocket, ChevronRight, Clock } from 'lucide-react';
import ThreeBackground from './ThreeBackground';
import './IntroScreen.css';

const INTRO_STEPS = [
  {
    text: "Building an app shouldn’t take months.",
    icon: <Clock className="intro-step-icon" />,
    color: "#775652"
  },
  {
    text: "Turn your idea into a real mobile app — in just a few clicks.",
    icon: <Zap className="intro-step-icon" />,
    color: "#BA1A1A"
  },
  {
    text: "Start by entering your app name, logo, and brand colors, and instantly see your app come to life across different devices.",
    icon: <Smartphone className="intro-step-icon" />,
    color: "#005FAF"
  },
  {
    text: "No complexity. No waiting. Just your app, visualized in seconds.",
    icon: <Sparkles className="intro-step-icon" />,
    color: "#006A6A"
  },
  {
    text: "Let’s build something real.",
    icon: <Rocket className="intro-step-icon" />,
    color: "#8B5000"
  }
];

export default function IntroScreen({ appName, setAppName, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (currentStep < INTRO_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appName.trim()) {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  };

  return (
    <div className={`intro-screen-overlay ${isExiting ? 'exit' : ''}`}>
      <ThreeBackground />
      
      <div className="intro-content-wrapper">
        <div className="intro-steps-container">
          {INTRO_STEPS.map((step, index) => (
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
          {currentStep < INTRO_STEPS.length - 1 ? (
            <button className="btn-primary intro-next-btn" onClick={handleNext}>
              Next <ChevronRight size={20} />
            </button>
          ) : (
            <div className="intro-form-container">
              <form onSubmit={handleSubmit} className="intro-app-name-form">
                <div className="form-group">
                  <label className="form-label">What's your app called?</label>
                  <input
                    type="text"
                    className="input-field intro-input"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="e.g. My Awesome App"
                    autoFocus
                    required
                  />
                </div>
                <button type="submit" className="btn-primary intro-submit-btn">
                  Start Building <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="intro-navigation">
          <div className="intro-dots">
            {INTRO_STEPS.map((_, index) => (
              <div 
                key={index} 
                className={`intro-dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
