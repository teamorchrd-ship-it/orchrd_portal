import { useState, useEffect } from 'react';
import orchrdLogo from '../Orchrd_logo_no_bg.png';
import IntroScreen from './components/IntroScreen';
import OutroScreen from './components/OutroScreen';
import {
  Smartphone,
  Plus,
  Trash2,
  Check,
  ChevronLeft,
  ShoppingCart,
  Home as HomeIcon,
  User,
  Package,
  Moon,
  Sun,
  CheckCircle2,
  Clock,
  Settings,
  MoreHorizontal,
  Search,
  ArrowRight,
  ChevronRight,
  Star,
  Image as ImageIcon
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
  
  // Material 3 Tonal Palette Logic (Improved for Tonal Surface)
  if (!isDark) {
    colors['--m3-primary'] = hslToHex(h, s, 40);
    colors['--m3-on-primary'] = '#ffffff';
    colors['--m3-primary-container'] = hslToHex(h, s, 90);
    colors['--m3-on-primary-container'] = hslToHex(h, s, 10);
    
    colors['--m3-secondary'] = hslToHex(h, Math.max(0, s - 30), 40);
    colors['--m3-on-secondary'] = '#ffffff';
    colors['--m3-secondary-container'] = hslToHex(h, Math.max(0, s - 30), 90);
    colors['--m3-on-secondary-container'] = hslToHex(h, Math.max(0, s - 30), 10);

    // Surface tonal: using primary hue with low saturation and very high lightness
    colors['--m3-surface'] = hslToHex(h, Math.round(s * 0.08), 98);
    colors['--m3-on-surface'] = hslToHex(h, Math.round(s * 0.12), 10);
    colors['--m3-surface-variant'] = hslToHex(h, Math.round(s * 0.12), 94);
    colors['--m3-on-surface-variant'] = hslToHex(h, Math.round(s * 0.12), 30);
    
    // Tonal surface background often used in Android
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

const MOCK_PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 59, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop" },
  { id: 2, name: "Smart Watch", price: 120, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop" },
  { id: 3, name: "Running Shoes", price: 80, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop" },
  { id: 4, name: "Backpack", price: 45, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop" },
  { id: 5, name: "Bluetooth Speaker", price: 35, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop" },
  { id: 6, name: "Sunglasses", price: 25, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop" }
];

// --- ALLOWED COMPONENTS ---

const SearchBar = () => (
  <div className="search_bar" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--m3-surface-variant)', padding: '10px 16px', borderRadius: '24px', margin: '12px 16px 8px 16px', gap: '8px' }}>
    <Search size={18} style={{ color: 'var(--m3-on-surface-variant)' }} />
    <span className="text" style={{ color: 'var(--m3-on-surface-variant)', fontSize: '0.85rem' }}>Search products...</span>
  </div>
);

const Banner = ({ isFoldable }) => (
  <div className="banner" style={{ margin: '24px 16px', height: isFoldable ? '120px' : '180px', borderRadius: '24px', backgroundColor: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ color: 'var(--m3-on-primary-container)', textAlign: 'center' }}>
      <span className="text" style={{ fontWeight: '800', fontSize: isFoldable ? '1rem' : '1.1rem', display: 'block', marginBottom: '4px' }}>Special Promotion</span>
      <span className="text" style={{ fontSize: isFoldable ? '0.8rem' : '0.85rem', opacity: 0.9 }}>Up to 50% Off Selected Items</span>
    </div>
  </div>
);

const CategoryRow = () => {
  const categories = ["All", "Tech", "Wearables", "Footwear", "Accessories"];
  return (
    <div className="category_row" style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', padding: '16px 16px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
      {categories.map((cat, idx) => (
        <div key={cat} style={{ padding: '12px 24px', borderRadius: '16px', backgroundColor: idx === 0 ? 'var(--m3-primary)' : 'var(--m3-surface-variant)', color: idx === 0 ? 'var(--m3-on-primary)' : 'var(--m3-on-surface-variant)', fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {cat}
        </div>
      ))}
    </div>
  );
};

const ImagePlaceholder = ({ src, alt, height }) => (
  <div className="image_placeholder" style={{ width: '100%', height: height || '120px', backgroundColor: 'var(--m3-surface-variant)', overflow: 'hidden', position: 'relative', flexShrink: 0, borderRadius: '16px' }}>
    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
  </div>
);

const ProductCard = ({ product, onSelect, onAdd }) => (
  <div className="product_card" onClick={() => onSelect(product)} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--m3-surface-variant)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '220px', justifyContent: 'space-between', border: '1px solid var(--m3-outline-variant)' }}>
    <ImagePlaceholder src={product.image} alt={product.name} height="110px" />
    <div style={{ padding: '8px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <span className="text" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--m3-on-surface-variant)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.2' }}>
          {product.name}
        </span>
        <span className="text" style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--m3-primary)', marginTop: '4px', display: 'block' }}>
          ${product.price}
        </span>
      </div>
      <button className="button" onClick={(e) => { e.stopPropagation(); onAdd(product); }} style={{ alignSelf: 'flex-end', backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>
        Add
      </button>
    </div>
  </div>
);

const ProductGrid = ({ products, onProductSelect, onAddToCart, cols }) => {
  const gridCols = cols || '1fr 1fr';
  return (
    <div className="product_grid" style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '12px', padding: '12px 16px' }}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onSelect={onProductSelect} onAdd={onAddToCart} />
      ))}
    </div>
  );
};

const QuantitySelector = ({ val, onDec, onInc }) => (
  <div className="quantity_selector" style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '16px 0' }}>
    <button className="button" onClick={onDec} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--m3-outline)', backgroundColor: 'transparent', color: 'var(--m3-on-bg)', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>-</button>
    <span className="text" style={{ fontSize: '1rem', fontWeight: '600' }}>{val}</span>
    <button className="button" onClick={onInc} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--m3-outline)', backgroundColor: 'transparent', color: 'var(--m3-on-bg)', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
  </div>
);

const CartItem = ({ item }) => (
  <div className="cart_item" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--m3-outline-variant)' }}>
    <div>
      <span className="text" style={{ fontWeight: '600', fontSize: '0.9rem', display: 'block' }}>{item.product.name}</span>
      <span className="text" style={{ fontSize: '0.8rem', opacity: 0.7 }}>Qty: {item.quantity}</span>
    </div>
    <span className="text" style={{ fontWeight: '700', color: 'var(--m3-primary)' }}>${item.product.price * item.quantity}</span>
  </div>
);

const TextField = ({ label, placeholder, value, onChange }) => (
  <div className="text_field" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
    <span className="text" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--m3-on-surface-variant)' }}>{label}</span>
    <input type="text" placeholder={placeholder} value={value} onChange={onChange} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--m3-outline)', borderRadius: '8px', fontSize: '0.9rem', backgroundColor: 'var(--m3-surface)', color: 'var(--m3-on-surface)' }} />
  </div>
);

const BottomNav = ({ activeTab, onTabChange }) => (
  <div className="bottom_nav" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '64px', backgroundColor: 'var(--m3-surface-variant)', borderTop: '1px solid var(--m3-outline-variant)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10 }}>
    <button className="button" onClick={() => onTabChange('home')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'home' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <HomeIcon size={20} fill={activeTab === 'home' ? 'currentColor' : 'none'} />
      <span className="text" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Home</span>
    </button>
    <button className="button" onClick={() => onTabChange('cart')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'cart' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <ShoppingCart size={20} fill={activeTab === 'cart' ? 'currentColor' : 'none'} />
      <span className="text" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Cart</span>
    </button>
    <button className="button" onClick={() => onTabChange('profile')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: activeTab === 'profile' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <User size={20} fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
      <span className="text" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Profile</span>
    </button>
  </div>
);

const NavigationRail = ({ activeTab, onTabChange }) => (
  <div className="navigation_rail" style={{ width: '72px', height: '100%', backgroundColor: 'var(--m3-surface-variant)', borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '24px', gap: '24px', zIndex: 10 }}>
    <button className="button" onClick={() => onTabChange('home')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'home' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <HomeIcon size={20} fill={activeTab === 'home' ? 'currentColor' : 'none'} />
      <span className="text" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Home</span>
    </button>
    <button className="button" onClick={() => onTabChange('cart')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'cart' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <ShoppingCart size={20} fill={activeTab === 'cart' ? 'currentColor' : 'none'} />
      <span className="text" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Cart</span>
    </button>
    <button className="button" onClick={() => onTabChange('profile')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'profile' ? 'var(--m3-primary)' : 'var(--m3-on-surface-variant)' }}>
      <User size={20} fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
      <span className="text" style={{ fontSize: '0.65rem', fontWeight: '600' }}>Profile</span>
    </button>
  </div>
);

// --- SEPARATE SCREENS (STRICT) ---

const HomeScreen = ({ products, onProductSelect, onAddToCart, isExpanded, isNarrow, appConfig }) => {
  const cols = isNarrow ? '1fr 1fr' : (isExpanded ? '1fr 1fr 1fr' : '1fr 1fr');
  return (
    <div className="app-body" style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
      <div style={{ padding: '20px 16px 8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--m3-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src={appConfig.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span className="text" style={{ fontWeight: '900', fontSize: '1.25rem', color: 'var(--m3-on-bg)', letterSpacing: '-0.5px' }}>{appConfig.appName}</span>
      </div>
      <SearchBar />
      <Banner isFoldable={isExpanded} />
      <CategoryRow />
      <ProductGrid products={products} onProductSelect={onProductSelect} onAddToCart={onAddToCart} cols={cols} />
    </div>
  );
};

const ProductDetailScreen = ({ product, quantity, setQuantity, onAddToCart, onBack, isFoldableSidePane }) => (
  <div className="app-body" style={{ flex: 1, overflowY: 'auto', padding: '64px 16px 16px 16px' }}>
    <button className="button" onClick={onBack} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--m3-primary)', marginBottom: '16px', fontWeight: '600' }}>
      <ChevronLeft size={16} /> {isFoldableSidePane ? 'Close' : 'Back'}
    </button>
    <ImagePlaceholder src={product.image} alt={product.name} height="220px" />
    <div style={{ marginTop: '16px' }}>
      <span className="text" style={{ fontSize: '1.4rem', fontWeight: '700', display: 'block', color: 'var(--m3-on-bg)' }}>{product.name}</span>
      <span className="text" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--m3-primary)', display: 'block', margin: '8px 0' }}>${product.price}</span>
      <span className="text" style={{ fontSize: '0.85rem', color: 'var(--m3-on-bg)', opacity: 0.8, display: 'block', marginBottom: '16px' }}>
        Wireless convenience and great audio representation in a robust design format.
      </span>
      <span className="text" style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--m3-on-surface-variant)' }}>Quantity</span>
      <QuantitySelector val={quantity} onDec={() => setQuantity(Math.max(1, quantity - 1))} onInc={() => setQuantity(quantity + 1)} />
      <button className="button" onClick={() => onAddToCart(product, quantity)} style={{ width: '100%', backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', marginTop: '16px' }}>
        Add to Cart
      </button>
    </div>
  </div>
);

const CartScreen = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <div className="app-body" style={{ flex: 1, overflowY: 'auto', padding: '64px 16px 70px 16px' }}>
      <span className="text" style={{ fontSize: '1.4rem', fontWeight: '700', display: 'block', marginBottom: '16px' }}>Your Cart</span>
      {cartItems.length === 0 ? (
        <span className="text" style={{ display: 'block', textAlign: 'center', opacity: 0.6, margin: '32px 0' }}>Your cart is empty</span>
      ) : (
        <div>
          {cartItems.map((item, idx) => (
            <CartItem key={idx} item={item} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '2px solid var(--m3-outline-variant)', marginTop: '16px' }}>
            <span className="text" style={{ fontWeight: '700', fontSize: '1rem' }}>Total:</span>
            <span className="text" style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--m3-primary)' }}>${total}</span>
          </div>
          <button className="button" onClick={onCheckout} style={{ width: '100%', backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '16px' }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const CheckoutScreen = ({ name, address, onNameChange, onAddressChange, cartItems, onPlaceOrder }) => {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <div className="app-body" style={{ flex: 1, overflowY: 'auto', padding: '64px 16px 70px 16px' }}>
      <span className="text" style={{ fontSize: '1.4rem', fontWeight: '700', display: 'block', marginBottom: '16px' }}>Checkout</span>
      <TextField label="Name" placeholder="Enter your name" value={name} onChange={onNameChange} />
      <TextField label="Address" placeholder="Enter your address" value={address} onChange={onAddressChange} />
      <div style={{ marginTop: '24px' }}>
        <span className="text" style={{ fontSize: '0.9rem', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Order Summary</span>
        {cartItems.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
            <span className="text">{item.product.name} x {item.quantity}</span>
            <span className="text">${item.product.price * item.quantity}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--m3-outline-variant)', paddingTop: '8px', marginTop: '8px', fontWeight: '700' }}>
          <span className="text">Total</span>
          <span className="text">${total}</span>
        </div>
      </div>
      <button className="button" onClick={onPlaceOrder} disabled={!name || !address} style={{ width: '100%', backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '24px', opacity: (!name || !address) ? 0.5 : 1 }}>
        Place Order
      </button>
    </div>
  );
};

const SuccessScreen = ({ onContinue }) => (
  <div className="app-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px 24px 24px', textAlign: 'center' }}>
    <CheckCircle2 size={64} style={{ color: 'var(--m3-primary)', marginBottom: '16px' }} />
    <span className="text" style={{ fontSize: '1.4rem', fontWeight: '700', display: 'block', color: 'var(--m3-on-bg)', marginBottom: '8px' }}>Order placed successfully</span>
    <button className="button" onClick={onContinue} style={{ backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '700', cursor: 'pointer', marginTop: '24px' }}>
      Continue shopping
    </button>
  </div>
);

// --- MAIN APP COMPONENT ---


export default function App() {
  const [portalTheme, setPortalTheme] = useState('light');
  const [step, setStep] = useState('intro');
  const [wizardStep, setWizardStep] = useState(1);
  const [appConfig, setAppConfig] = useState({ 
    appName: 'Orchrd Portal', 
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png',
    theme: { mode: 'light', primaryColor: '#6750A4' },
    products: MOCK_PRODUCTS
  });
  const [orientation, setOrientation] = useState('portrait');

  // Navigation & Screen States
  const [current_screen, setCurrentScreen] = useState('home');
  const [selected_product, setSelectedProduct] = useState(null);
  const [cart_items, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Checkout inputs
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Builder state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newP, setNewP] = useState({ name: '', price: '', image: '', desc: '', category: 'Tech' });

  useEffect(() => {
    applyM3Colors(appConfig.theme.primaryColor, appConfig.theme.mode === 'dark');
  }, [appConfig.theme.primaryColor, appConfig.theme.mode]);

  const navigateTo = (tab) => {
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'cart') {
      setCurrentScreen('cart');
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    }
    setSelectedProduct(null);
  };

  const isExpanded = orientation === 'foldable';

  const renderContent = () => {
    if (current_screen === 'profile') {
      return (
        <div className="app-body" style={{ flex: 1, padding: '64px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--m3-primary-container)', border: '4px solid var(--m3-surface-variant)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <User size={56} style={{ color: 'var(--m3-on-primary-container)' }} />
          </div>
          <span className="text" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--m3-on-bg)', marginBottom: '4px' }}>Alex Johnson</span>
          <span className="text" style={{ fontSize: '0.9rem', opacity: 0.7, color: 'var(--m3-on-bg)', marginBottom: '32px' }}>alex.johnson@example.com</span>
          
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="button" style={{ width: '100%', backgroundColor: 'var(--m3-primary)', color: 'var(--m3-on-primary)', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
              Sign In
            </button>
            <button className="button" style={{ width: '100%', backgroundColor: 'transparent', color: 'var(--m3-primary)', border: '2px solid var(--m3-primary)', borderRadius: '12px', padding: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
              Create Account
            </button>
          </div>
          
          <div style={{ width: '100%', marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {['Order History', 'Payment Methods', 'Shipping Addresses', 'Settings'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--m3-outline-variant)' }}>
                <span className="text" style={{ fontWeight: '600', color: 'var(--m3-on-bg)' }}>{item}</span>
                <ChevronRight size={18} style={{ color: 'var(--m3-on-surface-variant)' }} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (current_screen === 'cart') {
      return (
        <CartScreen 
          cartItems={cart_items} 
          onCheckout={() => setCurrentScreen('checkout')} 
        />
      );
    }

    if (current_screen === 'checkout') {
      return (
        <CheckoutScreen 
          name={name}
          address={address}
          onNameChange={(e) => setName(e.target.value)}
          onAddressChange={(e) => setAddress(e.target.value)}
          cartItems={cart_items}
          onPlaceOrder={() => {
            setCartItems([]);
            setName('');
            setAddress('');
            setCurrentScreen('success');
          }}
        />
      );
    }

    if (current_screen === 'success') {
      return (
        <SuccessScreen 
          onContinue={() => {
            setCurrentScreen('home');
          }}
        />
      );
    }

    // Foldable supporting pane logic
    if (isExpanded && (current_screen === 'home' || current_screen === 'detail')) {
      if (!selected_product) {
        return (
          <HomeScreen 
            products={appConfig.products} 
            appConfig={appConfig}
            onProductSelect={(p) => {
              setSelectedProduct(p);
              setQuantity(1);
              setCurrentScreen('detail');
            }} 
            onAddToCart={(product) => {
              const existing = cart_items.find(item => item.product.id === product.id);
              if (existing) {
                setCartItems(cart_items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
              } else {
                setCartItems([...cart_items, { product, quantity: 1 }]);
              }
              setCurrentScreen('cart');
            }}
            isExpanded={isExpanded}
            isNarrow={false}
          />
        );
      }

      return (
        <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
          <div style={{ flex: 1.4, borderRight: '1px solid var(--m3-outline-variant)', display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0 }}>
            <HomeScreen 
              products={appConfig.products} 
              appConfig={appConfig}
              onProductSelect={(p) => {
                setSelectedProduct(p);
                setQuantity(1);
                setCurrentScreen('detail');
              }} 
              onAddToCart={(product) => {
                const existing = cart_items.find(item => item.product.id === product.id);
                if (existing) {
                  setCartItems(cart_items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
                } else {
                  setCartItems([...cart_items, { product, quantity: 1 }]);
                }
                setCurrentScreen('cart');
              }}
              isExpanded={isExpanded}
              isNarrow={true}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, backgroundColor: 'var(--m3-surface)' }}>
            <ProductDetailScreen 
              product={selected_product}
              quantity={quantity}
              setQuantity={setQuantity}
              isFoldableSidePane={true}
              onAddToCart={(product, qty) => {
                const existing = cart_items.find(item => item.product.id === product.id);
                if (existing) {
                  setCartItems(cart_items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
                } else {
                  setCartItems([...cart_items, { product, quantity: qty }]);
                }
                setCurrentScreen('cart');
              }}
              onBack={() => {
                setSelectedProduct(null);
                setCurrentScreen('home');
              }}
            />
          </div>
        </div>
      );
    }

    if (current_screen === 'detail') {
      return (
        <ProductDetailScreen 
          product={selected_product}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={(product, qty) => {
            const existing = cart_items.find(item => item.product.id === product.id);
            if (existing) {
              setCartItems(cart_items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item));
            } else {
              setCartItems([...cart_items, { product, quantity: qty }]);
            }
            setCurrentScreen('cart');
          }}
          onBack={() => setCurrentScreen('home')}
        />
      );
    }

    // Default: 'home'
    return (
      <HomeScreen 
        products={appConfig.products} 
        appConfig={appConfig}
        onProductSelect={(p) => {
          setSelectedProduct(p);
          setQuantity(1);
          setCurrentScreen('detail');
        }} 
        onAddToCart={(product) => {
          const existing = cart_items.find(item => item.product.id === product.id);
          if (existing) {
            setCartItems(cart_items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
          } else {
            setCartItems([...cart_items, { product, quantity: 1 }]);
          }
          setCurrentScreen('cart');
        }}
        isExpanded={isExpanded}
      />
    );
  };

  return (
    <div id="root" className={portalTheme === 'light' ? 'portal-theme-light' : 'portal-theme-dark'}>
      <header className="portal-header">
        <div className="portal-logo"><img src={orchrdLogo} style={{ height: '32px' }} /><span>M3 Studio</span></div>
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
                  <h3>Brand & Identity</h3>
                  <div className="form-group">
                    <label className="form-label">App Logo URL</label>
                    <input className="input-field" value={appConfig.logoUrl} onChange={e => setAppConfig({...appConfig, logoUrl: e.target.value})} style={{ marginBottom: '8px' }} />
                    <label style={{ fontSize: '0.7rem', color: '#5f6368', display: 'block', marginBottom: '4px' }}>Or upload logo file:</label>
                    <input type="file" accept="image/*" onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (uploadEvent) => {
                          setAppConfig({...appConfig, logoUrl: uploadEvent.target.result});
                        };
                        reader.readAsDataURL(file);
                      }
                    }} style={{ fontSize: '0.8rem' }} />
                  </div>
                  <div className="form-group"><label className="form-label">Brand Name</label><input className="input-field" value={appConfig.appName} onChange={e => setAppConfig({...appConfig, appName: e.target.value})} /></div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: '#5f6368', flex: 1 }} onClick={() => setStep('intro')}>Back</button>
                    <button className="btn-primary" style={{ flex: 2 }} onClick={() => setWizardStep(2)}>Add Products</button>
                  </div>
                </>
              )}

              {wizardStep === 2 && (
                <>
                  <h3>Product Inventory</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {appConfig.products.map(p => (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--portal-border)', borderRadius: '16px', backgroundColor: '#fff', fontSize: '0.85rem', color: '#1a1c1e' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '6px' }} />
                          <span style={{ fontWeight: '600', color: '#1a1c1e' }}>{p.name || p.title}</span>
                        </div>
                        <Trash2 size={16} style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => setAppConfig({...appConfig, products: appConfig.products.filter(i => i.id !== p.id)})} />
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: 'var(--portal-accent)', border: '1.5px dashed var(--portal-accent)' }} onClick={() => setIsModalOpen(true)}>Add Product</button>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: '#5f6368', flex: 1 }} onClick={() => setWizardStep(1)}>Back</button>
                    <button className="btn-primary" style={{ flex: 2 }} onClick={() => setWizardStep(3)}>Configure Style</button>
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
                    <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '8px' }}>Choosing one color will automatically generate harmonious surface and container tones.</p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                    <button className="btn-primary" style={{ backgroundColor: '#f1f3f4', color: '#5f6368', flex: 1 }} onClick={() => setWizardStep(2)}>Back</button>
                    <button className="btn-primary" style={{ flex: 2 }} onClick={() => setStep('outro')}>Finalize Prototype</button>
                  </div>
                </>
              )}
           </div>
         </div>

         <div className="preview-panel">
            <div className="device-controls-bar">
              {['portrait', 'landscape', 'foldable'].map(o => <button key={o} className={`device-control-btn ${orientation === o ? 'active' : ''}`} onClick={() => { setOrientation(o); navigateTo('home'); }}>{o}</button>)}
            </div>

            <div className={`pixel-phone-shell ${orientation}`}>
              <div className="pixel-screen" style={{ display: 'flex', flexDirection: isExpanded ? 'row' : 'column' }}>
                {isExpanded && ['home', 'cart', 'profile', 'detail'].includes(current_screen) && (
                  <NavigationRail 
                    activeTab={current_screen === 'home' || current_screen === 'detail' ? 'home' : (current_screen === 'profile' ? 'profile' : 'cart')} 
                    onTabChange={navigateTo} 
                  />
                )}

                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div className="phone-status-bar"><span>9:30</span><div style={{ display: 'flex', gap: '4px' }}><Clock size={10} /><Smartphone size={10} /></div></div>

                  {renderContent()}

                  {!isExpanded && ['home', 'cart', 'profile'].includes(current_screen) && (
                    <BottomNav 
                      activeTab={current_screen === 'home' || current_screen === 'detail' ? 'home' : (current_screen === 'profile' ? 'profile' : 'cart')} 
                      onTabChange={navigateTo} 
                    />
                  )}
                  <div className="phone-home-indicator" style={{ left: '50%', transform: 'translateX(-50%)' }} />
                </div>
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
             <div style={{ marginBottom: '12px' }}>
               <label style={{ fontSize: '0.75rem', color: '#5f6368', display: 'block', marginBottom: '4px' }}>Or upload from computer:</label>
               <input type="file" accept="image/*" onChange={e => {
                 const file = e.target.files[0];
                 if (file) {
                   const reader = new FileReader();
                   reader.onload = (uploadEvent) => {
                     setNewP({...newP, image: uploadEvent.target.result});
                   };
                   reader.readAsDataURL(file);
                 }
               }} style={{ fontSize: '0.8rem' }} />
             </div>
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
