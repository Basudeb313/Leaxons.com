import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Type, 
  Smile, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Trash2, 
  Check, 
  MessageCircle, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Move, 
  Maximize2, 
  ChevronRight,
  Info,
  Palette,
  Eye,
  Sliders,
  Flame,
  Award,
  Wand2,
  RefreshCw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ProductVariant, CustomDesignLayer, ProductColor, ProductCustomizationState, CartItem } from '../types';
import { FONT_OPTIONS, CLIPARTS } from '../data/catalog';
import { PincodeChecker } from './PincodeChecker';

interface ProductCustomizerProps {
  product: ProductVariant;
  onAddToCart: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  onBackToCatalog?: () => void;
  initialDesignLayer?: { content: string; prompt?: string };
}

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  product,
  onAddToCart,
  onBackToCatalog,
  initialDesignLayer
}) => {
  // Product state
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Pitch Black', hex: '#111111', textColor: '#ffffff' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : 'Standard'
  );
  const [selectedSide, setSelectedSide] = useState<'front' | 'back' | 'angle'>('front');
  const [activeTab, setActiveTab] = useState<'ai' | 'upload' | 'text' | 'clipart' | 'options'>('ai');
  
  // Custom design layers
  const [layers, setLayers] = useState<CustomDesignLayer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  // AI Generator state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStyle, setAiStyle] = useState('streetwear');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isAiEnhancing, setIsAiEnhancing] = useState(false);

  // New text state
  const [textInput, setTextInput] = useState('');
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].fontFamily);
  const [selectedTextColor, setSelectedTextColor] = useState('#ffffff');
  const [isBold, setIsBold] = useState(true);
  const [isItalic, setIsItalic] = useState(false);
  const [isCurved, setIsCurved] = useState(false);
  const [fontSize, setFontSize] = useState(24);

  // Print quality
  const [printQuality, setPrintQuality] = useState<'standard_dtf' | 'hd_embroidery' | 'sublimation_pro'>('standard_dtf');
  const [quantity, setQuantity] = useState(1);
  const [extraNotes, setExtraNotes] = useState('');

  // Toast / feedback state
  const [showAddedToast, setShowAddedToast] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Initial AI Design Layer if passed from modal
  useEffect(() => {
    if (initialDesignLayer && initialDesignLayer.content) {
      const newLayer: CustomDesignLayer = {
        id: `ai-layer-${Date.now()}`,
        type: 'image',
        side: 'front',
        content: initialDesignLayer.content,
        x: 50,
        y: 48,
        scale: 1.1,
        rotation: 0
      };
      setLayers([newLayer]);
      setActiveLayerId(newLayer.id);
      if (initialDesignLayer.prompt) {
        setAiPrompt(initialDesignLayer.prompt);
      }
    }
  }, [initialDesignLayer]);

  // AI Prompt Enhancement
  const handleAiEnhance = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiEnhancing(true);
    try {
      const res = await fetch('/api/ai/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt, style: aiStyle })
      });
      const data = await res.json();
      if (data.success && data.enhancedPrompt) {
        setAiPrompt(data.enhancedPrompt);
      }
    } catch (err) {
      console.warn('Enhance error:', err);
    } finally {
      setIsAiEnhancing(false);
    }
  };

  // AI Image Generation directly to canvas
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt.trim(),
          style: aiStyle,
          productContext: product.categoryName
        })
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        const newLayer: CustomDesignLayer = {
          id: `ai-layer-${Date.now()}`,
          type: 'image',
          side: selectedSide,
          content: data.imageUrl,
          x: 50,
          y: 48,
          scale: 1.1,
          rotation: 0
        };
        setLayers([...layers, newLayer]);
        setActiveLayerId(newLayer.id);
      }
    } catch (err) {
      console.error('AI generation error:', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Calculate dynamic live price
  const basePrice = product.salePrice;
  const backPrintPrice = layers.some(l => l.side === 'back') ? 99 : 0;
  const qualityUpgradePrice = printQuality === 'hd_embroidery' ? 120 : (printQuality === 'sublimation_pro' ? 80 : 0);
  const unitPrice = basePrice + backPrintPrice + qualityUpgradePrice;
  const totalPrice = unitPrice * quantity;

  // Active layer
  const activeLayer = layers.find(l => l.id === activeLayerId);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const newLayer: CustomDesignLayer = {
          id: `layer-${Date.now()}`,
          type: 'image',
          side: selectedSide,
          content: event.target.result as string,
          x: 50,
          y: 48,
          scale: 1,
          rotation: 0
        };
        setLayers([...layers, newLayer]);
        setActiveLayerId(newLayer.id);
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Text Layer
  const handleAddText = () => {
    if (!textInput.trim()) return;

    const newLayer: CustomDesignLayer = {
      id: `layer-${Date.now()}`,
      type: 'text',
      side: selectedSide,
      content: textInput.trim(),
      fontFamily: selectedFont,
      fontSize: fontSize,
      textColor: selectedTextColor,
      isBold,
      isItalic,
      isCurved,
      curveRadius: 100,
      x: 50,
      y: 45,
      scale: 1,
      rotation: 0
    };

    setLayers([...layers, newLayer]);
    setActiveLayerId(newLayer.id);
    setTextInput('');
  };

  // Add Clipart Layer
  const handleAddClipart = (svgOrEmoji: string) => {
    const newLayer: CustomDesignLayer = {
      id: `layer-${Date.now()}`,
      type: 'clipart',
      side: selectedSide,
      content: svgOrEmoji,
      x: 50,
      y: 45,
      scale: 1.2,
      rotation: 0
    };
    setLayers([...layers, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  // Remove Layer
  const handleRemoveLayer = (id: string) => {
    setLayers(layers.filter(l => l.id !== id));
    if (activeLayerId === id) {
      setActiveLayerId(null);
    }
  };

  // Update Layer position / scale
  const updateLayer = (id: string, updates: Partial<CustomDesignLayer>) => {
    setLayers(layers.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  // Generate WhatsApp Order Link with exact design specifications
  const generateWhatsAppOrderLink = () => {
    const textSummary = layers
      .map(l => `• ${l.side.toUpperCase()}: ${l.type === 'text' ? `"${l.content}"` : l.type}`)
      .join('\n');

    const message = 
      `*New Leaxons Custom Order Request*\n` +
      `Product: ${product.name}\n` +
      `Color: ${selectedColor.name}\n` +
      `Size: ${selectedSize}\n` +
      `Quantity: ${quantity}\n` +
      `Estimated Total: ₹${totalPrice}\n` +
      `Print Finish: ${printQuality}\n` +
      (textSummary ? `Custom Elements:\n${textSummary}\n` : '') +
      `Please confirm stock & dispatch timeline!`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  // Add to cart handler
  const handleAddToCartClick = () => {
    const customization: ProductCustomizationState = {
      productId: product.id,
      selectedColor,
      selectedSize,
      selectedPrintSide: selectedSide,
      layers,
      printQuality,
      extraNotes
    };

    onAddToCart({
      product,
      customization,
      quantity,
      unitPrice,
      previewThumbnail: product.mockupImages.front
    });

    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3500);
  };

  // Filter layers for current side
  const visibleLayers = layers.filter(l => l.side === selectedSide);

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
            {onBackToCatalog && (
              <button 
                onClick={onBackToCatalog}
                className="hover:text-neutral-900 cursor-pointer flex items-center gap-1"
              >
                <span>← All Categories</span>
                <span>/</span>
              </button>
            )}
            <span className="text-neutral-400">{product.categoryName}</span>
            <span>/</span>
            <span className="text-neutral-950 font-semibold">{product.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Studio Engine Active
            </span>
          </div>
        </div>

        {/* Studio Grid: Left Visualizer Canvas, Right Customization Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Live Interactive Product Visualizer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Visualizer Canvas Container */}
            <div className="relative aspect-square sm:aspect-4/3 rounded-3xl bg-white border border-neutral-200/90 shadow-sm overflow-hidden flex items-center justify-center p-6 select-none">
              
              {/* Product Realistic Mockup Underlay */}
              <div className="relative w-full h-full max-w-md max-h-md flex items-center justify-center">
                {/* Background colored silhouette glow */}
                <div 
                  className="absolute inset-4 rounded-3xl opacity-15 blur-2xl transition-colors duration-500"
                  style={{ backgroundColor: selectedColor.hex }}
                />

                {/* Base Product Image */}
                <img
                  src={
                    selectedSide === 'back' && product.mockupImages.back
                      ? product.mockupImages.back
                      : (selectedSide === 'angle' && product.mockupImages.angle
                          ? product.mockupImages.angle
                          : product.mockupImages.front)
                  }
                  alt={product.name}
                  className="relative z-10 max-h-full max-w-full object-contain filter contrast-105 drop-shadow-md"
                />

                {/* Color tint filter simulation overlay for products */}
                <div 
                  className="absolute inset-12 z-15 mix-blend-color opacity-25 rounded-2xl pointer-events-none transition-colors duration-300"
                  style={{ backgroundColor: selectedColor.hex }}
                />

                {/* Printable Bounding Box & Active Custom Layers */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  {/* Bounding Area Indicator */}
                  <div className="w-[52%] h-[52%] border border-dashed border-neutral-400/40 rounded-xl relative pointer-events-auto overflow-hidden">
                    
                    {/* Render Each Custom Design Layer */}
                    {visibleLayers.map((layer) => (
                      <div
                        key={layer.id}
                        onClick={() => setActiveLayerId(layer.id)}
                        style={{
                          left: `${layer.x}%`,
                          top: `${layer.y}%`,
                          transform: `translate(-50%, -50%) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
                        }}
                        className={`absolute cursor-move select-none p-1 transition-all ${
                          activeLayerId === layer.id
                            ? 'ring-2 ring-neutral-950 ring-offset-2 rounded-lg bg-neutral-950/5'
                            : 'hover:ring-1 hover:ring-neutral-400'
                        }`}
                      >
                        {layer.type === 'text' && (
                          <div
                            style={{
                              fontFamily: layer.fontFamily,
                              fontSize: `${layer.fontSize}px`,
                              color: layer.textColor,
                              fontWeight: layer.isBold ? 800 : 500,
                              fontStyle: layer.isItalic ? 'italic' : 'normal',
                              textShadow: '0 2px 4px rgba(0,0,0,0.35)',
                              whiteSpace: 'nowrap'
                            }}
                            className="leading-none text-center"
                          >
                            {layer.content}
                          </div>
                        )}

                        {layer.type === 'image' && (
                          <img
                            src={layer.content}
                            alt="Custom print artwork"
                            className="w-28 h-28 object-contain drop-shadow-sm pointer-events-none"
                          />
                        )}

                        {layer.type === 'clipart' && (
                          <span className="text-4xl filter drop-shadow-sm pointer-events-none">
                            {layer.content}
                          </span>
                        )}
                      </div>
                    ))}

                    {/* Empty placeholder guide */}
                    {visibleLayers.length === 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-neutral-400 pointer-events-none">
                        <Sparkles className="w-5 h-5 mb-1 text-neutral-300 animate-pulse" />
                        <span className="text-[11px] font-mono">Print Zone Ready</span>
                        <span className="text-[10px] text-neutral-400">Upload design or add text from right panel</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* View Switcher (Front, Back, Angle) */}
              <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-neutral-200 shadow-xs">
                <button
                  onClick={() => setSelectedSide('front')}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    selectedSide === 'front'
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Front View
                </button>

                {product.mockupImages.back && (
                  <button
                    onClick={() => setSelectedSide('back')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                      selectedSide === 'back'
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    <span>Back View</span>
                    {layers.some(l => l.side === 'back') && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                )}

                {product.mockupImages.angle && (
                  <button
                    onClick={() => setSelectedSide('angle')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      selectedSide === 'angle'
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    3D Angle
                  </button>
                )}
              </div>

              {/* Reset Canvas Button */}
              {layers.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all custom design layers?')) {
                      setLayers([]);
                      setActiveLayerId(null);
                    }
                  }}
                  className="absolute top-4 right-4 z-30 flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-rose-600 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Canvas</span>
                </button>
              )}
            </div>

            {/* Active Layer Fine-tuning Bar (if a layer is selected) */}
            {activeLayer && (
              <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">
                    Editing {activeLayer.type === 'text' ? `Text ("${activeLayer.content}")` : activeLayer.type.toUpperCase()}:
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {/* Scale slider */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <span className="text-[11px] font-mono">Scale</span>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.1"
                      value={activeLayer.scale}
                      onChange={(e) => updateLayer(activeLayer.id, { scale: parseFloat(e.target.value) })}
                      className="w-20 accent-neutral-950"
                    />
                  </div>

                  {/* Rotation slider */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                    <span className="text-[11px] font-mono">Rotate</span>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="5"
                      value={activeLayer.rotation}
                      onChange={(e) => updateLayer(activeLayer.id, { rotation: parseInt(e.target.value) })}
                      className="w-20 accent-neutral-950"
                    />
                  </div>

                  {/* Delete layer */}
                  <button
                    onClick={() => handleRemoveLayer(activeLayer.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="Delete element"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Pincode Availability & Express Shiprocket Checker */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs">
              <PincodeChecker />
            </div>
          </div>

          {/* RIGHT: Studio Control Panel & Live Pricing (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main Product Info & Live Price Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    {product.categoryName}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-neutral-950 mt-0.5">
                    {product.name}
                  </h1>
                </div>

                {/* Rating pill */}
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-xs font-bold text-amber-900 shrink-0">
                  <span>★</span>
                  <span>{product.rating}</span>
                  <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
                </div>
              </div>

              {/* Dynamic Live Price Breakdown */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-neutral-950 font-mono">
                      ₹{unitPrice}
                    </span>
                    {product.basePrice > product.salePrice && (
                      <span className="text-sm text-neutral-400 line-through font-mono">
                        ₹{product.basePrice}
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                      Live Price
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Inclusive of all taxes & free standard packaging
                  </p>
                </div>

                {/* Quantity incrementor */}
                <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-neutral-950 font-bold rounded-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-mono text-neutral-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-neutral-950 font-bold rounded-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Color Swatches Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 mb-2.5">
                  <span>Select Color: <span className="font-normal text-neutral-600">{selectedColor.name}</span></span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-9 h-9 rounded-full transition-all flex items-center justify-center shadow-xs cursor-pointer border ${
                        selectedColor.name === color.name
                          ? 'ring-3 ring-neutral-950 ring-offset-2 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      title={color.name}
                    >
                      {selectedColor.name === color.name && (
                        <Check 
                          className="w-4 h-4" 
                          style={{ color: color.textColor }} 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector (for T-shirts, Caps, Frames etc) */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 mb-2.5">
                    <span>Select Size / Format</span>
                    <span className="text-[11px] text-neutral-500 cursor-pointer hover:underline">
                      Standard Fit Guide
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 px-1 text-center text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                          selectedSize === sz
                            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customization Tabs Card (AI Generator, Upload Image, Add Text, Clipart, Print Options) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs flex flex-col">
              {/* Tool Navigation Tabs */}
              <div className="grid grid-cols-5 gap-1 p-1 bg-neutral-100 rounded-2xl mb-6">
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'ai'
                      ? 'bg-neutral-950 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Art ✨</span>
                </button>

                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'upload'
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>

                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'text'
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Text</span>
                </button>

                <button
                  onClick={() => setActiveTab('clipart')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'clipart'
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Smile className="w-3.5 h-3.5" />
                  <span>Badges</span>
                </button>

                <button
                  onClick={() => setActiveTab('options')}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'options'
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Finish</span>
                </button>
              </div>

              {/* Tab 0: AI Art Studio Tool */}
              {activeTab === 'ai' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Generate Custom Image with AI</span>
                    </label>

                    {aiPrompt && (
                      <button
                        type="button"
                        onClick={handleAiEnhance}
                        disabled={isAiEnhancing || isAiGenerating}
                        className="text-[11px] font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Wand2 className={`w-3 h-3 ${isAiEnhancing ? 'animate-spin' : 'text-amber-500'}`} />
                        <span>{isAiEnhancing ? 'Enhancing…' : 'Magic Enhance'}</span>
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={2}
                      placeholder="e.g. Cyberpunk samurai tiger with neon katana, anime aesthetic..."
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 bg-neutral-50 focus:bg-white resize-none transition-all"
                    />
                  </div>

                  {/* Sample suggestions */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                    {['Cyberpunk tiger samurai', 'Vintage 90s mountain sunset', 'Cute astronaut sloth', 'Monogram gold lion crest'].map((sugg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAiPrompt(sugg)}
                        className="text-[10px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2 py-1 rounded-full whitespace-nowrap cursor-pointer transition-colors shrink-0"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>

                  {/* Art Style Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-800 mb-1.5">
                      Select Graphic Style
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'streetwear', name: 'Streetwear', icon: '🔥' },
                        { id: 'anime', name: 'Anime', icon: '⚔️' },
                        { id: 'cyberpunk', name: 'Cyberpunk', icon: '⚡' },
                        { id: 'vintage', name: '90s Vintage', icon: '📼' },
                        { id: 'minimalist', name: 'Line Art', icon: '✨' },
                        { id: 'pixar3d', name: '3D Pixar', icon: '🧸' }
                      ].map(st => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setAiStyle(st.id)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 border ${
                            aiStyle === st.id
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-2xs'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          <span>{st.icon}</span>
                          <span className="text-[11px]">{st.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate & Stamp Action */}
                  <button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={isAiGenerating || !aiPrompt.trim()}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-1"
                  >
                    {isAiGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                        <span>Generating Custom Artwork with Gemini…</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Generate & Place on Canvas</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-neutral-400 font-mono text-center">
                    Rendered at 300 DPI vector clarity for direct apparel printing
                  </div>
                </div>
              )}

              {/* Tab 1: Image Upload Tool */}
              {activeTab === 'upload' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-neutral-300 hover:border-neutral-950 rounded-2xl p-6 text-center cursor-pointer bg-neutral-50/50 hover:bg-neutral-50 transition-all flex flex-col items-center justify-center group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mb-3 shadow-2xs group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-neutral-800" />
                    </div>
                    <p className="text-sm font-bold text-neutral-900">
                      Click to upload artwork or logo
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      PNG, JPG, SVG up to 25MB • 300 DPI Recommended
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    <Info className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>Backgrounds on PNG logos are automatically preserved in high fidelity.</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Text / Name Tool */}
              {activeTab === 'text' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                      Enter Name, Slogan or Monogram
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddText()}
                        placeholder="e.g. AARAV, STREETWEAR, CREW '26"
                        className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 bg-neutral-50"
                      />
                      <button
                        type="button"
                        onClick={handleAddText}
                        className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold px-4 rounded-xl cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Font Family Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                      Typography Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {FONT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFont(f.fontFamily)}
                          style={{ fontFamily: f.fontFamily }}
                          className={`p-2.5 text-xs text-center rounded-xl border transition-all cursor-pointer truncate ${
                            selectedFont === f.fontFamily
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                              : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:bg-neutral-100'
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Color Swatches */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                      Text Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['#ffffff', '#111111', '#d4af37', '#dc2626', '#2563eb', '#16a34a', '#ec4899', '#9333ea'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedTextColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-7 h-7 rounded-full border border-neutral-300 transition-transform cursor-pointer ${
                            selectedTextColor === c ? 'ring-2 ring-neutral-950 scale-110' : 'hover:scale-105'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Badges / Clipart Library */}
              {activeTab === 'clipart' && (
                <div className="animate-fadeIn">
                  <p className="text-xs font-semibold text-neutral-800 mb-2">
                    Click to stamp on your merchandise:
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                    {CLIPARTS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleAddClipart(item.svg)}
                        className="aspect-square bg-neutral-50 hover:bg-neutral-100 rounded-2xl border border-neutral-200 flex flex-col items-center justify-center p-2 transition-all hover:scale-105 cursor-pointer"
                        title={item.name}
                      >
                        <span className="text-2xl">{item.svg}</span>
                        <span className="text-[9px] text-neutral-500 font-mono mt-1 truncate w-full text-center">
                          {item.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Finish & Print Technology */}
              {activeTab === 'options' && (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Select Print Finish
                  </label>
                  
                  <div
                    onClick={() => setPrintQuality('standard_dtf')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      printQuality === 'standard_dtf'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-neutral-950">Ultra HD DTF 300 DPI (Standard)</p>
                      <p className="text-[11px] text-neutral-500">Zero color bleeding, soft-touch stretchable finish.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPrintQuality('hd_embroidery')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      printQuality === 'hd_embroidery'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                        : 'border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-neutral-950">Precision HD 3D Embroidery</p>
                        <span className="text-[10px] bg-neutral-900 text-white px-1.5 py-0.2 rounded font-mono">+₹120</span>
                      </div>
                      <p className="text-[11px] text-neutral-500">Luxury raised Japanese thread stitching.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Add to Cart & WhatsApp Order */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
                {/* Main Add to Cart */}
                <button
                  onClick={handleAddToCartClick}
                  id="customizer-add-to-cart-btn"
                  className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ₹{totalPrice}</span>
                </button>

                {/* Direct WhatsApp Order */}
                <a
                  href={generateWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="customizer-whatsapp-order-btn"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order Directly on WhatsApp</span>
                </a>
              </div>

              {/* Added Toast */}
              {showAddedToast && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Item customized & added to cart! Open cart to checkout.</span>
                </div>
              )}
            </div>

            {/* Quality Guarantees Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600">
              <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Pan-India Express Air Shipping</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>100% Replacement Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
