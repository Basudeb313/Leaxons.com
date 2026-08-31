import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  Plus
} from 'lucide-react';
import { ProductCategory, ProductVariant } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (categoryId: ProductCategory | 'all') => void;
  onSelectProduct: (product: ProductVariant) => void;
  products: ProductVariant[];
  onOpenAdmin: () => void;
  onStartCustomizing: () => void;
  onOpenAiStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  onSelectProduct,
  products,
  onOpenAdmin,
  onStartCustomizing,
  onOpenAiStudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const coreCategories: { id: ProductCategory; name: string }[] = [
    { id: 'custom-tshirts', name: 'T-Shirts' },
    { id: 'custom-caps', name: 'Caps' },
    { id: 'custom-mugs', name: 'Mugs' },
    { id: 'custom-keychains', name: 'Keychains' },
    { id: 'custom-mousepads', name: 'Mousepads' },
    { id: 'photo-frames', name: 'Photo Frames' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top D2C National Announcement Bar */}
      <div className="bg-neutral-950 text-neutral-200 text-xs py-2 px-4 flex items-center justify-between border-b border-neutral-800 tracking-tight">
        <div className="hidden sm:flex items-center gap-4 text-neutral-400">
          <span className="flex items-center gap-1.5 text-white font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Pan-India Express Delivery
          </span>
          <span className="text-neutral-500">|</span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-neutral-300" />
            Free Shipping on Orders ₹999+
          </span>
        </div>

        <div className="mx-auto sm:mx-0 flex items-center gap-2 font-mono text-[11px] text-neutral-300">
          <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded font-bold">COD & UPI</span>
          <span>Fast Turnaround • 300 DPI Ultra HD Prints</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-neutral-400">
          <button 
            onClick={onOpenAdmin}
            id="nav-admin-portal-btn"
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            <span>Admin Portal</span>
          </button>
          <span className="text-neutral-700">|</span>
          <span className="text-neutral-300 font-medium">🇮🇳 INR (₹)</span>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'apple-glass border-b border-neutral-200/80 shadow-xs py-3'
            : 'bg-white/90 backdrop-blur-md border-b border-neutral-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}
              id="brand-logo-link"
              className="flex flex-col group cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tighter text-neutral-950 group-hover:opacity-80 transition-opacity">
                  Leaxons
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 mb-0.5" />
              </div>
              <span className="text-[10px] font-medium tracking-widest uppercase text-neutral-500 font-mono -mt-1">
                Make It Yours
              </span>
            </a>

            {/* Desktop Category Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-600">
              {coreCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className="hover:text-neutral-950 transition-colors py-1 relative group cursor-pointer"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 group-hover:w-full transition-all duration-200" />
                </button>
              ))}
              <button
                onClick={() => {
                  const el = document.getElementById('future-vault-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200"
              >
                <span>Vault</span>
                <span className="text-[10px] bg-neutral-900 text-white px-1.5 py-0.2 rounded-full font-mono">Soon</span>
              </button>
            </nav>
          </div>

          {/* Search, Action Buttons & Cart */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Desktop Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              id="search-trigger-btn"
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 px-3.5 py-2 rounded-full text-xs transition-all w-36 sm:w-56 justify-between cursor-pointer border border-transparent hover:border-neutral-200"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="truncate">Search custom tees, mugs...</span>
              </div>
              <kbd className="hidden sm:inline-block text-[10px] bg-white text-neutral-400 px-1.5 py-0.5 rounded shadow-2xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Direct WhatsApp Order Button */}
            <a
              href="https://wa.me/919876543210?text=Hi%20Leaxons%2C%20I%20want%20to%20place%20a%20custom%20print%20order%20for%20my%20merchandise!"
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-header-btn"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-full transition-all shadow-2xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp Order</span>
            </a>

            {/* AI Art Studio Fast CTA */}
            {onOpenAiStudio && (
              <button
                onClick={onOpenAiStudio}
                id="header-ai-studio-btn"
                className="hidden lg:flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-xs cursor-pointer border border-neutral-700/60"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>AI Art Studio</span>
                <span className="bg-amber-400 text-neutral-950 text-[9px] font-mono uppercase px-1.5 py-0.2 rounded-full font-bold">New</span>
              </button>
            )}

            {/* Start Customizing Fast CTA */}
            <button
              onClick={onStartCustomizing}
              id="header-start-customize-btn"
              className="hidden md:flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium px-4 py-2 rounded-full transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Studio</span>
            </button>

            {/* Cart Icon Button */}
            <button
              onClick={onOpenCart}
              id="nav-cart-btn"
              aria-label="View Cart"
              className="relative p-2.5 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-neutral-950 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden p-2 text-neutral-800 hover:bg-neutral-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-xl px-4 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold">
              Explore Categories
            </p>
            <div className="grid grid-cols-2 gap-2">
              {coreCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-left text-sm font-medium text-neutral-900 border border-neutral-100"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
              {onOpenAiStudio && (
                <button
                  onClick={() => {
                    onOpenAiStudio();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xs border border-neutral-700/80 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Generate Custom AI Artwork</span>
                  <span className="bg-amber-400 text-neutral-950 text-[10px] font-mono px-1.5 py-0.5 rounded-full font-extrabold">NEW</span>
                </button>
              )}

              <button
                onClick={() => {
                  onStartCustomizing();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-neutral-950 text-white text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Open 3D Live Customizer</span>
              </button>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Chat & Order on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onOpenAdmin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-neutral-100 text-neutral-700 text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
                <span>Admin Catalog & Order Panel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Search Input Box */}
            <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products: 'oversized tee', 'magic mug', 'acrylic keychain'..."
                className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results List */}
            <div className="max-h-96 overflow-y-auto p-4">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                    Popular Custom Print Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Oversized T-shirt 240 GSM', 'Magic Coffee Mug', 'Structured Cap', 'Clear Acrylic Keychain', 'Speed Desk Mat', 'Acrylic Frame'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="divide-y divide-neutral-100">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="py-3 px-2 flex items-center justify-between hover:bg-neutral-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.mockupImages.front}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-neutral-100"
                        />
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">{product.name}</p>
                          <p className="text-xs text-neutral-500">{product.categoryName} • From ₹{product.salePrice}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-full">
                        Customize →
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-neutral-500">
                  <p className="text-sm">No products found for "{searchQuery}"</p>
                  <p className="text-xs text-neutral-400 mt-1">Try searching for T-shirts, Caps, Mugs, or Keychains</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
