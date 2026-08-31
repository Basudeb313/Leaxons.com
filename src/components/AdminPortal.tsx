import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Package, 
  Layers, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  Truck, 
  DollarSign,
  Tag,
  Sliders
} from 'lucide-react';
import { CategoryInfo, ProductVariant, ProductCategory, Order } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryInfo[];
  products: ProductVariant[];
  onRefreshCatalog: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  categories,
  products,
  onRefreshCatalog,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'expansion'>('products');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New Product Form State
  const [newProductName, setNewProductName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState<ProductCategory>('custom-tshirts');
  const [newBasePrice, setNewBasePrice] = useState('699');
  const [newSalePrice, setNewSalePrice] = useState('549');
  const [newTag, setNewTag] = useState('New Drop');
  const [newDescription, setNewDescription] = useState('Premium custom printed merchandise on high-durability blanks.');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800');
  const [newTemplate, setNewTemplate] = useState('tshirt');

  // Load orders
  useEffect(() => {
    if (isOpen) {
      fetch('/api/orders')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setOrders(data.orders);
        })
        .catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload: Partial<ProductVariant> = {
        name: newProductName,
        categoryId: newCategoryId,
        basePrice: parseFloat(newBasePrice),
        salePrice: parseFloat(newSalePrice),
        tag: newTag,
        description: newDescription,
        mockupTemplate: newTemplate,
        mockupImages: {
          front: newImageUrl
        },
        colors: [
          { name: 'Obsidian Black', hex: '#111111', textColor: '#ffffff' },
          { name: 'Optic White', hex: '#ffffff', textColor: '#111111' },
          { name: 'Sage Olive', hex: '#4a5342', textColor: '#ffffff' }
        ],
        sizes: newTemplate === 'tshirt' ? ['S', 'M', 'L', 'XL', '2XL'] : ['Standard']
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setFeedback('✅ New product published live to catalog without redesign!');
        setNewProductName('');
        onRefreshCatalog();
        setTimeout(() => setFeedback(null), 3500);
      }
    } catch (err) {
      setFeedback('❌ Error creating product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleCategoryCore = async (cat: CategoryInfo) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cat.id,
          name: cat.name,
          isUpcoming: !cat.isUpcoming,
          isCore: cat.isUpcoming
        })
      });
      if (res.ok) {
        onRefreshCatalog();
        setFeedback(`Updated status for ${cat.name}`);
        setTimeout(() => setFeedback(null), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200 my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">Leaxons Admin & Expansion Engine</h2>
              <p className="text-xs text-neutral-400">Multi-Category Architecture • Add 500+ Products Easily</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-neutral-50 border-b border-neutral-200 px-6 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-neutral-950 text-neutral-950 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Products (Catalog Engine)</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'border-neutral-950 text-neutral-950 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Category Vault & Expansion</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-neutral-950 text-neutral-950 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Live Orders ({orders.length})</span>
          </button>
        </div>

        {/* Feedback Bar */}
        {feedback && (
          <div className="bg-emerald-50 px-6 py-2 border-b border-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* TAB 1: ADD PRODUCTS FORM */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form onSubmit={handleAddProduct} className="lg:col-span-7 flex flex-col gap-4">
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                    D2C Extensibility Pattern
                  </span>
                  <p className="text-xs text-neutral-600">
                    Add new products seamlessly across active or upcoming categories (Toys, Gadgets, Fashion, Electronics, Lifestyle) without layout alterations.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Acid-Wash Boxy Heavyweight Hoodie"
                    className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Category Target *</label>
                    <select
                      value={newCategoryId}
                      onChange={(e) => setNewCategoryId(e.target.value as ProductCategory)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.isUpcoming ? '(Upcoming Vault)' : '(Active)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Mockup Visualizer Form</label>
                    <select
                      value={newTemplate}
                      onChange={(e) => setNewTemplate(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                    >
                      <option value="tshirt">T-Shirt / Apparel (Front & Back)</option>
                      <option value="cap">Cap / Headwear</option>
                      <option value="mug">Ceramic Mug (Panoramic)</option>
                      <option value="keychain">Acrylic / Metal Keychain</option>
                      <option value="mousepad">Gaming Mousepad / Desk Mat</option>
                      <option value="frame">Photo Frame / Art Canvas</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Base MRP (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newBasePrice}
                      onChange={(e) => setNewBasePrice(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Sale Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newSalePrice}
                      onChange={(e) => setNewSalePrice(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Tag Badge</label>
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="e.g. Bestseller"
                      className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">High-Res Mockup Image URL</label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Product Description</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Product Instantly</span>
                </button>
              </form>

              {/* Right: Existing Products Quick Inventory */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-neutral-900 uppercase font-mono tracking-wider">
                    Current Catalog ({products.length} Items)
                  </h3>
                  <span className="text-[11px] text-neutral-500">Live in D2C Store</span>
                </div>

                <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto border border-neutral-200 rounded-2xl bg-neutral-50/50 p-2">
                  {products.map((p) => (
                    <div key={p.id} className="py-2.5 px-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.mockupImages.front}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-neutral-100"
                        />
                        <div>
                          <p className="font-bold text-neutral-900 line-clamp-1">{p.name}</p>
                          <p className="text-[11px] text-neutral-500">{p.categoryName} • ₹{p.salePrice}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORY EXPANSION VAULT */}
          {activeTab === 'categories' && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-neutral-600">
                Manage category states. You can unlock future categories (Toys, Gadgets, Fashion, Electronics, Lifestyle) or toggle core lines with a single click.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-neutral-900">{cat.name}</p>
                        <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold ${
                          cat.isUpcoming ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {cat.isUpcoming ? 'Vault (Preview)' : 'Core Active'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleCategoryCore(cat)}
                      className="text-xs bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      {cat.isUpcoming ? 'Activate' : 'Move to Vault'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-900 uppercase font-mono tracking-wider">
                  Shiprocket Logistics & Order Pipeline
                </h3>
                <span className="text-xs text-neutral-500 font-mono">
                  Total Orders: {orders.length}
                </span>
              </div>

              <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-neutral-950 font-mono">{ord.orderNumber}</span>
                        <span className="text-xs text-neutral-500">• {ord.customer.fullName} ({ord.customer.phone})</span>
                        <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-mono uppercase font-bold">
                          {ord.paymentMethod}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Destination: {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode}) • Total: <strong>₹{ord.total}</strong>
                      </p>
                      <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                        Shiprocket AWB: {ord.trackingNumber} ({ord.courierPartner})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {ord.orderStatus === 'received' ? 'Order Received' : ord.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
