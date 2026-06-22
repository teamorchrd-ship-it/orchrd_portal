import { useState, useEffect } from 'react';
import orchrdLogo from '../Orchrd_logo_no_bg.png';
import IntroScreen from './components/IntroScreen';
import OutroScreen from './components/OutroScreen';
import EcommercePreview from './components/Ecommerce/EcommercePreview';
import SocialMediaPreview from './components/SocialMedia/SocialMediaPreview';
import { MOCK_PRODUCTS } from './components/Ecommerce/mockData';
import {
  Trash2,
  Moon,
  Sun,
  Smartphone,
  Layout,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';

// --- THEME ENGINE ---

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    let d = max - min;
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
  const { h, s } = hexToHsl(seedHex);
  let colors = {};
  
  if (!isDark) {
    colors['--m3-primary'] = hslToHex(h, s, 40);
    colors['--m3-on-primary'] = '#ffffff';
    colors['--m3-primary-container'] = hslToHex(h, s, 90);
    colors['--m3-on-primary-container'] = hslToHex(h, s, 10);
    colors['--m3-secondary'] = hslToHex(h, Math.max(0, s - 30), 40);
    colors['--m3-on-secondary'] = '#ffffff';
    colors['--m3-secondary-container'] = hslToHex(h, Math.max(0, s - 30), 90);
    colors['--m3-on-secondary-container'] = hslToHex(h, Math.max(0, s - 30), 10);
    colors['--m3-surface'] = hslToHex(h, Math.round(s * 0.08), 98);
    colors['--m3-on-surface'] = hslToHex(h, Math.round(s * 0.12), 10);
    colors['--m3-surface-variant'] = hslToHex(h, Math.round(s * 0.12), 94);
    colors['--m3-on-surface-variant'] = hslToHex(h, Math.round(s * 0.12), 30);
    colors['--m3-bg'] = hslToHex(h, Math.round(s * 0.05), 96); 
    colors['--m3-on-bg'] = colors['--m3-on-surface'];
    colors['--m3-outline-variant'] = hslToHex(h, Math.round(s * 0.12), 88);
    colors['--portal-accent'] = colors['--m3-primary'];
  } else {
    colors['--m3-primary'] = hslToHex(h, s, 80);
    colors['--m3-on-primary'] = hslToHex(h, s, 20);
    colors['--m3-primary-container'] = hslToHex(h, s, 30);
    colors['--m3-on-primary-container'] = hslToHex(h, s, 90);
    colors['--m3-secondary'] = hslToHex(h, Math.max(0, s - 30), 80);
    colors['--m3-on-secondary'] = hslToHex(h, Math.max(0, s - 30), 20);
    colors['--m3-secondary-container'] = hslToHex(h, Math.max(0, s - 30), 30);
    colors['--m3-on-secondary-container'] = hslToHex(h, Math.max(0, s - 30), 90);
    colors['--m3-surface'] = hslToHex(h, Math.round(s * 0.05), 12);
    colors['--m3-on-surface'] = hslToHex(h, Math.round(s * 0.05), 90);
    colors['--m3-surface-variant'] = hslToHex(h, Math.round(s * 0.05), 20);
    colors['--m3-on-surface-variant'] = hslToHex(h, Math.round(s * 0.05), 80);
    colors['--m3-bg'] = hslToHex(h, Math.round(s * 0.04), 10);
    colors['--m3-on-bg'] = colors['--m3-on-surface'];
    colors['--m3-outline-variant'] = hslToHex(h, Math.round(s * 0.05), 25);
    colors['--portal-accent'] = colors['--m3-primary'];
  }
  
  Object.entries(colors).forEach(([p, v]) => document.documentElement.style.setProperty(p, v));
}

// --- MOCK DATA ---

const PRESET_COLORS = [
  { name: 'Indigo', value: '#6750A4' },
  { name: 'Rose', value: '#BA1A1A' },
  { name: 'Emerald', value: '#006B5E' },
  { name: 'Amber', value: '#8B5000' }
];

// --- MAIN APP COMPONENT ---

export default function App() {
  const [portalTheme, setPortalTheme] = useState('light');
  const [step, setStep] = useState('intro');
  const [wizardStep, setWizardStep] = useState(1);
  const [appConfig, setAppConfig] = useState({ 
    appName: 'Orchrd Portal', 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png',
    category: 'ecommerce', // 'ecommerce' or 'social'
    theme: { mode: 'light', primaryColor: '#6750A4' },
    products: MOCK_PRODUCTS
  });
  const [orientation, setOrientation] = useState('portrait');

  // Builder state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newP, setNewP] = useState({ name: '', price: '', image: '', desc: '', category: 'Tech' });

  useEffect(() => {
    applyM3Colors(appConfig.theme.primaryColor, appConfig.theme.mode === 'dark');
  }, [appConfig.theme.primaryColor, appConfig.theme.mode]);

  const isExpanded = orientation === 'foldable';

  return (
    <div id="root" className={portalTheme === 'light' ? 'portal-theme-light' : 'portal-theme-dark'}>
      <header className="portal-header">
        <div className="portal-logo"><img src={orchrdLogo} style={{ height: '32px' }} /><span>Orchrd Portal<span className="demo-tag">Demo</span></span></div>
        <button className="icon-btn" onClick={() => setPortalTheme(portalTheme === 'light' ? 'dark' : 'light')} style={{ border: '1px solid var(--portal-border)', borderRadius: '50%', width: '32px', height: '32px' }}>
          {portalTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </header>

      {step === 'intro' ? <IntroScreen appName={appConfig.appName} setAppName={(name) => setAppConfig({...appConfig, appName: name})} onComplete={() => setStep('builder')} /> :
       step === 'outro' ? <OutroScreen /> :
       <div className="main-layout">
          <div className="config-panel" style={{ overflowY: 'auto' }}>
            <div className="wizard-progress">
              {[1,2,3].map(n => <div key={n} className={`wizard-node-circle ${wizardStep >= n ? 'active' : ''}`}>{n}</div>)}
            </div>

           <div className="config-card">
              {wizardStep === 1 && (
                <>
                  <h3 style={{ marginBottom: '16px' }}>App Blueprint</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ flex: 1, backgroundColor: appConfig.category === 'ecommerce' ? 'var(--portal-accent)' : '#f1f3f4', color: appConfig.category === 'ecommerce' ? '#fff' : '#5f6368' }}
                        onClick={() => setAppConfig({...appConfig, category: 'ecommerce'})}
                      >
                        <ShoppingCart size={16} /> Store
                      </button>
                      <button 
                        className="btn-primary" 
                        style={{ flex: 1, backgroundColor: appConfig.category === 'social' ? 'var(--portal-accent)' : '#f1f3f4', color: appConfig.category === 'social' ? '#fff' : '#5f6368' }}
                        onClick={() => setAppConfig({...appConfig, category: 'social'})}
                      >
                        <MessageSquare size={16} /> Social
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">App Logo</label>
                    <input 
                      className="input-field" 
                      placeholder="Logo URL"
                      value={appConfig.logoUrl} 
                      onChange={e => setAppConfig({...appConfig, logoUrl: e.target.value})} 
                      style={{ marginBottom: '8px' }} 
                    />
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="logo-upload"
                        onChange={e => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (readerEvent) => {
                              setAppConfig({...appConfig, logoUrl: readerEvent.target.result});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <label 
                        htmlFor="logo-upload" 
                        className="btn-primary" 
                        style={{ 
                          backgroundColor: '#f1f3f4', 
                          color: 'var(--portal-accent)', 
                          fontSize: '0.8rem', 
                          padding: '8px 16px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          width: 'fit-content'
                        }}
                      >
                        Upload from computer
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group"><label className="form-label">Brand Name</label><input className="input-field" value={appConfig.appName} onChange={e => setAppConfig({...appConfig, appName: e.target.value})} /></div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: '#5f6368', flex: 1 }} onClick={() => setStep('intro')}>Back</button>
                    <button className="btn-primary" style={{ flex: 2 }} onClick={() => setWizardStep(appConfig.category === 'ecommerce' ? 2 : 3)}>
                      Continue to Step {appConfig.category === 'ecommerce' ? '2' : '3'}
                    </button>
                  </div>
                </>
              )}

              {wizardStep === 2 && appConfig.category === 'ecommerce' && (
                <>
                  <h3>Product Inventory</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {appConfig.products.map(p => (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--portal-border)', borderRadius: '16px', backgroundColor: '#fff', fontSize: '0.85rem', color: '#1a1c1e' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '6px' }} />
                          <span style={{ fontWeight: '600', color: '#1a1c1e' }}>{p.name}</span>
                        </div>
                        <Trash2 size={16} style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => setAppConfig({...appConfig, products: appConfig.products.filter(i => i.id !== p.id)})} />
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: 'var(--portal-accent)', border: '1.5px dashed var(--portal-accent)' }} onClick={() => setIsModalOpen(true)}>Add Product</button>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: '#5f6368', flex: 1 }} onClick={() => setWizardStep(1)}>Back</button>
                    <button className="btn-primary" style={{ flex: 2 }} onClick={() => setWizardStep(3)}>Continue to Step 3</button>
                  </div>
                </>
              )}

              {wizardStep === 3 && (
                <>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Design System</h3>

                  <div className="form-group">
                    <label className="form-label">Theme Mode</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-primary" 
                        style={{ flex: 1, backgroundColor: appConfig.theme.mode === 'light' ? 'var(--portal-accent)' : '#f1f3f4', color: appConfig.theme.mode === 'light' ? '#fff' : '#5f6368' }}
                        onClick={() => setAppConfig({...appConfig, theme: {...appConfig.theme, mode: 'light'}})}
                      >
                        <Sun size={16} /> Light
                      </button>
                      <button 
                        className="btn-primary" 
                        style={{ flex: 1, backgroundColor: appConfig.theme.mode === 'dark' ? 'var(--portal-accent)' : '#f1f3f4', color: appConfig.theme.mode === 'dark' ? '#fff' : '#5f6368' }}
                        onClick={() => setAppConfig({...appConfig, theme: {...appConfig.theme, mode: 'dark'}})}
                      >
                        <Moon size={16} /> Dark
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Seed Color (M3 Logic)</label>
                    <div className="color-pickers-grid" style={{ marginBottom: '16px' }}>
                      {PRESET_COLORS.map(c => <button key={c.value} className={`color-swatch-btn ${appConfig.theme.primaryColor === c.value ? 'active' : ''}`} style={{ backgroundColor: c.value }} onClick={() => setAppConfig({...appConfig, theme: {...appConfig.theme, primaryColor: c.value}})} />)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--portal-bg)', borderRadius: '12px', border: '1px solid var(--portal-border)' }}>
                      <input 
                        type="color" 
                        value={appConfig.theme.primaryColor} 
                        onInput={e => setAppConfig({...appConfig, theme: {...appConfig.theme, primaryColor: e.target.value}})}
                        style={{ width: '44px', height: '44px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }}
                      />
                      <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: '800', display: 'block' }}>Custom Seed Color</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{appConfig.theme.primaryColor.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                    <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: '#5f6368', flex: 1 }} onClick={() => setWizardStep(appConfig.category === 'ecommerce' ? 2 : 1)}>Back</button>
                    <button className="btn-primary" style={{ flex: 2 }} onClick={() => setStep('outro')}>Finalize & Build App</button>
                  </div>
                </>
              )}
           </div>
         </div>

         <div className="preview-panel">
            <div className="device-controls-bar">
              {['portrait', 'landscape', 'foldable'].map(o => <button key={o} className={`device-control-btn ${orientation === o ? 'active' : ''}`} onClick={() => setOrientation(o)}>{o}</button>)}
            </div>

            <div className={`pixel-phone-shell ${orientation}`}>
              <div className="pixel-screen">
                {appConfig.category === 'ecommerce' ? (
                  <EcommercePreview appConfig={appConfig} orientation={orientation} />
                ) : (
                  <SocialMediaPreview appConfig={appConfig} isExpanded={isExpanded} />
                )}
              </div>
            </div>
         </div>
       </div>}

       {/* Product Modal */}
       {isModalOpen && (
         <div className="editor-modal-overlay">
           <div className="editor-modal">
             <h3 style={{ marginBottom: '24px' }}>New Item Details</h3>
             <input className="input-field" style={{ marginBottom: '12px' }} placeholder="Product Title" value={newP.name} onChange={e => setNewP({...newP, name: e.target.value})} />
             <input className="input-field" style={{ marginBottom: '12px' }} placeholder="Price ($)" type="number" value={newP.price} onChange={e => setNewP({...newP, price: e.target.value})} />
             <input className="input-field" style={{ marginBottom: '8px' }} placeholder="Cover Image URL" value={newP.image} onChange={e => setNewP({...newP, image: e.target.value})} />
             <textarea className="input-field" style={{ marginBottom: '24px', height: '100px' }} placeholder="Product Description" value={newP.desc} onChange={e => setNewP({...newP, desc: e.target.value})} />
             <div style={{ display: 'flex', gap: '12px' }}>
               <button className="btn-ghost" onClick={() => setIsModalOpen(false)}>Discard</button>
               <button className="btn-primary" onClick={() => { setAppConfig({...appConfig, products: [...appConfig.products, {...newP, id: Date.now(), price: Number(newP.price)} ]}); setIsModalOpen(false); setNewP({ name: '', price: '', image: '', desc: '', category: 'Tech' }); }}>Save Item</button>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}
