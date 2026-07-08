import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Rocket, Smartphone, Monitor, Tablet, Sparkles, HelpCircle, Bell, User, Shuffle } from 'lucide-react';
import orchrdLogo from '../Orchrd_logo_no_bg.png';
import { track } from './lib/analytics';

import EcommercePreview from './components/Ecommerce/EcommercePreview';
import SocialMediaPreview from './components/SocialMedia/SocialMediaPreview';
import RideHailingPreview from './components/RideHailing/RideHailingPreview';
import IntroScreen from './components/IntroScreen';
import OutroScreen from './components/OutroScreen';
import ProgressStrip from './components/ProgressStrip';
import Confetti from './components/Confetti';
import StudioNavRail from './components/ControlPanel/StudioNavRail';
import InsightsSidebar from './components/Insights/InsightsSidebar';
import Footer from './components/Footer';

import TemplateSection from './components/ControlPanel/TemplateSection';
import BrandSection from './components/ControlPanel/BrandSection';
import AppearanceSection from './components/ControlPanel/AppearanceSection';
import LayoutSection, { LAYOUTS } from './components/ControlPanel/LayoutSection';
import FeaturesSection from './components/ControlPanel/FeaturesSection';
import ContentSection, { STYLES as CONTENT_STYLES } from './components/ControlPanel/ContentSection';

import { MOCK_PRODUCTS } from './components/Ecommerce/mockData';

/* ── M3 Theme Engine ──────────────────────────────────────────
   Preserved exactly from original — generates a full M3 tonal
   palette from a single seed hex colour.
   ─────────────────────────────────────────────────────────── */
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function applyM3Colors(seedHex, isDark) {
  if (!seedHex || seedHex.length < 7) return;
  const { h, s } = hexToHsl(seedHex);
  const set = (p, v) => document.documentElement.style.setProperty(p, v);
  if (!isDark) {
    set('--m3-primary', hslToHex(h, s, 40));
    set('--m3-on-primary', '#ffffff');
    set('--m3-primary-container', hslToHex(h, s, 90));
    set('--m3-on-primary-container', hslToHex(h, s, 10));
    set('--m3-secondary', hslToHex(h, Math.max(0, s - 30), 40));
    set('--m3-on-secondary', '#ffffff');
    set('--m3-secondary-container', hslToHex(h, Math.max(0, s - 30), 90));
    set('--m3-on-secondary-container', hslToHex(h, Math.max(0, s - 30), 10));
    set('--m3-surface', hslToHex(h, Math.round(s * 0.08), 98));
    set('--m3-on-surface', hslToHex(h, Math.round(s * 0.12), 10));
    set('--m3-surface-variant', hslToHex(h, Math.round(s * 0.12), 94));
    set('--m3-on-surface-variant', hslToHex(h, Math.round(s * 0.12), 30));
    set('--m3-bg', hslToHex(h, Math.round(s * 0.05), 96));
    set('--m3-on-bg', hslToHex(h, Math.round(s * 0.12), 10));
    set('--m3-outline-variant', hslToHex(h, Math.round(s * 0.12), 88));
  } else {
    set('--m3-primary', hslToHex(h, s, 80));
    set('--m3-on-primary', hslToHex(h, s, 20));
    set('--m3-primary-container', hslToHex(h, s, 30));
    set('--m3-on-primary-container', hslToHex(h, s, 90));
    set('--m3-secondary', hslToHex(h, Math.max(0, s - 30), 80));
    set('--m3-on-secondary', hslToHex(h, Math.max(0, s - 30), 20));
    set('--m3-secondary-container', hslToHex(h, Math.max(0, s - 30), 30));
    set('--m3-on-secondary-container', hslToHex(h, Math.max(0, s - 30), 90));
    set('--m3-surface', hslToHex(h, Math.round(s * 0.05), 12));
    set('--m3-on-surface', hslToHex(h, Math.round(s * 0.05), 90));
    set('--m3-surface-variant', hslToHex(h, Math.round(s * 0.05), 20));
    set('--m3-on-surface-variant', hslToHex(h, Math.round(s * 0.05), 80));
    set('--m3-bg', hslToHex(h, Math.round(s * 0.04), 10));
    set('--m3-on-bg', hslToHex(h, Math.round(s * 0.05), 90));
    set('--m3-outline-variant', hslToHex(h, Math.round(s * 0.05), 25));
  }
}

function applyCornerRadius(cornerRadius) {
  const map = { small: 4, medium: 12, large: 22 };
  const base = map[cornerRadius] ?? 12;
  document.documentElement.style.setProperty('--m3-shape', `${base}px`);
}

/* ── Default Config ───────────────────────────────────────── */
const DEFAULT_FEATURES = {
  search: true,
  notifications: true,
  chat: true,
  wishlist: false,
  cart: true,
  profile: true,
  stories: true,
  fab: false,
  bottomNav: true,
};

const FEATURES_BY_TEMPLATE = {
  social:    { ...DEFAULT_FEATURES, cart: false, wishlist: false },
  ecommerce: { ...DEFAULT_FEATURES, chat: false, stories: false, cart: true },
  ride:      { ...DEFAULT_FEATURES, cart: false, wishlist: false, chat: false, stories: false, profile: false, fab: false, bottomNav: false },
};

const DEFAULT_LAYOUT_BY_TEMPLATE = {
  social: 'feed',
  ecommerce: 'grid',
  ride: 'map',
};

const INITIAL_CONFIG = {
  appName: 'My App',
  logoUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png',
  template: 'social',
  theme: {
    mode: 'light',
    primaryColor: '#E53935',
    cornerRadius: 'medium',
    typography: 'outfit',
    animations: true,
  },
  layoutStyle: 'feed',
  contentStyle: 'professional',
  features: { ...FEATURES_BY_TEMPLATE.social },
  products: MOCK_PRODUCTS,
};

const TEMPLATE_LABELS = {
  social: 'Social',
  ecommerce: 'E-commerce',
  ride: 'Ride-Hailing',
};

const AVAILABLE_TEMPLATES = ['social', 'ecommerce', 'ride'];
const REMIX_COLORS = ['#E53935', '#2E7D32', '#1565C0', '#6750A4', '#E65100', '#00897B'];
const CORNER_OPTIONS = ['small', 'medium', 'large'];

const pickRandom = (arr, exclude) => {
  const options = exclude !== undefined ? arr.filter(x => x !== exclude) : arr;
  return options[Math.floor(Math.random() * options.length)];
};


/* ── App ──────────────────────────────────────────────────── */
export default function App() {
  const [portalTheme, setPortalTheme] = useState('light');
  const [appConfig, setAppConfig] = useState(INITIAL_CONFIG);
  const [orientation, setOrientation] = useState('portrait');
  const [previewKey, setPreviewKey] = useState(0);
  const [step, setStep] = useState('intro'); // 'intro' | 'builder' | 'outro'
  const [progress, setProgress] = useState({ template: false, brand: false, theme: false, layout: false, features: false, content: false });
  const [openSections, setOpenSections] = useState({
    plant: true, shape: true, style: true, grow: false, layout: true, content: false,
  });
  const [activeNavId, setActiveNavId] = useState('plant');

  const toggleSection = (id) => setOpenSections(s => ({ ...s, [id]: !s[id] }));

  const navigateToSection = (id) => {
    setActiveNavId(id);
    setOpenSections(s => ({ ...s, [id]: true }));
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const magicTimeoutRef = useRef(null);
  const [celebrate, setCelebrate] = useState(false);
  const wasAllDoneRef = useRef(false);
  const celebrateTimeoutRef = useRef(null);

  /* Brief "magic" overlay on the preview whenever a config option changes,
     so tweaks read as the app rebuilding rather than snapping instantly. */
  const triggerMagicLoading = () => {
    setIsMagicLoading(true);
    clearTimeout(magicTimeoutRef.current);
    magicTimeoutRef.current = setTimeout(() => setIsMagicLoading(false), 700);
  };

  useEffect(() => () => clearTimeout(magicTimeoutRef.current), []);

  /* One-time celebration the moment the checklist first hits 6/6 — the
     natural climax of the "this already feels like a real app" arc. */
  useEffect(() => {
    const allDone = Object.values(progress).every(Boolean);
    if (allDone && !wasAllDoneRef.current) {
      setCelebrate(true);
      clearTimeout(celebrateTimeoutRef.current);
      celebrateTimeoutRef.current = setTimeout(() => setCelebrate(false), 1400);
    }
    wasAllDoneRef.current = allDone;
  }, [progress]);

  useEffect(() => () => clearTimeout(celebrateTimeoutRef.current), []);

  /* Funnel: one event per session load */
  useEffect(() => {
    track('session_start');
  }, []);

  /* Apply M3 colours whenever theme values change */
  useEffect(() => {
    applyM3Colors(appConfig.theme.primaryColor, appConfig.theme.mode === 'dark');
  }, [appConfig.theme.primaryColor, appConfig.theme.mode]);

  /* Apply corner radius token */
  useEffect(() => {
    applyCornerRadius(appConfig.theme.cornerRadius);
  }, [appConfig.theme.cornerRadius]);

  /* Sync portal accent to M3 primary so portal UI stays coherent */
  useEffect(() => {
    document.documentElement.style.setProperty('--portal-accent', appConfig.theme.primaryColor);
    document.documentElement.style.setProperty('--portal-accent-subtle', `${appConfig.theme.primaryColor}14`);
  }, [appConfig.theme.primaryColor]);

  /* The full sparkle overlay is reserved for template switches — the one
     moment that reads as "the app is rebuilding." Every other change (a
     color, a toggle, typing the app name) already has its own lightweight
     transition (color fade, card re-animate, toolbar name/logo fade), so
     layering the overlay on top of those just adds visible lag — most
     noticeably on every keystroke while typing the app name. */
  const updateConfig = (path, value) => {
    setAppConfig(prev => {
      if (path.includes('.')) {
        const [top, key] = path.split('.');
        return { ...prev, [top]: { ...prev[top], [key]: value } };
      }
      return { ...prev, [path]: value };
    });

    if (path === 'appName' || path === 'logoUrl') {
      setProgress(p => ({ ...p, brand: true }));
    } else if (path.startsWith('theme.')) {
      setProgress(p => ({ ...p, theme: true }));
    } else if (path === 'layoutStyle') {
      setProgress(p => ({ ...p, layout: true }));
      setPreviewKey(k => k + 1);
    } else if (path === 'contentStyle') {
      setProgress(p => ({ ...p, content: true }));
      setPreviewKey(k => k + 1);
    }
  };

  const updateFeature = (key, value) => {
    setAppConfig(prev => ({ ...prev, features: { ...prev.features, [key]: value } }));
    setProgress(p => ({ ...p, features: true }));
  };

  const switchTemplate = (template) => {
    setAppConfig(prev => ({
      ...prev,
      template,
      layoutStyle: DEFAULT_LAYOUT_BY_TEMPLATE[template] || 'feed',
      features: { ...FEATURES_BY_TEMPLATE[template] || DEFAULT_FEATURES },
    }));
    setPreviewKey(k => k + 1);
    setProgress(p => ({ ...p, template: true }));
    triggerMagicLoading();
    track('template_switched', { template });
  };

  /* The "wow" moment — one gesture swaps template, color, shape, layout,
     and content style together so the app visibly rebuilds itself, instead
     of the presenter narrating through six separate controls one at a time. */
  const handleRemix = () => {
    const template = pickRandom(AVAILABLE_TEMPLATES, appConfig.template);
    const layoutOptions = LAYOUTS[template] || LAYOUTS.social;
    const layoutStyle = pickRandom(layoutOptions).id;
    const contentStyle = template !== 'ride'
      ? pickRandom(CONTENT_STYLES).id
      : appConfig.contentStyle;
    const primaryColor = pickRandom(REMIX_COLORS);
    const cornerRadius = pickRandom(CORNER_OPTIONS);

    setAppConfig(prev => ({
      ...prev,
      template,
      layoutStyle,
      contentStyle,
      features: { ...FEATURES_BY_TEMPLATE[template] || DEFAULT_FEATURES },
      theme: { ...prev.theme, primaryColor, cornerRadius },
    }));
    setPreviewKey(k => k + 1);
    setProgress(p => ({ ...p, template: true, theme: true, layout: true, features: true, content: true }));
    triggerMagicLoading();
    track('remix_clicked', { template, layoutStyle, contentStyle, primaryColor, cornerRadius });
  };

  const isExpanded = orientation === 'foldable';

  const handleJoinEarlyAccess = () => {
    track('join_early_access_clicked', { template: appConfig.template });
    setStep('outro');
  };

  if (step === 'intro') {
    return (
      <IntroScreen
        appName={appConfig.appName}
        setAppName={v => updateConfig('appName', v)}
        onComplete={() => setStep('builder')}
      />
    );
  }

  if (step === 'outro') {
    return <OutroScreen />;
  }

  return (
    <div id="root" className={portalTheme === 'dark' ? 'portal-dark' : ''}>
      {/* ── Header ── */}
      <header className="portal-header">
        <div className="portal-logo-block">
          <img src={orchrdLogo} alt="Orchrd" style={{ height: 30, width: 'auto' }} />
          <div className="portal-logo-text">
            <span className="portal-logo">
              Orchrd
              <span className="demo-tag">Demo</span>
            </span>
            <span className="portal-tagline">Plant your idea. Grow your app.</span>
          </div>
        </div>

        <div className="portal-header-center">
          <div className="header-stat">
            <span className="header-stat-label">Current Blueprint</span>
            <span className="header-stat-value">{TEMPLATE_LABELS[appConfig.template]}</span>
          </div>
          <div className="header-stat">
            <div className="live-indicator">
              <div className="live-dot" />
              Live Preview
            </div>
            <span className="header-stat-sub">All changes are live</span>
          </div>
        </div>

        <div className="portal-header-actions">
          <button
            className="icon-btn"
            onClick={() => setPortalTheme(t => t === 'light' ? 'dark' : 'light')}
            title="Toggle portal theme"
          >
            {portalTheme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button className="icon-btn" title="Help">
            <HelpCircle size={14} />
          </button>
          <button className="icon-btn header-bell" title="Notifications">
            <Bell size={14} />
            <span className="header-bell-badge">2</span>
          </button>
          <div className="header-avatar" title="Your account">
            <User size={14} />
          </div>
          <button className="export-btn" onClick={handleJoinEarlyAccess}>
            <Rocket size={13} />
            Join Early Access
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="main-layout">
        {/* Left: Control Studio */}
        <div className="studio-layout">
          <div className="studio-rail-column">
            <StudioNavRail activeId={activeNavId} onNavigate={navigateToSection} />
            <button className="remix-btn" onClick={handleRemix}>
              <Shuffle size={14} />
              Remix my app
            </button>
            <ProgressStrip progress={progress} />
          </div>

          <aside className="config-panel">
            <TemplateSection
              value={appConfig.template}
              onChange={switchTemplate}
              open={openSections.plant}
              onToggle={() => toggleSection('plant')}
            />
            <BrandSection
              appName={appConfig.appName}
              logoUrl={appConfig.logoUrl}
              onNameChange={v => updateConfig('appName', v)}
              onLogoChange={v => updateConfig('logoUrl', v)}
              open={openSections.shape}
              onToggle={() => toggleSection('shape')}
            />
            <AppearanceSection
              theme={appConfig.theme}
              onChange={(key, val) => updateConfig(`theme.${key}`, val)}
              open={openSections.style}
              onToggle={() => toggleSection('style')}
            />
            <FeaturesSection
              template={appConfig.template}
              features={appConfig.features}
              onChange={updateFeature}
              open={openSections.grow}
              onToggle={() => toggleSection('grow')}
            />
            <LayoutSection
              template={appConfig.template}
              value={appConfig.layoutStyle}
              onChange={v => updateConfig('layoutStyle', v)}
              open={openSections.layout}
              onToggle={() => toggleSection('layout')}
            />
            {appConfig.template !== 'ride' && (
              <ContentSection
                value={appConfig.contentStyle}
                onChange={v => updateConfig('contentStyle', v)}
                open={openSections.content}
                onToggle={() => toggleSection('content')}
              />
            )}
          </aside>
        </div>

        {/* Right: Live Preview */}
        <main className="preview-panel">
          <div className="device-controls-bar">
            <button
              className={`device-control-btn ${orientation === 'portrait' ? 'active' : ''}`}
              onClick={() => setOrientation('portrait')}
            >
              <Smartphone size={11} /> Portrait
            </button>
            <button
              className={`device-control-btn ${orientation === 'landscape' ? 'active' : ''}`}
              onClick={() => setOrientation('landscape')}
            >
              <Monitor size={11} /> Landscape
            </button>
            <button
              className={`device-control-btn ${orientation === 'foldable' ? 'active' : ''}`}
              onClick={() => setOrientation('foldable')}
            >
              <Tablet size={11} /> Foldable
            </button>
          </div>

          {celebrate && <Confetti />}

          <div className={`pixel-phone-shell ${orientation} ${celebrate ? 'celebrate' : ''}`}>
            {orientation === 'portrait' && (
              <>
                <div className="phone-notch" />
                <div className="phone-btn phone-btn-power" />
                <div className="phone-btn phone-btn-vol-up" />
                <div className="phone-btn phone-btn-vol-down" />
              </>
            )}
            <div className="pixel-screen preview-enter" key={previewKey}>
              {isMagicLoading && (
                <div className="magic-loading-overlay">
                  <Sparkles size={22} className="magic-sparkle" />
                  <span>Applying magic…</span>
                </div>
              )}
              {appConfig.template === 'social' && (
                <SocialMediaPreview
                  key={previewKey}
                  appConfig={appConfig}
                  isExpanded={isExpanded}
                />
              )}
              {appConfig.template === 'ecommerce' && (
                <EcommercePreview
                  key={previewKey}
                  appConfig={appConfig}
                  orientation={orientation}
                />
              )}
              {appConfig.template === 'ride' && (
                <RideHailingPreview
                  key={previewKey}
                  appConfig={appConfig}
                  orientation={orientation}
                />
              )}
            </div>
            {orientation === 'portrait' && <div className="phone-home-indicator" />}
          </div>
        </main>

        <InsightsSidebar progress={progress} onJoin={handleJoinEarlyAccess} />
      </div>

      <Footer />
    </div>
  );
}
