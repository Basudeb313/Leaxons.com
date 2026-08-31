import React, { useState } from 'react';
import { Lock, Sparkles, Bell, ArrowRight, Check, Eye } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';

export const FutureCategoryVault: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribedCategory, setSubscribedCategory] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const futureCategories = CATEGORIES.filter((c) => c.isUpcoming);

  const handleNotifyMe = (categoryName: string) => {
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setToastMessage('Please enter a valid email address to get early VIP access.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setSubscribedCategory(categoryName);
    setToastMessage(`🎉 You're on the VIP waitlist for ${categoryName}! We'll notify ${emailInput} first.`);
    setEmailInput('');
    setTimeout(() => {
      setToastMessage(null);
      setSubscribedCategory(null);
    }, 4000);
  };

  return (
    <section id="future-vault-section" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>The Leaxons Vault • Coming Soon</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              Future Category Preview
            </h2>
            <p className="mt-3 text-base text-neutral-400 max-w-xl">
              We are actively engineering new custom merchandise lines. Preview what's currently in R&D and join the priority access list.
            </p>
          </div>

          {/* Quick email signup box */}
          <div className="bg-neutral-900/90 p-3 rounded-2xl border border-neutral-800 flex items-center gap-2 max-w-md w-full">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email for VIP early access..."
              className="bg-transparent text-xs text-white placeholder:text-neutral-500 focus:outline-none px-3 w-full"
            />
            <button
              onClick={() => handleNotifyMe('The Entire Leaxons Vault')}
              className="bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer"
            >
              Get Early Pass
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-neutral-900 border border-amber-500/50 text-amber-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Future Category Grid Cards (Blurred & Locked) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {futureCategories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50 flex flex-col justify-between transition-all duration-300 hover:border-neutral-700"
            >
              {/* Image Preview with Frosted Blur & Lock Overlay */}
              <div className="relative aspect-3/4 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover filter blur-[3px] scale-105 opacity-50 group-hover:blur-[2px] group-hover:scale-110 transition-all duration-700"
                />

                {/* Dark Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />

                {/* Lock Status Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 bg-neutral-900/90 text-amber-400 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-amber-500/20 backdrop-blur-md">
                    <Lock className="w-3 h-3" />
                    <span>{category.badge}</span>
                  </span>
                </div>

                {/* Center Sneak Peek Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-900/80 border border-neutral-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Lock className="w-5 h-5 text-neutral-300" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    In Production
                  </span>
                </div>

                {/* Card Bottom Meta */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold font-display text-white">
                    {category.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Card Action Button */}
              <div className="p-3 bg-neutral-900 border-t border-neutral-800">
                <button
                  onClick={() => handleNotifyMe(category.name)}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Notify When Live</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
