import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Check, 
  Truck
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onStartCustomizing: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartCustomizing,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const discountAmount = appliedDiscount > 0 ? Math.round((subtotal * appliedDiscount) / 100) : 0;
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    const code = couponCode.trim().toUpperCase();
    if (code === 'LEAXONS10' || code === 'FIRSTPRINT') {
      setAppliedDiscount(10);
      setCouponSuccess('10% VIP Creator Discount Applied!');
    } else if (code === 'FREESHIP') {
      setAppliedDiscount(5);
      setCouponSuccess('5% Super Saver Discount Applied!');
    } else {
      setCouponError('Invalid coupon code. Try "LEAXONS10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-950" />
              <h2 className="text-lg font-bold font-display text-neutral-950">
                Your Custom Cart ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-50 px-6 py-2.5 border-b border-neutral-100 text-xs">
            {subtotal >= 999 ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You've unlocked Free Pan-India Express Shipping!</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-neutral-600">
                <span>Add ₹{999 - subtotal} more for <strong>Free Shipping</strong></span>
                <span className="font-mono text-[11px]">Threshold: ₹999</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-500">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mb-6">
                  Design what defines you! Create custom T-shirts, mugs, caps or keychains in seconds.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartCustomizing();
                  }}
                  className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-3 rounded-full transition-all cursor-pointer shadow-xs"
                >
                  Open 3D Studio
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 relative">
                    <img
                      src={item.previewThumbnail || item.product.mockupImages.front}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <span 
                      className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white shadow-2xs"
                      style={{ backgroundColor: item.customization.selectedColor.hex }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-950 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Color: {item.customization.selectedColor.name} • Size: {item.customization.selectedSize}
                      </p>
                      
                      {item.customization.layers.length > 0 && (
                        <span className="inline-block text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-md mt-1">
                          {item.customization.layers.length} Custom Print Element(s)
                        </span>
                      )}
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:text-neutral-950 font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-neutral-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-neutral-600 hover:text-neutral-950 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-extrabold font-mono text-neutral-950">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-neutral-100 flex flex-col gap-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code (e.g. LEAXONS10)"
                    className="w-full bg-neutral-50 text-xs py-2 pl-8 pr-3 rounded-xl border border-neutral-200 uppercase font-mono focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-4 rounded-xl cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponSuccess && (
                <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
              )}

              {/* Price Calculation Summary */}
              <div className="flex flex-col gap-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-950 font-medium">₹{subtotal}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedDiscount}%)</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (Pan India Express)</span>
                  <span className="font-mono text-neutral-950 font-medium">
                    {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total Amount</span>
                  <span className="font-mono">₹{total}</span>
                </div>
              </div>

              {/* Proceed To Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                id="cart-checkout-proceed-btn"
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-neutral-500" />
                  Razorpay & UPI 256-Bit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-neutral-500" />
                  COD All India
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
