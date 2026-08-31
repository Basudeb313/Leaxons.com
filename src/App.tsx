import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { HowItWorks } from './components/HowItWorks';
import { BestSellers } from './components/BestSellers';
import { FutureCategoryVault } from './components/FutureCategoryVault';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductCustomizer } from './components/ProductCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPortal } from './components/AdminPortal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AIImageStudioModal } from './components/AIImageStudioModal';
import { PRODUCTS, CATEGORIES } from './data/catalog';
import { ProductVariant, CategoryInfo, ProductCategory, CartItem, Order } from './types';

export default function App() {
  const [products, setProducts] = useState<ProductVariant[]>(PRODUCTS);
  const [categories, setCategories] = useState<CategoryInfo[]>(CATEGORIES);
  const [selectedProduct, setSelectedProduct] = useState<ProductVariant | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [initialAiDesign, setInitialAiDesign] = useState<{ content: string; prompt?: string } | undefined>(undefined);
  
  // Cart & Modals state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);

  // Sync with backend API
  const refreshCatalog = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/categories').then(r => r.json())
      ]);
      if (prodRes.success && prodRes.products) {
        setProducts(prodRes.products);
      }
      if (catRes.success && catRes.categories) {
        setCategories(catRes.categories);
      }
    } catch (err) {
      console.warn('Using local fallback catalog data:', err);
    }
  };

  useEffect(() => {
    refreshCatalog();
  }, []);

  // Add to cart handler
  const handleAddToCart = (itemData: Omit<CartItem, 'id' | 'addedAt'>) => {
    const newItem: CartItem = {
      ...itemData,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      addedAt: Date.now()
    };
    setCartItems(prev => [newItem, ...prev]);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectCategory = (catId: ProductCategory | 'all') => {
    setSelectedCategory(catId);
    setSelectedProduct(null);
    setInitialAiDesign(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickCustomize = (catId: ProductCategory) => {
    const match = products.find(p => p.categoryId === catId);
    if (match) {
      setSelectedProduct(match);
      setInitialAiDesign(undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartCustomizing = () => {
    // Default to the flagship 240 GSM Oversized T-shirt
    const flagship = products.find(p => p.id === 'lx-tee-oversized') || products[0];
    setSelectedProduct(flagship);
    setInitialAiDesign(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyAiDesignToProduct = (product: ProductVariant, designUrl: string, prompt: string) => {
    setSelectedProduct(product);
    setInitialAiDesign({ content: designUrl, prompt });
    setIsAiStudioOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
      {/* Sticky Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setInitialAiDesign(undefined);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        products={products}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onStartCustomizing={handleStartCustomizing}
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedProduct ? (
          /* Live Interactive Product Customizer & Details Page */
          <ProductCustomizer
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBackToCatalog={() => {
              setSelectedProduct(null);
              setInitialAiDesign(undefined);
            }}
            initialDesignLayer={initialAiDesign}
          />
        ) : (
          /* D2C Homepage Experience */
          <>
            {/* Hero Banner with 3D Rotating Products Background */}
            <HeroBanner
              onStartCustomizing={handleStartCustomizing}
              onExploreCategories={() => {
                const el = document.getElementById('categories-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAiStudio={() => setIsAiStudioOpen(true)}
            />

            {/* Shop by Category (6 Core Categories) */}
            <CategoryGrid
              onSelectCategory={handleSelectCategory}
              onQuickCustomize={handleQuickCustomize}
            />

            {/* How It Works (3 Steps) */}
            <HowItWorks onStartCustomizing={handleStartCustomizing} />

            {/* Best Sellers Carousel & Grid */}
            <BestSellers
              products={products}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setInitialAiDesign(undefined);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickCustomize={(prodId) => {
                const found = products.find(p => p.id === prodId);
                if (found) {
                  setSelectedProduct(found);
                  setInitialAiDesign(undefined);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />

            {/* Future Category Preview Vault (Coming Soon) */}
            <FutureCategoryVault />

            {/* Reviews and Trusted by 10k+ Customers */}
            <ReviewsSection />
          </>
        )}
      </main>

      {/* National D2C Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onStartCustomizing={handleStartCustomizing}
      />

      {/* Multi-Step Checkout Modal (Razorpay, UPI, COD) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(order) => {
          // Keep state clean
        }}
        onClearCart={() => setCartItems([])}
      />

      {/* Admin Extensibility & Product Management Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        categories={categories}
        products={products}
        onRefreshCatalog={refreshCatalog}
      />

      {/* AI Image Studio Modal */}
      <AIImageStudioModal
        isOpen={isAiStudioOpen}
        onClose={() => setIsAiStudioOpen(false)}
        products={products}
        onSelectProductWithDesign={handleApplyAiDesignToProduct}
      />

      {/* Floating WhatsApp Quick Order & Support Widget */}
      <WhatsAppFloatingButton />
    </div>
  );
}
