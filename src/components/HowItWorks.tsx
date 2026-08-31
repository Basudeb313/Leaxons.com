import React from 'react';
import { UploadCloud, Eye, PackageCheck, ArrowRight, Sparkles, Smartphone, Layers, Check } from 'lucide-react';

interface HowItWorksProps {
  onStartCustomizing: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartCustomizing }) => {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Design',
      tagline: 'Or Type Names, Quotes & Graphics',
      description: 'Upload high-res PNG, JPG, vector logos, or use our rich typography engine with Google Fonts and built-in minimalist clipart library.',
      icon: UploadCloud,
      highlight: '300 DPI Auto-Vectorized',
      accentColor: 'border-blue-500/20 bg-blue-50/40 text-blue-600',
    },
    {
      number: '02',
      title: 'Preview Live',
      tagline: 'Real-time 3D & 2D Mockup',
      description: 'Watch your artwork wrap around mugs, stretch across 240 GSM drop-shoulder tees, or shine on crystal acrylic keychains before spending a single rupee.',
      icon: Eye,
      highlight: 'Zero Distortion Guarantee',
      accentColor: 'border-amber-500/20 bg-amber-50/40 text-amber-600',
    },
    {
      number: '03',
      title: 'Place Order',
      tagline: 'Doorstep Pan-India Delivery',
      description: 'Pay securely via UPI QR, Razorpay cards, or Cash on Delivery. Dispatched in 24-48 hours via Shiprocket express air couriers right to your doorstep.',
      icon: PackageCheck,
      highlight: 'Live WhatsApp Tracking',
      accentColor: 'border-emerald-500/20 bg-emerald-50/40 text-emerald-600',
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa] border-b border-neutral-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 bg-neutral-100 px-3 py-1 rounded-full">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-950">
            How It Works
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            From your imagination to doorstep delivery in three effortless steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-neutral-900 transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${step.accentColor}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-4xl font-extrabold font-mono text-neutral-200 group-hover:text-neutral-900 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    {step.tagline}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-neutral-950 mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Footer pill inside step */}
                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-medium text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartCustomizing}
            className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Try The Live Customizer Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
