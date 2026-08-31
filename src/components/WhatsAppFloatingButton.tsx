import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="WhatsApp Assistance" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <span className="hidden md:inline-block bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with Merch Expert / Quick Order
      </span>
      <a
        href="https://wa.me/919863097510?text=Hi%20Leaxons%20team%2C%20I%20need%20help%20customizing%20my%20merchandise!"
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white"
        aria-label="Contact Leaxons on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </aside>
  );
};
