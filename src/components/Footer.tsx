import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Sparkles, 
  MessageCircle,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Heart
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (categoryId: ProductCategory | 'all') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdmin }) => {
  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-neutral-800 text-neutral-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Shipping All Over India</p>
              <p className="text-[11px] text-neutral-400">Powered by Shiprocket Logistics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Razorpay & UPI Protected</p>
              <p className="text-[11px] text-neutral-400">256-Bit SSL Encrypted Checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Cash on Delivery (COD)</p>
              <p className="text-[11px] text-neutral-400">Pay safely on doorstep receipt</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Quality Guaranteed</p>
              <p className="text-[11px] text-neutral-400">300 DPI Ultra HD DTF Prints</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl font-extrabold tracking-tight text-white">
                Leaxons
              </span>
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Make It Yours
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              India's premier custom merchandise D2C studio. Creating high-density custom T-shirts, ceramic mugs, structured caps, crystal keychains, speed desk mats, and museum-grade acrylic frames on demand.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors border border-neutral-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors border border-neutral-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919863097510"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center text-emerald-400 hover:text-white transition-colors border border-emerald-800"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Custom Categories */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-neutral-200 mb-4">
              Custom Merch
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('custom-tshirts')} className="hover:text-white transition-colors cursor-pointer">
                  Custom T-Shirts (240 GSM)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('custom-caps')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Structured Caps
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('custom-mugs')} className="hover:text-white transition-colors cursor-pointer">
                  Dual-Tone Ceramic Mugs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('custom-keychains')} className="hover:text-white transition-colors cursor-pointer">
                  Acrylic Die-Cut Keychains
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('custom-mousepads')} className="hover:text-white transition-colors cursor-pointer">
                  Speed Edition Desk Mats
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('photo-frames')} className="hover:text-white transition-colors cursor-pointer">
                  Acrylic Photo Frames
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Future Vault & Programs */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-neutral-200 mb-4">
              Upcoming Vault
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <li><span className="text-neutral-500">Custom 3D Toys & Plushies</span></li>
              <li><span className="text-neutral-500">Laser-Engraved Gadgets</span></li>
              <li><span className="text-neutral-500">Streetwear French Terry Hoodies</span></li>
              <li><span className="text-neutral-500">Smart RGB Neon Electronics</span></li>
              <li><span className="text-neutral-500">Canvas Lifestyle Duffles</span></li>
              <li>
                <button onClick={onOpenAdmin} className="text-amber-400 hover:underline mt-2 font-mono text-[11px] flex items-center gap-1">
                  <span>→ Open Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Pan-India Dispatch */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-neutral-200 mb-4">
              Pan-India Support
            </h4>
            <div className="flex flex-col gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Pan-India Fulfillment Hubs (Delhi, Mumbai, Bengaluru)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>orders@leaxons.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>+91 98630 97510 (WhatsApp Support)</span>
              </div>

              {/* Payment Methods Badges */}
              <div className="mt-2 pt-3 border-t border-neutral-800">
                <p className="text-[10px] uppercase font-mono text-neutral-500 mb-2">Accepted Payment Modes</p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-neutral-300">
                  <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">UPI</span>
                  <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">Razorpay</span>
                  <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">RuPay</span>
                  <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">Visa/Mastercard</span>
                  <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Tagline & Copyright Footer */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Leaxons D2C Brand India. All rights reserved. Make It Yours.</p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="text-[11px]">custom printed gifts India • custom t-shirts online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
