import React, { useState } from 'react';
import { Star, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { ProductVariant, ProductCategory } from '../types';

interface BestSellersProps {
  products: ProductVariant[];
  onSelectProduct: (product: ProductVariant) => void;
  onQuickCustomize: (productId: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onSelectProduct,
  onQuickCustomize,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', name: 'All Best Sellers' },
    { id: 'custom-tshirts', name: 'T-Shirts' },
    { id: 'custom-mugs', name: 'Mugs' },
    { id: 'custom-caps', name: 'Caps' },
    { id: 'custom-keychains', name: 'Keychains' },
    { id: 'custom-mousepads', name: 'Desk Mats' },
    { id: 'photo-frames', name: 'Frames' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.categoryId === selectedFilter;
  });

  return (
    <section className="py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              <span>02 / National Favorites</span>
              <span className="w-8 h-px bg-neutral-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-neutral-950">
              Best Sellers Carousel
            </h2>
            <p className="mt-2 text-base text-neutral-600">
              India's top rated custom merchandise crafted with bio-washed cotton, ceramic and acrylic.
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#fafafa] rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-neutral-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image Area */}
              <div 
                className="relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.mockupImages.front}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge */}
                {product.tag && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-neutral-950 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-neutral-900 border border-white/80 shadow-2xs">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>

                {/* Color swatches preview on hover */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full shadow-2xs border border-white/60">
                  {product.colors.slice(0, 4).map((c, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-[9px] font-mono text-neutral-600">+{product.colors.length - 4}</span>
                  )}
                </div>
              </div>

              {/* Product Info & CTA */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    {product.categoryName}
                  </p>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="text-base font-bold text-neutral-900 mt-1 hover:text-neutral-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* Pricing */}
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-neutral-950 font-mono">
                      ₹{product.salePrice}
                    </span>
                    {product.basePrice > product.salePrice && (
                      <span className="text-xs text-neutral-400 line-through font-mono">
                        ₹{product.basePrice}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-emerald-600 font-mono">
                      Save ₹{product.basePrice - product.salePrice}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Customize Live</span>
                  </button>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-medium cursor-pointer"
                    title="View Details"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
