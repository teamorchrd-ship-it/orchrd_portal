import { useState, useEffect } from 'react';
import {
  ChevronLeft, ShoppingCart, Home as HomeIcon, User,
  Search, ChevronRight, CheckCircle2, Heart, Bell,
  MapPin, Trash2,
} from 'lucide-react';

/* ─── Banner Data ───────────────────────────────────────────── */
const BANNERS = [
  { title: 'Summer Sale ☀️', sub: 'Up to 50% off selected items', cta: 'Shop Now', bg: 'linear-gradient(135deg, var(--m3-primary) 0%, var(--m3-secondary) 100%)' },
  { title: 'New Arrivals ✨',  sub: 'Fresh picks just dropped',      cta: 'Explore',   bg: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)' },
  { title: 'Flash Deal ⚡',   sub: 'Today only — grab it fast',     cta: 'Grab It',   bg: 'linear-gradient(135deg, #C62828 0%, #EF5350 100%)' },
];

const CATEGORIES = [
  { label: 'All',       emoji: '🏠' },
  { label: 'Tech',      emoji: '💻' },
  { label: 'Wearables', emoji: '⌚' },
  { label: 'Footwear',  emoji: '👟' },
  { label: 'Bags',      emoji: '🎒' },
];

const COLORS = ['#6750A4', '#1565C0', '#2E7D32', '#B71C1C'];

/* ─── Toast ─────────────────────────────────────────────────── */
const Toast = ({ message }) => (
  <div style={{
    position: 'absolute', top: 44, left: 12, right: 12, zIndex: 100,
    background: 'rgba(20,20,20,0.92)', color: '#fff',
    borderRadius: 12, padding: '10px 14px',
    fontSize: '0.73rem', fontWeight: 600,
    display: 'flex', alignItems: 'center', gap: 8,
    backdropFilter: 'blur(10px)',
    animation: 'toastSlideDown 0.22s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
  }}>
    <CheckCircle2 size={14} style={{ color: '#4ADE80', flexShrink: 0 }} />
    {message}
  </div>
);

/* ─── Star Rating ───────────────────────────────────────────── */
const StarRating = ({ rating, count }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
    <span style={{ color: '#F59E0B', fontSize: '0.62rem', letterSpacing: '-0.5px' }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
    {count && (
      <span style={{ fontSize: '0.58rem', color: 'var(--m3-on-surface-variant)' }}>
        ({count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count})
      </span>
    )}
  </div>
);

/* ─── Search Bar ────────────────────────────────────────────── */
const SearchBar = () => (
  <div style={{
    display: 'flex', alignItems: 'center',
    background: 'var(--m3-surface-variant)',
    padding: '9px 14px', borderRadius: 24,
    margin: '6px 14px 4px', gap: 8,
  }}>
    <Search size={14} style={{ color: 'var(--m3-on-surface-variant)', flexShrink: 0 }} />
    <span style={{ color: 'var(--m3-on-surface-variant)', fontSize: '0.78rem' }}>Search products…</span>
  </div>
);

/* ─── Banner Carousel ───────────────────────────────────────── */
const BannerCarousel = ({ isActive, compact }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => setIdx(i => (i + 1) % BANNERS.length), 3200);
    return () => clearInterval(t);
  }, [isActive]);

  const b = BANNERS[idx];

  return (
    <div style={{ margin: '10px 14px' }}>
      <div style={{
        height: compact ? 82 : 126, borderRadius: 18,
        background: b.bg,
        display: 'flex', alignItems: 'center', padding: '0 22px',
        overflow: 'hidden', position: 'relative',
        transition: 'background 0.6s ease',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -28, right: -18, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: -45, right: 32, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />

        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ display: 'block', fontWeight: 900, fontSize: '0.95rem', color: '#fff', marginBottom: 4, letterSpacing: '-0.3px' }}>
            {b.title}
          </span>
          <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.82)', marginBottom: 14 }}>
            {b.sub}
          </span>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)', color: '#fff',
            padding: '5px 13px', borderRadius: 99,
            fontSize: '0.66rem', fontWeight: 700,
            border: '1px solid rgba(255,255,255,0.28)',
          }}>
            {b.cta} →
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 8 }}>
        {BANNERS.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 18 : 6, height: 6, borderRadius: 99,
              background: i === idx ? 'var(--m3-primary)' : 'var(--m3-outline-variant)',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Category Row ──────────────────────────────────────────── */
const CategoryRow = () => {
  const [active, setActive] = useState(0);
  return (
    <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
      <div style={{ display: 'flex', gap: 7, padding: '8px 14px' }}>
        {CATEGORIES.map((c, i) => (
          <div
            key={c.label}
            onClick={() => setActive(i)}
            style={{
              padding: '6px 13px', borderRadius: 99, whiteSpace: 'nowrap',
              background: active === i ? 'var(--m3-primary)' : 'var(--m3-surface-variant)',
              color: active === i ? 'var(--m3-on-primary)' : 'var(--m3-on-surface-variant)',
              fontSize: '0.73rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0,
              transition: 'all 0.2s ease',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <span style={{ fontSize: '0.78rem' }}>{c.emoji}</span>
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Section Header ────────────────────────────────────────── */
const SectionHeader = ({ title, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px 4px' }}>
    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--m3-on-surface)' }}>{title}</span>
    {action && <span style={{ fontSize: '0.7rem', color: 'var(--m3-primary)', fontWeight: 600 }}>{action}</span>}
  </div>
);

/* ─── Badge Chip ────────────────────────────────────────────── */
const Badge = ({ label }) => {
  const colors = { SALE: '#EF4444', NEW: '#10B981', HOT: '#F59E0B' };
  return (
    <div style={{
      position: 'absolute', top: 8, left: 8,
      background: colors[label] || '#6750A4',
      color: '#fff', fontSize: '0.52rem', fontWeight: 800,
      padding: '2px 7px', borderRadius: 99, letterSpacing: '0.06em',
    }}>
      {label}
    </div>
  );
};

/* ─── Product Card (grid) ───────────────────────────────────── */
const ProductCard = ({ product, onSelect, onAdd, showWishlist }) => {
  const [wished, setWished] = useState(false);
  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--m3-surface)', borderRadius: 16, overflow: 'hidden',
        cursor: 'pointer', border: '1px solid var(--m3-outline-variant)',
        position: 'relative', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <div style={{ height: 128, position: 'relative', overflow: 'hidden', background: 'var(--m3-surface-variant)' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {product.badge && <Badge label={product.badge} />}
        {showWishlist && (
          <button
            onClick={e => { e.stopPropagation(); setWished(w => !w); }}
            style={{
              position: 'absolute', top: 7, right: 7, width: 28, height: 28,
              borderRadius: '50%', background: 'rgba(255,255,255,0.88)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            }}
          >
            <Heart size={13} fill={wished ? '#EF4444' : 'none'} style={{ color: wished ? '#EF4444' : '#666' }} />
          </button>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '9px 9px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{
          fontSize: '0.73rem', fontWeight: 600, color: 'var(--m3-on-surface)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', lineHeight: 1.35,
        }}>
          {product.name}
        </span>

        <StarRating rating={product.rating} count={product.reviews} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 1 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--m3-primary)' }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '0.65rem', color: 'var(--m3-on-surface-variant)', textDecoration: 'line-through' }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={e => { e.stopPropagation(); onAdd(product); }}
          style={{
            background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
            border: 'none', borderRadius: 9, padding: '7px 0',
            fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
            width: '100%', marginTop: 5, fontFamily: 'inherit',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

/* ─── Product List Item ─────────────────────────────────────── */
const ProductListItem = ({ product, onSelect, onAdd, showWishlist }) => {
  const [wished, setWished] = useState(false);
  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        display: 'flex', gap: 12, padding: '11px 14px',
        borderBottom: '1px solid var(--m3-outline-variant)', cursor: 'pointer', alignItems: 'center',
      }}
    >
      <div style={{ width: 66, height: 66, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: 'var(--m3-surface-variant)', position: 'relative' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {product.badge && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: product.badge === 'SALE' ? '#EF4444' : product.badge === 'HOT' ? '#F59E0B' : '#10B981',
            color: '#fff', fontSize: '0.48rem', fontWeight: 800, textAlign: 'center', padding: '2px 0',
          }}>
            {product.badge}
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontWeight: 600, fontSize: '0.83rem', color: 'var(--m3-on-surface)', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.name}
        </span>
        <StarRating rating={product.rating} count={product.reviews} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--m3-primary)' }}>${product.price}</span>
          {product.originalPrice && (
            <span style={{ fontSize: '0.68rem', color: 'var(--m3-on-surface-variant)', textDecoration: 'line-through' }}>${product.originalPrice}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        {showWishlist && (
          <button onClick={e => { e.stopPropagation(); setWished(w => !w); }} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2 }}>
            <Heart size={15} fill={wished ? '#EF4444' : 'none'} style={{ color: wished ? '#EF4444' : 'var(--m3-on-surface-variant)' }} />
          </button>
        )}
        <button
          onClick={e => { e.stopPropagation(); onAdd(product); }}
          style={{
            background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
            border: 'none', borderRadius: 9, padding: '6px 13px',
            fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

/* ─── Bottom Nav ────────────────────────────────────────────── */
const BottomNav = ({ activeTab, onTabChange, features, cartCount }) => {
  const tabs = [
    { id: 'home',    icon: HomeIcon,     label: 'Home',    always: true },
    { id: 'cart',    icon: ShoppingCart, label: 'Cart',    key: 'cart',    badge: cartCount },
    { id: 'profile', icon: User,         label: 'Profile', key: 'profile' },
  ].filter(t => t.always || features[t.key]);

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
      background: 'var(--m3-surface)', borderTop: '1px solid var(--m3-outline-variant)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10,
    }}>
      {tabs.map(({ id, icon: Icon, label, badge }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          style={{
            flex: 1, border: 'none', background: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: activeTab === id ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)',
            paddingBottom: 4,
          }}
        >
          <div style={{ position: 'relative' }}>
            <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 1.5} />
            {badge > 0 && (
              <div style={{
                position: 'absolute', top: -5, right: -7,
                background: '#EF4444', color: '#fff',
                width: 16, height: 16, borderRadius: '50%',
                fontSize: '0.52rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {badge > 9 ? '9+' : badge}
              </div>
            )}
          </div>
          <span style={{ fontSize: '0.57rem', fontWeight: activeTab === id ? 700 : 500 }}>{label}</span>
        </button>
      ))}
    </div>
  );
};

/* ─── Nav Rail (foldable) ───────────────────────────────────── */
const NavRail = ({ activeTab, onTabChange, features, cartCount }) => {
  const tabs = [
    { id: 'home',    icon: HomeIcon,     label: 'Home',    always: true },
    { id: 'cart',    icon: ShoppingCart, label: 'Cart',    key: 'cart',    badge: cartCount },
    { id: 'profile', icon: User,         label: 'Profile', key: 'profile' },
  ].filter(t => t.always || features[t.key]);

  return (
    <div style={{
      width: 72, background: 'var(--m3-surface-variant)',
      borderRight: '1px solid var(--m3-outline-variant)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 24, gap: 20, zIndex: 10,
    }}>
      {tabs.map(({ id, icon: Icon, label, badge }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          style={{
            border: 'none', background: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: activeTab === id ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)',
          }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 99, position: 'relative',
            background: activeTab === id ? 'var(--m3-primary-container)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={18} />
            {badge > 0 && (
              <div style={{
                position: 'absolute', top: 2, right: 2,
                background: '#EF4444', color: '#fff',
                width: 14, height: 14, borderRadius: '50%',
                fontSize: '0.48rem', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {badge > 9 ? '9+' : badge}
              </div>
            )}
          </div>
          <span style={{ fontSize: '0.57rem', fontWeight: 600 }}>{label}</span>
        </button>
      ))}
    </div>
  );
};

/* ─── Home Screen ───────────────────────────────────────────── */
const HomeScreen = ({ products, onProductSelect, onAddToCart, isExpanded, isNarrow, appConfig, isActive, compact }) => {
  const features = appConfig.features || {};
  const layoutStyle = appConfig.layoutStyle || 'grid';
  const showWishlist = !!features.wishlist;
  const cols = isNarrow ? '1fr 1fr' : (isExpanded ? '1fr 1fr 1fr' : '1fr 1fr');

  return (
    <div className="app-body" style={{ paddingBottom: 68 }}>
      {/* Header */}
      <div style={{ padding: '14px 14px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--m3-primary-container)', overflow: 'hidden', flexShrink: 0 }}>
          <img src={appConfig.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.3px', display: 'block', lineHeight: 1.2 }}>
            {appConfig.appName}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
            <MapPin size={9} style={{ color: 'var(--m3-primary)' }} />
            <span style={{ fontSize: '0.62rem', color: 'var(--m3-on-surface-variant)' }}>New York, NY</span>
          </div>
        </div>
        {features.notifications && (
          <div style={{ position: 'relative', padding: 4 }}>
            <Bell size={17} style={{ color: 'var(--m3-on-surface-variant)' }} />
            <div style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid var(--m3-bg)' }} />
          </div>
        )}
      </div>

      {features.search && <SearchBar />}
      <BannerCarousel isActive={isActive} compact={compact} />
      <CategoryRow />

      <SectionHeader title="Featured Products" action="See all" />

      {layoutStyle === 'list' ? (
        <div style={{ marginTop: 4 }}>
          {products.map(p => (
            <ProductListItem key={p.id} product={p} onSelect={onProductSelect} onAdd={onAddToCart} showWishlist={showWishlist} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, padding: '6px 14px 14px' }}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} onSelect={onProductSelect} onAdd={onAddToCart} showWishlist={showWishlist} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Product Detail Screen ─────────────────────────────────── */
const ProductDetailScreen = ({ product, quantity, setQuantity, onAddToCart, onBack, isFoldableSidePane, compact }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [galleryDot, setGalleryDot] = useState(0);

  return (
    <div className="app-body" style={{ paddingBottom: 76 }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          border: 'none', background: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          color: 'var(--m3-primary)', padding: '14px 14px 8px',
          fontWeight: 600, fontFamily: 'inherit', fontSize: '0.78rem',
        }}
      >
        <ChevronLeft size={15} /> {isFoldableSidePane ? 'Close' : 'Back'}
      </button>

      {/* Hero image + gallery dots */}
      <div style={{ position: 'relative', height: compact ? 130 : 196, overflow: 'hidden', background: 'var(--m3-surface-variant)' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              onClick={() => setGalleryDot(i)}
              style={{
                width: i === galleryDot ? 18 : 6, height: 6, borderRadius: 99,
                background: i === galleryDot ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--m3-on-bg)', flex: 1, lineHeight: 1.3, paddingRight: 8 }}>
            {product.name}
          </span>
          {product.badge && <Badge label={product.badge} />}
        </div>

        <StarRating rating={product.rating} count={product.reviews} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--m3-primary)' }}>${product.price}</span>
          {product.originalPrice && (
            <>
              <span style={{ fontSize: '0.82rem', color: 'var(--m3-on-surface-variant)', textDecoration: 'line-through' }}>${product.originalPrice}</span>
              <span style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: 700 }}>Save ${product.originalPrice - product.price}</span>
            </>
          )}
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--m3-on-bg)', opacity: 0.68, lineHeight: 1.6, marginBottom: 14 }}>
          Premium quality product with excellent build and lasting performance. Loved by thousands of customers worldwide.
        </p>

        {/* Color selector */}
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--m3-on-surface-variant)', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
            COLOR
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {COLORS.map((c, i) => (
              <div
                key={c}
                onClick={() => setSelectedColor(i)}
                style={{
                  width: 24, height: 24, borderRadius: '50%', background: c, cursor: 'pointer',
                  border: selectedColor === i ? '2.5px solid var(--m3-on-bg)' : '2.5px solid transparent',
                  boxShadow: selectedColor === i ? '0 0 0 2px var(--m3-primary)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Quantity stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'var(--m3-surface-variant)', borderRadius: 12, width: 'fit-content' }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ width: 36, height: 36, border: 'none', background: 'transparent', color: 'var(--m3-on-bg)', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderRadius: '12px 0 0 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >−</button>
          <span style={{ minWidth: 28, textAlign: 'center', fontSize: '0.88rem', fontWeight: 700 }}>{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{ width: 36, height: 36, border: 'none', background: 'transparent', color: 'var(--m3-on-bg)', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', borderRadius: '0 12px 12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >+</button>
        </div>
      </div>

      {/* Dual CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 16px 12px',
        background: 'var(--m3-surface)', borderTop: '1px solid var(--m3-outline-variant)',
        display: 'flex', gap: 10,
      }}>
        <button
          onClick={() => onAddToCart(product, quantity)}
          style={{
            flex: 1, border: '1.5px solid var(--m3-primary)', background: 'transparent',
            color: 'var(--m3-primary)', borderRadius: 12, padding: '10px',
            fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => onAddToCart(product, quantity)}
          style={{
            flex: 1, background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
            border: 'none', borderRadius: 12, padding: '10px',
            fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

/* ─── Cart Screen ───────────────────────────────────────────── */
const CartScreen = ({ cartItems, onRemove, onQuantityChange, onCheckout }) => {
  const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="app-body" style={{ padding: '14px 0 80px' }}>
      <span style={{ fontSize: '1.05rem', fontWeight: 800, display: 'block', padding: '0 16px 12px', color: 'var(--m3-on-bg)' }}>
        Your Cart
      </span>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '52px 20px' }}>
          <ShoppingCart size={44} style={{ color: 'var(--m3-outline-variant)', marginBottom: 14 }} />
          <p style={{ opacity: 0.5, fontSize: '0.88rem', margin: 0, fontWeight: 600 }}>Your cart is empty</p>
          <p style={{ opacity: 0.38, fontSize: '0.73rem', marginTop: 5 }}>Add items to get started</p>
        </div>
      ) : (
        <>
          {cartItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: '1px solid var(--m3-outline-variant)' }}>
              <div style={{ width: 58, height: 58, borderRadius: 11, overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: 'var(--m3-on-surface)', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.product.name}
                </span>
                <span style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', color: 'var(--m3-primary)', marginBottom: 8 }}>
                  ${item.product.price}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Per-item stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--m3-surface-variant)', borderRadius: 8 }}>
                    <button
                      onClick={() => onQuantityChange(i, item.quantity - 1)}
                      style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: 'var(--m3-on-bg)', fontWeight: 700, cursor: 'pointer', borderRadius: '8px 0 0 8px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <span style={{ minWidth: 22, textAlign: 'center', fontSize: '0.78rem', fontWeight: 700 }}>{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(i, item.quantity + 1)}
                      style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: 'var(--m3-on-bg)', fontWeight: 700, cursor: 'pointer', borderRadius: '0 8px 8px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                  <button
                    onClick={() => onRemove(i)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#EF4444', padding: 4, display: 'flex', alignItems: 'center' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div style={{ margin: '14px 16px 0', background: 'var(--m3-surface-variant)', borderRadius: 14, padding: '13px 14px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.82rem', display: 'block', marginBottom: 10 }}>Order Summary</span>
            {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Shipping', `$${shipping.toFixed(2)}`]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--m3-on-surface-variant)' }}>{label}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 9, borderTop: '1px solid var(--m3-outline-variant)' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--m3-primary)' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ padding: '12px 16px 0' }}>
            <button
              onClick={onCheckout}
              style={{
                width: '100%', background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
                border: 'none', borderRadius: 14, padding: '13px',
                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

/* ─── Checkout Screen ───────────────────────────────────────── */
const CheckoutScreen = ({ cartItems, onBack, onPlaceOrder }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const total = (cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0) + 5.99).toFixed(2);

  return (
    <div className="app-body" style={{ padding: '14px 16px 80px' }}>
      <button
        onClick={onBack}
        style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--m3-primary)', marginBottom: 16, fontWeight: 600, fontFamily: 'inherit', fontSize: '0.78rem', padding: 0 }}
      >
        <ChevronLeft size={15} /> Back to Cart
      </button>
      <span style={{ fontSize: '1.05rem', fontWeight: 800, display: 'block', marginBottom: 16 }}>Checkout</span>

      {[['Full Name', name, setName], ['Delivery Address', address, setAddress]].map(([label, val, set]) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--m3-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
            {label}
          </span>
          <input
            type="text"
            value={val}
            onChange={e => set(e.target.value)}
            style={{
              width: '100%', padding: '10px 13px',
              border: '1.5px solid var(--m3-outline)', borderRadius: 11,
              fontSize: '0.85rem', background: 'var(--m3-surface)',
              color: 'var(--m3-on-surface)', fontFamily: 'inherit',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      ))}

      <div style={{ background: 'var(--m3-surface-variant)', borderRadius: 13, padding: '12px 14px', marginTop: 6, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
          <span style={{ fontSize: '0.85rem' }}>Total</span>
          <span style={{ color: 'var(--m3-primary)', fontSize: '0.85rem' }}>${total}</span>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={!name || !address}
        style={{
          width: '100%', background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
          border: 'none', borderRadius: 13, padding: '13px',
          fontWeight: 700, cursor: !name || !address ? 'default' : 'pointer',
          opacity: !name || !address ? 0.5 : 1,
          fontFamily: 'inherit', fontSize: '0.88rem',
        }}
      >
        Place Order
      </button>
    </div>
  );
};

/* ─── Profile Screen ────────────────────────────────────────── */
const ProfileScreen = () => (
  <div className="app-body" style={{ padding: '56px 20px 20px', alignItems: 'center' }}>
    <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--m3-primary-container)', overflow: 'hidden', marginBottom: 10 }}>
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--m3-on-bg)', marginBottom: 3 }}>Alex Johnson</span>
    <span style={{ fontSize: '0.75rem', opacity: 0.55, color: 'var(--m3-on-bg)', marginBottom: 22 }}>alex.johnson@example.com</span>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {['Order History', 'Payment Methods', 'Addresses', 'Settings'].map(item => (
        <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
          <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--m3-on-bg)' }}>{item}</span>
          <ChevronRight size={15} style={{ color: 'var(--m3-on-surface-variant)' }} />
        </div>
      ))}
    </div>
  </div>
);

/* ─── Success Screen ────────────────────────────────────────── */
const SuccessScreen = ({ onContinue }) => (
  <div className="app-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
      <CheckCircle2 size={38} style={{ color: 'var(--m3-primary)' }} />
    </div>
    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--m3-on-bg)', marginBottom: 8 }}>Order Placed!</span>
    <span style={{ fontSize: '0.78rem', color: 'var(--m3-on-surface-variant)', marginBottom: 28, lineHeight: 1.6 }}>
      Your items will arrive in 2–4 business days
    </span>
    <button
      onClick={onContinue}
      style={{
        background: 'var(--m3-primary)', color: 'var(--m3-on-primary)',
        border: 'none', borderRadius: 13, padding: '12px 28px',
        fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem',
      }}
    >
      Continue Shopping
    </button>
  </div>
);

/* ─── Main Component ────────────────────────────────────────── */
const EcommercePreview = ({ appConfig, orientation }) => {
  const [screen, setScreen] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);

  const features = appConfig.features || {};
  const isLandscape = orientation === 'landscape';
  const isFoldable  = orientation === 'foldable';
  const isWide      = isFoldable || isLandscape;
  const showBottomNav = features.bottomNav !== false;
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      if (ex) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { product, quantity: qty }];
    });
    const shortName = product.name.split(' ').slice(0, 2).join(' ');
    setToast(`${shortName} added to cart`);
    setTimeout(() => setToast(null), 2200);
  };

  const removeFromCart = (idx) => setCartItems(prev => prev.filter((_, i) => i !== idx));

  const changeQuantity = (idx, newQty) => {
    if (newQty < 1) { removeFromCart(idx); return; }
    setCartItems(prev => prev.map((item, i) => i === idx ? { ...item, quantity: newQty } : item));
  };

  const navigate = (tab) => {
    setScreen(tab);
    setSelectedProduct(null);
  };

  const renderContent = () => {
    if (screen === 'profile' && features.profile) return <ProfileScreen />;
    if (screen === 'success') return <SuccessScreen onContinue={() => { setScreen('home'); setCartItems([]); }} />;
    if (screen === 'cart' && features.cart) {
      return <CartScreen cartItems={cartItems} onRemove={removeFromCart} onQuantityChange={changeQuantity} onCheckout={() => setScreen('checkout')} />;
    }
    if (screen === 'checkout') {
      return <CheckoutScreen cartItems={cartItems} onBack={() => setScreen('cart')} onPlaceOrder={() => setScreen('success')} />;
    }

    /* Wide dual-pane (foldable + landscape) */
    if (isWide && (screen === 'home' || screen === 'detail')) {
      return (
        <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
          <div style={{ flex: isFoldable ? 1.4 : 1.2, borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }}>
            <HomeScreen
              products={appConfig.products} appConfig={appConfig}
              onProductSelect={p => { setSelectedProduct(p); setQuantity(1); setScreen('detail'); }}
              onAddToCart={addToCart}
              isExpanded={isFoldable}
              isNarrow={isFoldable ? !!selectedProduct : true}
              isActive={screen === 'home'}
              compact={isLandscape}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, background: 'var(--m3-surface)', overflow: 'hidden' }}>
            {selectedProduct
              ? <ProductDetailScreen
                  product={selectedProduct} quantity={quantity} setQuantity={setQuantity}
                  isFoldableSidePane onAddToCart={addToCart}
                  onBack={() => { setSelectedProduct(null); setScreen('home'); }}
                  compact={isLandscape}
                />
              : <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--m3-on-surface-variant)', fontSize: '0.82rem' }}>
                  Tap a product to preview
                </div>
            }
          </div>
        </div>
      );
    }

    if (screen === 'detail' && selectedProduct) {
      return <ProductDetailScreen product={selectedProduct} quantity={quantity} setQuantity={setQuantity} onAddToCart={addToCart} onBack={() => setScreen('home')} />;
    }

    return (
      <HomeScreen
        products={appConfig.products} appConfig={appConfig}
        onProductSelect={p => { setSelectedProduct(p); setQuantity(1); setScreen('detail'); }}
        onAddToCart={addToCart} isExpanded={false} isActive={screen === 'home'}
      />
    );
  };

  const activeNavTab = (screen === 'home' || screen === 'detail') ? 'home' : screen === 'profile' ? 'profile' : 'cart';
  const showNav = showBottomNav && ['home', 'cart', 'profile', 'detail'].includes(screen);

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: isWide ? 'row' : 'column' }}>
      {isWide && showNav && <NavRail activeTab={activeNavTab} onTabChange={navigate} features={features} cartCount={cartCount} />}

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="phone-status-bar">
          <span>9:30</span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <span style={{ fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.05em' }}>●●●</span>
            <span style={{ fontSize: '0.52rem', fontWeight: 800 }}>100%</span>
          </div>
        </div>

        {toast && <Toast message={toast} />}

        {renderContent()}

        {!isWide && showNav && (
          <BottomNav activeTab={activeNavTab} onTabChange={navigate} features={features} cartCount={cartCount} />
        )}
      </div>
    </div>
  );
};

export default EcommercePreview;
