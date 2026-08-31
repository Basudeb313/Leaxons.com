import React from 'react';
import { Sparkles, ArrowUpRight, Check, Eye } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { ProductCategory, ProductVariant } from '../types';

interface CategoryGridProps {
  onSelectCategory: (categoryId: ProductCategory) => void;
  onQuickCustomize: (categoryId: ProductCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onQuickCustomize,
}) => {
  const coreCategories = CATEGORIES.filter((c) => c.isCore);

  const priceMapping: { [key: string]: string } = {
    'custom-tshirts': '₹549',
    'custom-caps': '₹399',
    'custom-mugs': '₹299',
    'custom-keychains': '₹149',
    'custom-mousepads': '₹449',
    'photo-frames': '₹699',
  };

  return (
    <section id="categories-section" className="py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              <span>01 / Core Merch Studio</span>
              <span className="w-8 h-px bg-neutral-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-neutral-950">
              Shop by Category
            </h2>
            <p className="mt-2 text-base text-neutral-600 max-w-xl">
              Choose your blank canvas. Premium materials precision-calibrated for custom printing and embroidery.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>6 Core Categories Ready for 3D Customization</span>
          </div>
        </div>

        {/* 6 Category Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreCategories.map((category) => (
            <div
              key={category.id}
              id={`cat-card-${category.id}`}
              className="group relative bg-[#fafafa] rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-neutral-900 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Top Image Preview & Badge */}
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge top left */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-white/60">
                    {category.badge || 'Popular'}
                  </span>
                </div>

                {/* Price starting from top right */}
                <div className="absolute top-4 right-4">
                  <span className="bg-neutral-950/80 backdrop-blur-md text-white text-xs font-mono font-medium px-2.5 py-1 rounded-full border border-neutral-700">
                    From {priceMapping[category.id] || '₹299'}
                  </span>
                </div>

                {/* Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase font-mono tracking-wider text-neutral-300">
                    {category.tagline}
                  </p>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-white mt-0.5">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Card Body & Description */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                  <button
                    onClick={() => onQuickCustomize(category.id)}
                    className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Customize Live</span>
                  </button>

                  <button
                    onClick={() => onSelectCategory(category.id)}
                    className="p-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 transition-colors flex items-center justify-center cursor-pointer"
                    title="View Collection"
                    aria-label={`View ${category.name} Collection`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
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
