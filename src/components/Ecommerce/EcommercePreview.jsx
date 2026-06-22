import React, { useState } from 'react';
import {
  Smartphone,
  ChevronLeft,
  ShoppingCart,
  Home as HomeIcon,
  User,
  Clock,
  Search,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

// --- ECOMMERCE COMPONENTS ---

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

// --- SCREENS ---

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

// --- MAIN PREVIEW COMPONENT ---

const EcommercePreview = ({ appConfig, orientation }) => {
  const [current_screen, setCurrentScreen] = useState('home');
  const [selected_product, setSelectedProduct] = useState(null);
  const [cart_items, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

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
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: isExpanded ? 'row' : 'column' }}>
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
  );
};

export default EcommercePreview;
