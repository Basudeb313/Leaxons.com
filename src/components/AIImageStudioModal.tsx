import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Image as ImageIcon, 
  ArrowRight, 
  Download, 
  Check, 
  RefreshCw, 
  X, 
  Layers, 
  Flame, 
  Palette, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  SlidersHorizontal 
} from 'lucide-react';
import { ProductVariant } from '../types';

interface AIImageStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductVariant[];
  onSelectProductWithDesign: (product: ProductVariant, designUrl: string, prompt: string) => void;
}

interface AIStyleOption {
  id: string;
  name: string;
  tag: string;
  icon: string;
  description: string;
}

const DEFAULT_STYLES: AIStyleOption[] = [
  { id: 'streetwear', name: 'Streetwear Vector', tag: 'Hot', icon: '🔥', description: 'Bold urban apparel graphic with clean vector contours' },
  { id: 'anime', name: 'Japanese Anime', tag: 'Trending', icon: '⚔️', description: 'Dynamic cel-shaded manga art & studio visual' },
  { id: 'cyberpunk', name: 'Neon Cyberpunk', tag: 'Popular', icon: '⚡', description: 'Futuristic glowing synthwave & dark contrasts' },
  { id: 'vintage', name: '90s Retro Vintage', tag: 'Classic', icon: '📼', description: 'Distressed halftone textures and heritage colors' },
  { id: 'minimalist', name: 'Minimalist Line Art', tag: 'Aesthetic', icon: '✨', description: 'Clean continuous single line & negative space' },
  { id: 'pixar3d', name: '3D Pixar Render', tag: 'Cute', icon: '🧸', description: 'Soft studio lighting and vibrant 3D character' },
  { id: 'watercolor', name: 'Splash Watercolor', tag: 'Artistic', icon: '🎨', description: 'Organic fluid brushstrokes with ink splatters' },
  { id: 'monogram', name: 'Luxury Monogram', tag: 'Premium', icon: '👑', description: 'Gold foil crest & symmetrical heraldic badge' }
];

const DEFAULT_INSPIRATIONS = [
  'Cyberpunk tiger samurai with neon katana in Neo Tokyo',
  'Cute astronaut sloth sipping iced boba tea in zero gravity',
  'Vintage 90s Japanese mountain sunrise with koi fish and cherry blossoms',
  'Minimalist golden mandala sacred geometry with celestial crescent moon',
  'Bold streetwear graffiti skull wearing headphones with botanical roses',
  'Vibrant watercolor majestic Indian royal elephant with floral garland',
  'Retro arcade pixel synthwave sports car racing into purple sunset',
  'Cute fluffy baby dragon eating ramen in a cozy Japanese shop',
  'Monogram heraldic lion crest with golden wings and laurel wreath'
];

export const AIImageStudioModal: React.FC<AIImageStudioModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProductWithDesign
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('streetwear');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeEngine, setActiveEngine] = useState<string>('Leaxons AI Studio');
  const [selectedTargetProduct, setSelectedTargetProduct] = useState<ProductVariant | null>(
    products[0] || null
  );
  const [stylesList, setStylesList] = useState<AIStyleOption[]>(DEFAULT_STYLES);
  const [inspirations, setInspirations] = useState<string[]>(DEFAULT_INSPIRATIONS);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Sync presets from server
  useEffect(() => {
    fetch('/api/ai/presets')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.styles) {
          setStylesList(data.styles);
        }
        if (data.success && data.inspirations) {
          setInspirations(data.inspirations);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (products.length > 0 && !selectedTargetProduct) {
      setSelectedTargetProduct(products[0]);
    }
  }, [products, selectedTargetProduct]);

  if (!isOpen) return null;

  // Handle Magic Prompt Enhancement via Gemini 3.7 Flash
  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/ai/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: selectedStyle })
      });
      const data = await res.json();
      if (data.success && data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      }
    } catch (err) {
      console.warn('Enhance error:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Handle Image Generation
  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          aspectRatio,
          productContext: selectedTargetProduct?.categoryName || 'tshirt'
        })
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        if (data.engine) {
          setActiveEngine(data.engine);
        }
      }
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 1-Click Apply to Merchandise
  const handleApplyToProduct = () => {
    if (!generatedImage || !selectedTargetProduct) return;
    onSelectProductWithDesign(selectedTargetProduct, generatedImage, prompt);
    onClose();
  };

  // Download high-res graphic
  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `leaxons-ai-${selectedStyle}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-200/80 bg-neutral-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-display text-neutral-950">
                  Leaxons AI Art Studio
                </h2>
                <span className="bg-neutral-950 text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold">
                  Generative Studio
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Turn your imagination into 300 DPI print-ready custom merchandise graphics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Creator Prompts & Controls (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Prompt Box */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <span>Describe What You Want To Create</span>
                  <span className="text-neutral-400 font-normal">• Type anything</span>
                </label>

                {prompt && (
                  <button
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || isGenerating}
                    className="text-xs font-bold text-neutral-900 hover:text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : 'text-amber-500'}`} />
                    <span>{isEnhancing ? 'Enhancing with AI…' : 'Enhance Prompt ✨'}</span>
                  </button>
                )}
              </div>

              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="e.g. Cyberpunk samurai tiger with glowing katana in Neo Tokyo, vibrant street art style..."
                  className="w-full text-sm p-3.5 rounded-2xl border border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 bg-neutral-50/50 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Inspiration Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                <span className="text-[11px] font-mono text-neutral-400 shrink-0">Try:</span>
                {inspirations.slice(0, 4).map((insp, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(insp)}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    {insp.length > 32 ? insp.substring(0, 30) + '…' : insp}
                  </button>
                ))}
              </div>
            </div>

            {/* Artistic Style Picker */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-900">
                  Select Print Art Style
                </label>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {stylesList.find(s => s.id === selectedStyle)?.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {stylesList.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyle(st.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedStyle === st.id
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs ring-2 ring-neutral-950 ring-offset-1'
                        : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-lg">{st.icon}</span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md font-bold uppercase ${
                        selectedStyle === st.id ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                      }`}>
                        {st.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold truncate">{st.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format & Aspect Ratio */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
                <span className="text-xs font-semibold text-neutral-800">Print Aspect Ratio:</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: '1:1', label: '1:1 Square (Apparel/Mugs)' },
                  { id: '3:4', label: '3:4 Portrait (Frames/Cases)' },
                  { id: '4:3', label: '4:3 Landscape (Pads)' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setAspectRatio(r.id as any)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                      aspectRatio === r.id
                        ? 'bg-neutral-950 text-white shadow-2xs'
                        : 'text-neutral-600 hover:text-neutral-950 bg-white border border-neutral-200'
                    }`}
                  >
                    {r.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Synthesizing High-Res Graphic with Gemini AI…</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Custom AI Image</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Live Result Canvas & Target Product Placement (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Generated Image Preview Canvas */}
            <div className="relative aspect-square rounded-3xl bg-neutral-900 border border-neutral-800 shadow-inner overflow-hidden flex items-center justify-center p-4 select-none">
              
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center text-center p-6 gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-3 border-neutral-700 border-t-amber-400 animate-spin" />
                    <Sparkles className="w-6 h-6 text-amber-300 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Generating 300 DPI Graphic</h4>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">
                      Applying {selectedStyle.toUpperCase()} style grading...
                    </p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={generatedImage}
                    alt={prompt}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl rounded-2xl"
                  />
                  
                  {/* Floating Action Badges */}
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-neutral-200">300 DPI Ready</span>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="absolute top-3 right-3 p-2 bg-neutral-950/80 backdrop-blur-md hover:bg-neutral-900 text-neutral-300 hover:text-white rounded-xl border border-neutral-700 transition-colors cursor-pointer"
                    title="Download high-resolution image"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 text-neutral-500 gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-neutral-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300">Canvas Awaiting Creation</h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                      Enter a prompt or select a sample idea, pick an art style, and click Generate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Target Merchandise Selector */}
            {generatedImage && (
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 flex flex-col gap-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-900">
                    Choose Product to Print On:
                  </label>
                  <span className="text-xs font-mono font-bold text-neutral-950">
                    ₹{selectedTargetProduct?.salePrice}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {products.slice(0, 6).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedTargetProduct(p)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                        selectedTargetProduct?.id === p.id
                          ? 'bg-white border-neutral-950 shadow-xs ring-1 ring-neutral-950 font-bold'
                          : 'bg-neutral-100 hover:bg-white border-neutral-200 text-neutral-600'
                      }`}
                    >
                      <img
                        src={p.mockupImages.front}
                        alt={p.name}
                        className="w-10 h-10 object-contain mb-1"
                      />
                      <span className="text-[10px] truncate w-full text-neutral-900">
                        {p.name.split(' ')[0]} {p.name.split(' ')[1] || ''}
                      </span>
                    </button>
                  ))}
                </div>

                {/* 1-Click Launch Studio with this AI Art */}
                <button
                  onClick={handleApplyToProduct}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
                >
                  <span>Open 3D Studio & Print This AI Art</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-neutral-200/80 bg-neutral-50/50 flex flex-wrap items-center justify-between text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-neutral-700">
              <Cpu className="w-3.5 h-3.5 text-neutral-600" />
              Engine: {activeEngine}
            </span>
            <span>•</span>
            <span>Pan-India DTF & Sublimation Fulfillment</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Commercial Use & HD Vector Print Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
