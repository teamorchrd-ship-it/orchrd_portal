import { useState, useEffect } from 'react';
import { Moon, Sun, Download, Smartphone, Monitor, Tablet } from 'lucide-react';
import orchrdLogo from '../Orchrd_logo_no_bg.png';
import { track } from './lib/analytics';

import EcommercePreview from './components/Ecommerce/EcommercePreview';
import SocialMediaPreview from './components/SocialMedia/SocialMediaPreview';
import RideHailingPreview from './components/RideHailing/RideHailingPreview';
import IntroScreen from './components/IntroScreen';
import OutroScreen from './components/OutroScreen';

import TemplateSection from './components/ControlPanel/TemplateSection';
import BrandSection from './components/ControlPanel/BrandSection';
import AppearanceSection from './components/ControlPanel/AppearanceSection';
import LayoutSection from './components/ControlPanel/LayoutSection';
import FeaturesSection from './components/ControlPanel/FeaturesSection';
import ContentSection from './components/ControlPanel/ContentSection';

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
    primaryColor: '#6750A4',
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


/* ── App ──────────────────────────────────────────────────── */
export default function App() {
  const [portalTheme, setPortalTheme] = useState('light');
  const [appConfig, setAppConfig] = useState(INITIAL_CONFIG);
  const [orientation, setOrientation] = useState('portrait');
  const [previewKey, setPreviewKey] = useState(0);
  const [step, setStep] = useState('intro'); // 'intro' | 'builder' | 'outro'

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

  const updateConfig = (path, value) => {
    setAppConfig(prev => {
      if (path.includes('.')) {
        const [top, key] = path.split('.');
        return { ...prev, [top]: { ...prev[top], [key]: value } };
      }
      return { ...prev, [path]: value };
    });
  };

  const updateFeature = (key, value) => {
    setAppConfig(prev => ({ ...prev, features: { ...prev.features, [key]: value } }));
  };

  const switchTemplate = (template) => {
    setAppConfig(prev => ({
      ...prev,
      template,
      layoutStyle: DEFAULT_LAYOUT_BY_TEMPLATE[template] || 'feed',
      features: { ...FEATURES_BY_TEMPLATE[template] || DEFAULT_FEATURES },
    }));
    setPreviewKey(k => k + 1);
    track('template_switched', { template });
  };

  const isExpanded = orientation === 'foldable';

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
        <div className="portal-logo">
          <img src={orchrdLogo} alt="Orchrd" style={{ height: 26, width: 'auto' }} />
          Orchrd
          <span className="demo-tag">Demo</span>
        </div>

        <div className="portal-header-center">
          <div className="live-indicator">
            <div className="live-dot" />
            Live
          </div>
          <span className="template-badge">{TEMPLATE_LABELS[appConfig.template]}</span>
        </div>

        <div className="portal-header-actions">
          <button
            className="icon-btn"
            onClick={() => setPortalTheme(t => t === 'light' ? 'dark' : 'light')}
            title="Toggle portal theme"
          >
            {portalTheme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button
            className="export-btn"
            onClick={() => { track('export_clicked', { template: appConfig.template }); setStep('outro'); }}
          >
            <Download size={13} />
            Export App
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="main-layout">
        {/* Left: Control Studio */}
        <aside className="config-panel">
          <TemplateSection
            value={appConfig.template}
            onChange={switchTemplate}
          />
          <BrandSection
            appName={appConfig.appName}
            logoUrl={appConfig.logoUrl}
            onNameChange={v => updateConfig('appName', v)}
            onLogoChange={v => updateConfig('logoUrl', v)}
          />
          <AppearanceSection
            theme={appConfig.theme}
            onChange={(key, val) => updateConfig(`theme.${key}`, val)}
          />
          <LayoutSection
            template={appConfig.template}
            value={appConfig.layoutStyle}
            onChange={v => updateConfig('layoutStyle', v)}
          />
          <FeaturesSection
            template={appConfig.template}
            features={appConfig.features}
            onChange={updateFeature}
          />
          {appConfig.template !== 'ride' && (
            <ContentSection
              value={appConfig.contentStyle}
              onChange={v => updateConfig('contentStyle', v)}
            />
          )}
        </aside>

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

          <div className={`pixel-phone-shell ${orientation}`}>
            <div className="pixel-screen preview-enter" key={previewKey}>
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
          </div>
        </main>
      </div>

        </div>
  );
}
