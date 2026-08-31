import React, { useState } from 'react';
import { Truck, CheckCircle2, XCircle, Search, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { lookupPincode } from '../data/catalog';
import { PincodeInfo } from '../types';

export const PincodeChecker: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<PincodeInfo | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length < 6) return;

    setIsLoading(true);
    setTimeout(() => {
      const data = lookupPincode(pincode);
      setResult(data);
      setHasSearched(true);
      setIsLoading(false);
    }, 250);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-neutral-900" />
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-900">
            Check Pan-India Delivery & COD
          </h4>
        </div>
        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200/60">
          Shiprocket Partnered
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit Indian PIN (e.g. 560001, 110001)"
            className="w-full bg-neutral-50 text-xs py-2.5 pl-8 pr-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={pincode.length < 6 || isLoading}
          className="bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {/* Result Display */}
      {hasSearched && result && (
        <div className="mt-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 animate-fadeIn">
          {result.isServiceable ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Serviceable: {result.city ? `${result.city}, ${result.state}` : 'Pan-India Delivery'}</span>
                </div>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-600">
                  PIN {result.pincode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600 pt-2 border-t border-neutral-200/60">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Est. Delivery: <strong>{result.estimatedDays} Business Days</strong></span>
                </div>

                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cash on Delivery (COD) Available</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-rose-700">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Please enter a valid 6-digit Indian pincode.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
