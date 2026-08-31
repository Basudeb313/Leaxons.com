import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, ShippingAddress, PaymentMethod, Order } from '../types';
import { lookupPincode } from '../data/catalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onClearCart,
}) => {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Address form state
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    phone: '9876543210',
    pincode: '560001',
    city: 'Bengaluru',
    state: 'Karnataka',
    addressLine1: 'Indiranagar 100ft Road, 4th Cross',
    addressLine2: 'Apartment 302',
    landmark: 'Near Metro Station'
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shippingFee;

  // Handle pincode change with auto city/state lookup
  const handlePincodeChange = (pin: string) => {
    const cleanPin = pin.replace(/\D/g, '').slice(0, 6);
    const lookup = lookupPincode(cleanPin);
    setFormData((prev) => ({
      ...prev,
      pincode: cleanPin,
      city: lookup.city || prev.city,
      state: lookup.state || prev.state
    }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || formData.pincode.length < 6) return;
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const payload = {
        items,
        subtotal,
        discount: 0,
        shippingFee,
        total,
        customer: formData,
        paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && data.order) {
        setCreatedOrder(data.order);
        setStep('success');
        onOrderSuccess(data.order);
        onClearCart();
        
        // Confetti celebration
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl text-neutral-950">Leaxons</span>
              <span className="text-neutral-400 font-mono text-xs">/ Checkout</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Header */}
        {step !== 'success' && (
          <div className="grid grid-cols-2 bg-neutral-50 text-xs font-semibold border-b border-neutral-100">
            <div className={`py-3 px-6 text-center border-r border-neutral-200 flex items-center justify-center gap-2 ${step === 'address' ? 'bg-white text-neutral-950' : 'text-neutral-500'}`}>
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-white text-[10px] flex items-center justify-center">1</span>
              <span>Shipping Address</span>
            </div>
            <div className={`py-3 px-6 text-center flex items-center justify-center gap-2 ${step === 'payment' ? 'bg-white text-neutral-950' : 'text-neutral-500'}`}>
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-800 text-[10px] flex items-center justify-center">2</span>
              <span>Payment & Confirmation</span>
            </div>
          </div>
        )}

        {/* STEP 1: Address Collection */}
        {step === 'address' && (
          <form onSubmit={handleAddressSubmit} className="p-6 sm:p-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aarav Mehta"
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">WhatsApp Mobile *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="For invoice & Shiprocket AWB updates"
                className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="6-digit PIN"
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-1">Street Address / House No. *</label>
              <textarea
                required
                rows={2}
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                placeholder="Flat / Floor, Building Name, Street / Area"
                className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50 resize-none"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="text-xs text-neutral-500">
                <span>Total to pay: <strong className="text-neutral-950 font-mono">₹{total}</strong></span>
              </div>
              <button
                type="submit"
                className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Options */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-neutral-950 mb-3">Select Payment Method:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'upi'
                      ? 'border-neutral-950 bg-neutral-50 ring-2 ring-neutral-950'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <QrCode className="w-6 h-6 text-neutral-900" />
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                      Fastest
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">Instant UPI QR</p>
                    <p className="text-[10px] text-neutral-500">GPay, PhonePe, Paytm</p>
                  </div>
                </div>

                {/* Razorpay Cards Option */}
                <div
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'razorpay'
                      ? 'border-neutral-950 bg-neutral-50 ring-2 ring-neutral-950'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard className="w-6 h-6 text-neutral-900" />
                    <span className="text-[10px] font-bold bg-neutral-200 text-neutral-800 px-1.5 py-0.5 rounded font-mono">
                      Cards
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">Razorpay Gateway</p>
                    <p className="text-[10px] text-neutral-500">Cards, Netbanking, Cred</p>
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-950 bg-neutral-50 ring-2 ring-neutral-950'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Banknote className="w-6 h-6 text-neutral-900" />
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
                      Verified
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-950">Cash on Delivery</p>
                    <p className="text-[10px] text-neutral-500">Pay cash upon delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* UPI QR Simulator (when UPI selected) */}
            {paymentMethod === 'upi' && (
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left animate-fadeIn">
                <div className="w-24 h-24 bg-white p-2 rounded-xl border border-neutral-300 shadow-2xs flex items-center justify-center shrink-0">
                  <div className="text-center font-mono text-[9px] text-neutral-600">
                    <QrCode className="w-16 h-16 text-neutral-900 mx-auto" />
                    <span>UPI ID: leaxons@upi</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Scan & Pay ₹{total}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Open Google Pay, PhonePe, Paytm, or BHIM. Zero payment gateway charges.
                  </p>
                </div>
              </div>
            )}

            {/* Razorpay details (when Razorpay selected) */}
            {paymentMethod === 'razorpay' && (
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3 text-xs text-neutral-600 animate-fadeIn">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>You will be redirected to the secure 256-bit encrypted Razorpay payment gateway to authorize payment.</span>
              </div>
            )}

            {/* COD details (when COD selected) */}
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3 animate-fadeIn">
                <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Our automated WhatsApp dispatch bot will send you a 1-click verification link before dispatching via Shiprocket.</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <button
                onClick={() => setStep('address')}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 cursor-pointer"
              >
                ← Back to Address
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Securely...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Place Order (₹{total})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Success & Tracking */}
        {step === 'success' && createdOrder && (
          <div className="p-6 sm:p-10 text-center flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Sent to Print Studio
            </span>

            <h2 className="text-2xl sm:text-3xl font-black font-display text-neutral-950 mt-3">
              Thank You, {createdOrder.customer.fullName}!
            </h2>

            <p className="text-xs text-neutral-500 mt-1">
              Order ID: <strong className="text-neutral-900 font-mono">{createdOrder.orderNumber}</strong> • Shiprocket AWB: <strong className="text-neutral-900 font-mono">{createdOrder.trackingNumber}</strong>
            </p>

            {/* Summary Box */}
            <div className="my-6 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-left w-full text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery To:</span>
                <span className="font-semibold text-neutral-900">{createdOrder.customer.city}, {createdOrder.customer.state} ({createdOrder.customer.pincode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">{createdOrder.estimatedDeliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment:</span>
                <span className="font-semibold uppercase text-neutral-900">{createdOrder.paymentMethod} (₹{createdOrder.total})</span>
              </div>
            </div>

            {/* WhatsApp Direct Notification */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={`https://wa.me/919876543210?text=Hi%20Leaxons%2C%20I%20just%20placed%20Order%20${createdOrder.orderNumber}%20for%20₹${createdOrder.total}.%20Please%20send%20tracking%20updates!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Receive Updates on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
