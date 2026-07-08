import { useState, useEffect } from 'react';
import {
  MapPin, Car, Bell, Home, Clock, User,
  Phone, MessageCircle, ChevronRight, Search,
} from 'lucide-react';
import { MOCK_RIDES, MOCK_DRIVER } from './mockData';

/* ─── Static Mock Data ──────────────────────────────────────── */
const RECENT_PLACES = [
  { icon: '🏠', label: 'Home',      sub: '42 Maple Street' },
  { icon: '💼', label: 'Office',    sub: 'Downtown Business Park' },
  { icon: '🛍️', label: 'City Mall', sub: '15 min away' },
];

const NEARBY_CARS = [
  { x: '21%', y: '27%', rotate: '45deg' },
  { x: '70%', y: '22%', rotate: '-30deg' },
  { x: '13%', y: '61%', rotate: '18deg' },
  { x: '76%', y: '56%', rotate: '-55deg' },
  { x: '51%', y: '17%', rotate: '8deg' },
];

/* ─── Map Background ────────────────────────────────────────── */
const MapBg = ({ isDark, appState }) => {
  const mapBg    = isDark ? '#162030' : '#e8f0e8';
  const roadCol  = isDark ? '#1e2d42' : '#ccd8cc';
  const gridCol  = isDark ? 'rgba(74,144,217,0.09)' : 'rgba(100,120,100,0.07)';
  const buildCol = isDark ? 'rgba(28,48,78,0.8)'  : 'rgba(188,204,188,0.9)';
  const parkCol  = isDark ? '#1a3020' : '#c4d8c4';
  const treeCol  = isDark ? '#1f3a28' : '#b4ccb4';

  const showNearby  = appState === 'home' || appState === 'locating';
  const showRoute   = appState === 'selecting' || appState === 'assigned';
  const showDrop    = appState === 'selecting' || appState === 'assigned';
  const showRipple  = appState === 'home';
  const showRadar   = appState === 'locating';
  const carApproach = appState === 'assigned';

  return (
    <div style={{ position: 'absolute', inset: 0, background: mapBg, overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Grid */}
        {[...Array(12)].map((_, i) => (
          <g key={i}>
            <line x1={i * 44} y1="0" x2={i * 44} y2="100%" stroke={gridCol} strokeWidth="1" />
            <line x1="0" y1={i * 44} x2="100%" y2={i * 44} stroke={gridCol} strokeWidth="1" />
          </g>
        ))}

        {/* Main roads */}
        <path d="M0,138 Q85,118 175,148 T390,128" stroke={roadCol} strokeWidth="24" fill="none" strokeLinecap="round" />
        <path d="M56,0 L51,420"                   stroke={roadCol} strokeWidth="24" fill="none" strokeLinecap="round" />
        <path d="M216,0 Q233,178 196,420"         stroke={roadCol} strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M0,258 L420,265"                 stroke={roadCol} strokeWidth="14" fill="none" strokeLinecap="round" />

        {/* Road centre dashes */}
        <path d="M0,138 Q85,118 175,148 T390,128" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="14 10" />
        <path d="M56,0 L51,420"                   stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="14 10" />

        {/* Route line */}
        {showRoute && (
          <path
            d="M146,152 Q172,192 218,232"
            stroke="var(--m3-primary)" strokeWidth="3.5" fill="none"
            strokeDasharray="7 5" strokeLinecap="round" opacity="0.9"
          />
        )}

        {/* Park */}
        <rect x="80" y="172" width="72" height="58" rx="6" fill={parkCol} />
        <circle cx="97"  cy="190" r="10" fill={treeCol} />
        <circle cx="122" cy="186" r="9"  fill={treeCol} />
        <circle cx="107" cy="207" r="11" fill={treeCol} />
        <circle cx="135" cy="205" r="8"  fill={treeCol} />
      </svg>

      {/* Buildings */}
      {[
        [86,  38, 54, 64], [160, 38, 44, 54], [240, 56, 48, 68],
        [268, 174, 54, 54], [20, 174, 34, 64], [302, 38, 38, 50],
      ].map(([x, y, w, h], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: buildCol, borderRadius: 5 }} />
      ))}

      {/* Radar rings — locating state */}
      {showRadar && [0, 0.5, 1].map((delay, i) => (
        <div key={i} style={{
          position: 'absolute', top: '37%', left: '40%',
          width: 52, height: 52, borderRadius: '50%',
          border: '2px solid var(--m3-primary)',
          transform: 'translate(-50%, -50%)',
          animation: `rideRadar 2.2s ease-out ${delay}s infinite`,
          opacity: 0, zIndex: 4,
        }} />
      ))}

      {/* Nearby car dots — home + locating */}
      {showNearby && NEARBY_CARS.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', left: c.x, top: c.y,
          transform: `translate(-50%, -50%) rotate(${c.rotate})`,
          zIndex: 5,
        }}>
          <div style={{ animation: `rideCarFloat 3s ease-in-out ${i * 0.55}s infinite` }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'var(--m3-primary)', opacity: 0.82,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
            }}>
              <Car size={10} color="white" />
            </div>
          </div>
        </div>
      ))}

      {/* Route car — selecting + assigned */}
      {showRoute && (
        <div style={{
          position: 'absolute', top: '47%', left: '52%',
          transform: 'translate(-50%, -50%)',
          animation: carApproach ? 'rideCarApproach 5s ease-in-out infinite alternate' : 'none',
          zIndex: 6,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--m3-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 8px rgba(103,80,164,0.16)',
          }}>
            <Car size={13} color="white" />
          </div>
        </div>
      )}

      {/* Pickup pin */}
      <div style={{ position: 'absolute', top: '37%', left: '40%', transform: 'translate(-50%, -50%)', zIndex: 7 }}>
        {/* Ripple rings */}
        {showRipple && [0, 0.8].map((delay, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 14, height: 14, borderRadius: '50%',
            border: '2px solid var(--m3-primary)',
            animation: `ridePinRipple 2s ease-out ${delay}s infinite`,
          }} />
        ))}
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--m3-primary)',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          position: 'relative', zIndex: 2,
        }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid var(--m3-primary)', margin: '0 auto' }} />
      </div>

      {/* Drop pin */}
      {showDrop && (
        <div style={{ position: 'absolute', top: '57%', left: '60%', transform: 'translate(-50%, -100%)', zIndex: 7 }}>
          <MapPin size={22} fill="#EF4444" style={{ color: '#EF4444', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
        </div>
      )}

      {/* Map watermark */}
      <div style={{
        position: 'absolute', bottom: 8, right: 8,
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)',
        borderRadius: 5, padding: '2px 6px',
        fontSize: '0.48rem', fontWeight: 700, color: '#666',
      }}>
        Simulated Map
      </div>
    </div>
  );
};

/* ─── Bottom Nav ────────────────────────────────────────────── */
const RideBottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home',    icon: Home,  label: 'Home' },
    { id: 'rides',   icon: Car,   label: 'My Rides' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'profile', icon: User,  label: 'Profile' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
      background: 'var(--m3-surface)', borderTop: '1px solid var(--m3-outline-variant)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 20,
    }}>
      {tabs.map(({ id, icon: Icon, label }) => (
        <button key={id} onClick={() => onTabChange(id)} style={{
          flex: 1, border: 'none', background: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: activeTab === id ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)',
          paddingBottom: 4,
        }}>
          <Icon size={18} strokeWidth={activeTab === id ? 2.5 : 1.5} />
          <span style={{ fontSize: '0.57rem', fontWeight: activeTab === id ? 700 : 500 }}>{label}</span>
        </button>
      ))}
    </div>
  );
};

/* ─── Sheet: Home ───────────────────────────────────────────── */
const HomeSheet = ({ appConfig, onSearch }) => (
  <div style={{ padding: '4px 14px 16px' }}>
    {/* Where to? pill */}
    <div
      onClick={onSearch}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '13px 16px', borderRadius: 16, marginBottom: 18,
        background: 'var(--m3-surface-variant)', cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--m3-primary)', flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '0.88rem', color: 'var(--m3-on-surface-variant)', fontWeight: 500 }}>Where to?</span>
      <Search size={15} style={{ color: 'var(--m3-on-surface-variant)' }} />
    </div>

    {/* Recent places */}
    <p style={{ fontSize: '0.63rem', fontWeight: 800, color: 'var(--m3-on-surface-variant)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
      Recent
    </p>
    {RECENT_PLACES.map((p, i) => (
      <div
        key={i}
        onClick={onSearch}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', cursor: 'pointer',
          borderBottom: i < RECENT_PLACES.length - 1 ? '1px solid var(--m3-outline-variant)' : 'none',
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 99, flexShrink: 0,
          background: 'var(--m3-primary-container)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
        }}>
          {p.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: 'var(--m3-on-surface)' }}>{p.label}</span>
          <span style={{ display: 'block', fontSize: '0.67rem', color: 'var(--m3-on-surface-variant)' }}>{p.sub}</span>
        </div>
        <ChevronRight size={14} style={{ color: 'var(--m3-on-surface-variant)' }} />
      </div>
    ))}
  </div>
);

/* ─── Sheet: Locating ───────────────────────────────────────── */
const LocatingSheet = () => (
  <div style={{ padding: '4px 14px 18px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', background: 'var(--m3-surface-variant)', borderRadius: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--m3-primary)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--m3-on-surface)' }}>Current Location</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 13px', background: 'var(--m3-primary-container)', borderRadius: 12 }}>
        <MapPin size={12} fill="#EF4444" style={{ color: '#EF4444', flexShrink: 0 }} />
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--m3-on-primary-container)' }}>City Mall</span>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {[0, 0.2, 0.4].map((delay, i) => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: '50%', background: 'var(--m3-primary)',
            animation: `rideDotBounce 1s ease-in-out ${delay}s infinite`,
          }} />
        ))}
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--m3-on-surface-variant)', fontWeight: 500 }}>
        Finding rides nearby…
      </span>
    </div>
  </div>
);

/* ─── Sheet: Selecting ──────────────────────────────────────── */
const SelectingSheet = ({ selectedRide, onSelect, onBook }) => (
  <div style={{ padding: '4px 14px 16px' }}>
    <p style={{ fontSize: '0.63rem', fontWeight: 800, color: 'var(--m3-on-surface-variant)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      Choose a ride
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
      {MOCK_RIDES.map(ride => (
        <div
          key={ride.id}
          onClick={() => onSelect(ride.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px',
            borderRadius: 14, cursor: 'pointer', transition: 'all 0.15s ease',
            border: `1.5px solid ${selectedRide === ride.id ? 'var(--m3-primary)' : 'var(--m3-outline-variant)'}`,
            background: selectedRide === ride.id ? 'var(--m3-primary-container)' : 'var(--m3-surface)',
          }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{ride.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--m3-on-surface)' }}>{ride.name}</span>
              {ride.badge && (
                <span style={{ fontSize: '0.52rem', fontWeight: 800, background: '#10B981', color: '#fff', padding: '2px 6px', borderRadius: 99 }}>
                  {ride.badge}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--m3-on-surface-variant)' }}>{ride.eta}</span>
              <span style={{ color: 'var(--m3-outline-variant)', fontSize: '0.6rem' }}>·</span>
              {/* Seat capacity dots */}
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(ride.capacity)].map((_, i) => (
                  <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--m3-on-surface-variant)', opacity: 0.55 }} />
                ))}
              </div>
            </div>
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--m3-primary)', flexShrink: 0 }}>
            {ride.price}
          </span>
        </div>
      ))}
    </div>

    {/* Payment method row */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
      background: 'var(--m3-surface-variant)', borderRadius: 12, marginBottom: 10,
    }}>
      <span style={{ fontSize: '0.85rem' }}>💳</span>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--m3-on-surface)', flex: 1 }}>Visa ···· 4821</span>
      <span style={{ fontSize: '0.65rem', color: 'var(--m3-primary)', fontWeight: 700 }}>Change</span>
    </div>

    <button
      onClick={() => { if (selectedRide) onBook(); }}
      style={{
        width: '100%', padding: '12px',
        background: selectedRide ? 'var(--m3-primary)' : 'var(--m3-outline-variant)',
        color: selectedRide ? 'var(--m3-on-primary)' : 'var(--m3-on-surface-variant)',
        border: 'none', borderRadius: 14,
        fontWeight: 700, fontSize: '0.88rem',
        cursor: selectedRide ? 'pointer' : 'default',
        transition: 'all 0.2s ease', fontFamily: 'inherit',
      }}
    >
      {selectedRide ? 'Book Now' : 'Select a ride'}
    </button>
  </div>
);

/* ─── Sheet: Assigned ───────────────────────────────────────── */
const AssignedSheet = ({ onCancel }) => (
  <div style={{ padding: '4px 14px 16px' }}>
    {/* Driver card */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--m3-outline-variant)', marginBottom: 12 }}>
      <img
        src={MOCK_DRIVER.avatar} alt={MOCK_DRIVER.name}
        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--m3-primary-container)' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', color: 'var(--m3-on-surface)', marginBottom: 3 }}>
          {MOCK_DRIVER.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 5 }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < Math.floor(MOCK_DRIVER.rating) ? '#FFC107' : 'var(--m3-outline-variant)', fontSize: '0.62rem' }}>★</span>
          ))}
          <span style={{ fontSize: '0.63rem', color: 'var(--m3-on-surface-variant)', marginLeft: 3 }}>{MOCK_DRIVER.rating}</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--m3-surface-variant)', borderRadius: 99, padding: '3px 9px' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--m3-on-surface-variant)' }}>{MOCK_DRIVER.car}</span>
          <span style={{ fontSize: '0.58rem', color: 'var(--m3-outline-variant)' }}>·</span>
          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: 'var(--m3-on-surface)' }}>{MOCK_DRIVER.plate}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <span style={{ display: 'block', fontWeight: 900, fontSize: '1.15rem', color: 'var(--m3-primary)' }}>4 min</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--m3-on-surface-variant)' }}>ETA</span>
      </div>
    </div>

    {/* Live status */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 13px', background: 'var(--m3-primary-container)', borderRadius: 11, marginBottom: 12 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', animation: 'livePulse 2s ease-in-out infinite', flexShrink: 0 }} />
      <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--m3-on-primary-container)', flex: 1 }}>
        On the way to you
      </span>
    </div>

    {/* Action buttons */}
    <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
      {[{ icon: MessageCircle, label: 'Message' }, { icon: Phone, label: 'Call' }].map(({ icon: Icon, label }) => (
        <button key={label} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '10px', border: '1.5px solid var(--m3-outline-variant)',
          background: 'transparent', borderRadius: 12,
          color: 'var(--m3-on-surface)', fontSize: '0.75rem', fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <Icon size={14} /> {label}
        </button>
      ))}
    </div>

    <button
      onClick={onCancel}
      style={{
        width: '100%', padding: '11px', background: 'transparent',
        color: '#EF4444', border: '1.5px solid #EF4444', borderRadius: 12,
        fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit',
      }}
    >
      Cancel Ride
    </button>
  </div>
);

/* ─── Top Bar (shared) ──────────────────────────────────────── */
const TopBar = ({ appConfig, compact }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: compact ? 8 : 10,
    background: 'var(--m3-surface)', borderRadius: compact ? 14 : 18,
    padding: compact ? '7px 11px' : '8px 13px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
  }}>
    <div style={{ width: 28, height: 28, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--m3-primary-container)' }}>
      <img key={appConfig.logoUrl} className="toolbar-logo-fade" src={appConfig.logoUrl} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <span key={appConfig.appName} className="toolbar-name-fade" style={{ fontWeight: 800, fontSize: compact ? '0.82rem' : '0.9rem', color: 'var(--m3-on-surface)', letterSpacing: '-0.3px', flex: 1 }}>
      {appConfig.appName}
    </span>
    {appConfig.features?.notifications && (
      <div style={{ position: 'relative' }}>
        <Bell size={14} style={{ color: 'var(--m3-on-surface-variant)' }} />
        <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderRadius: '50%', background: '#EF4444', border: '1px solid var(--m3-surface)' }} />
      </div>
    )}
    <div style={{ width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>
);

/* ─── Main Component ────────────────────────────────────────── */
const RideHailingPreview = ({ appConfig, orientation }) => {
  const [state, setState] = useState('home');
  const [selectedRide, setSelectedRide] = useState(null);
  const [activeNavTab, setActiveNavTab] = useState('home');
  const isDark      = appConfig.theme?.mode === 'dark';
  const showBottomNav = appConfig.features?.bottomNav === true;
  const isLandscape = orientation === 'landscape';
  const isWide      = orientation === 'foldable' || isLandscape;

  useEffect(() => {
    if (state !== 'locating') return;
    const t = setTimeout(() => setState('selecting'), 2200);
    return () => clearTimeout(t);
  }, [state]);

  const sheetHeights = { home: 232, locating: 150, selecting: 372, assigned: 272 };
  const panelWidth   = isLandscape ? 238 : 216;

  const sheetContent = (
    <>
      {state === 'home'      && <HomeSheet      appConfig={appConfig} onSearch={() => setState('locating')} />}
      {state === 'locating'  && <LocatingSheet  />}
      {state === 'selecting' && <SelectingSheet selectedRide={selectedRide} onSelect={setSelectedRide} onBook={() => setState('assigned')} />}
      {state === 'assigned'  && <AssignedSheet  onCancel={() => { setState('home'); setSelectedRide(null); }} />}
    </>
  );

  /* ── Wide layout (landscape + foldable) ── */
  if (isWide) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', flex: 1,
        width: '100%', height: '100%', overflow: 'hidden',
        background: isDark ? '#162030' : '#e8f0e8',
      }}>
        {/* Status bar — spans full width */}
        <div className="phone-status-bar" style={{ color: isDark ? '#fff' : '#333', position: 'relative', zIndex: 20 }}>
          <span>9:30</span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <span style={{ fontSize: '0.52rem', fontWeight: 800 }}>●●●</span>
            <span style={{ fontSize: '0.52rem', fontWeight: 800 }}>100%</span>
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Map — left */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {/* Top bar floats over map */}
            <div style={{ position: 'absolute', top: 6, left: 8, right: 8, zIndex: 15 }}>
              <TopBar appConfig={appConfig} compact />
            </div>
            <MapBg isDark={isDark} appState={state} />
          </div>

          {/* Side panel — right, scrollable */}
          <div style={{
            width: panelWidth, flexShrink: 0,
            background: 'var(--m3-surface)',
            borderLeft: '1px solid var(--m3-outline-variant)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto', overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}>
            {/* Panel header */}
            <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid var(--m3-outline-variant)', flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--m3-on-surface)' }}>
                {state === 'home'      && 'Where to?'}
                {state === 'locating'  && 'Searching…'}
                {state === 'selecting' && 'Choose a ride'}
                {state === 'assigned'  && 'Driver en route'}
              </span>
            </div>
            {sheetContent}
          </div>
        </div>

        {showBottomNav && (
          <RideBottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />
        )}
      </div>
    );
  }

  /* ── Portrait layout ── */
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', flex: 1,
      width: '100%', height: '100%', overflow: 'hidden',
      position: 'relative', background: isDark ? '#162030' : '#e8f0e8',
    }}>
      {/* Status bar */}
      <div className="phone-status-bar" style={{ color: isDark ? '#fff' : '#333', position: 'relative', zIndex: 20 }}>
        <span>9:30</span>
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <span style={{ fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.05em' }}>●●●</span>
          <span style={{ fontSize: '0.52rem', fontWeight: 800 }}>100%</span>
        </div>
      </div>

      {/* Top bar — floats over the map */}
      <div style={{ position: 'absolute', top: 26, left: 0, right: 0, zIndex: 15, padding: '6px 10px' }}>
        <TopBar appConfig={appConfig} />
      </div>

      {/* Map — fills remaining space */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapBg isDark={isDark} appState={state} />
      </div>

      {/* Bottom sheet */}
      <div style={{
        background: 'var(--m3-surface)',
        borderRadius: '22px 22px 0 0',
        boxShadow: '0 -6px 28px rgba(0,0,0,0.13)',
        zIndex: 15,
        transition: 'min-height 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: sheetHeights[state],
        paddingBottom: showBottomNav ? 60 : 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--m3-outline-variant)' }} />
        </div>
        {sheetContent}
      </div>

      {showBottomNav && (
        <RideBottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />
      )}
    </div>
  );
};

export default RideHailingPreview;
