import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Star, 
  Zap, 
  Layers, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Hero3DBackground } from './Hero3DBackground';

interface HeroBannerProps {
  onStartCustomizing: () => void;
  onExploreCategories: () => void;
  onOpenAiStudio?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartCustomizing,
  onExploreCategories,
  onOpenAiStudio,
}) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-neutral-100/60 pt-6 pb-12 border-b border-neutral-200/70">
      {/* 3D Interactive WebGL Rotating Products Background */}
      <Hero3DBackground />

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-10 flex flex-col items-center text-center my-auto">
        {/* National D2C Pill Badge & AI Callout */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-medium shadow-md mb-6 animate-fadeIn">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="tracking-wide">India's #1 Premium Custom Merch Studio</span>
          <span className="text-neutral-500 font-mono">|</span>
          <span className="text-amber-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Gemini AI Art Studio
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-neutral-950 max-w-5xl leading-[1.05] sm:leading-[1.02]">
          Design What <br className="hidden sm:inline" />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-600">
              Defines You.
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full text-neutral-900 opacity-20"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 9C50 3 150 3 298 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Hero Tagline Subtext */}
        <p className="mt-6 text-base sm:text-xl text-neutral-600 max-w-2xl font-normal leading-relaxed">
          Custom <span className="text-neutral-950 font-semibold">T-shirts, Mugs, Caps, Keychains, Mousepads & Photo Frames</span> with ultra-precision 300 DPI prints and express Pan-India delivery.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={onStartCustomizing}
            id="hero-start-customizing-btn"
            className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start Customizing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {onOpenAiStudio && (
            <button
              onClick={onOpenAiStudio}
              id="hero-open-ai-studio-btn"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <Sparkles className="w-4 h-4 text-neutral-950" />
              <span>Generate AI Art ✨</span>
            </button>
          )}

          <button
            onClick={onExploreCategories}
            id="hero-explore-categories-btn"
            className="w-full sm:w-auto bg-white/90 hover:bg-white text-neutral-900 border border-neutral-300 font-semibold text-sm sm:text-base px-7 py-4 rounded-full shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
          >
            <Layers className="w-4 h-4 text-neutral-600" />
            <span>Explore Categories</span>
          </button>
        </div>

        {/* Live Social Proof Rating Bar */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-600">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200/80 shadow-2xs">
            <div className="flex -space-x-1.5">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">AS</span>
              <span className="w-6 h-6 rounded-full bg-neutral-700 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">RD</span>
              <span className="w-6 h-6 rounded-full bg-neutral-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">PI</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-neutral-900">4.9 / 5</span>
            <span className="text-neutral-500">(10k+ Creators)</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-700 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">No Minimum Order Quantity (MOQ = 1)</span>
          </div>
        </div>
      </div>

      {/* D2C Trust Feature Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-neutral-200/60">
          <div className="bg-white/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-neutral-950">24-48 Hr Dispatch</p>
              <p className="text-[11px] text-neutral-500">Fast print turnaround</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-neutral-950">Pan India Delivery</p>
              <p className="text-[11px] text-neutral-500">Shiprocket Express Air</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-neutral-950">Razorpay & UPI / COD</p>
              <p className="text-[11px] text-neutral-500">100% Encrypted & Safe</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-neutral-950">Ultra HD 300 DPI</p>
              <p className="text-[11px] text-neutral-500">Bio-washed & Fade-proof</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
