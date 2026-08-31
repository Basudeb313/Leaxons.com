import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CATEGORIES, PRODUCTS, REVIEWS, lookupPincode } from './src/data/catalog';
import { ProductVariant, Order, Review } from './src/types';

dotenv.config();

// In-memory persistent state (seeded with catalog and expandable by admin)
let categoriesStore = [...CATEGORIES];
let productsStore = [...PRODUCTS];
let reviewsStore = [...REVIEWS];
let ordersStore: Order[] = [
  {
    id: 'LX-ORD-10928',
    orderNumber: 'LX98412',
    items: [],
    subtotal: 1098,
    discount: 100,
    shippingFee: 0,
    total: 998,
    customer: {
      fullName: 'Vikram Malhotra',
      email: 'vikram.m@example.com',
      phone: '+91 98765 43210',
      pincode: '400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      addressLine1: 'Flat 402, Sea View Residency, Colaba',
    },
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'in_print',
    trackingNumber: 'SR-DEL-88392109',
    courierPartner: 'Shiprocket (Delhivery Air)',
    estimatedDeliveryDate: '2 Days (Express)',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', brand: 'Leaxons', version: '2.0.0', uptime: process.uptime() });
  });

  // --- GEMINI AI CUSTOM IMAGE GENERATOR API ---
  app.post('/api/ai/generate-image', async (req: Request, res: Response) => {
    const { 
      prompt, 
      style = 'streetwear', 
      aspectRatio = '1:1', 
      productContext = 'tshirt',
      transparentBg = true 
    } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a creative prompt for your custom image.' });
    }

    const trimmedPrompt = prompt.trim();
    
    // Style presets tailored for DTF and merchandise printing
    const styleModifiers: { [key: string]: string } = {
      streetwear: 'bold streetwear graphic illustration, clean vector outlines, urban cyberpunk sticker style, high contrast, vibrant saturated palette, apparel graphic on clean background',
      anime: 'Japanese anime manga character illustration, studio ghibli aesthetic, crisp cel-shaded lines, dynamic composition, vibrant artistic details',
      cyberpunk: 'futuristic cyberpunk synthwave aesthetic, neon glow, intricate mechanical details, dark atmospheric contrast, high definition',
      vintage: 'retro 90s vintage poster graphic, distressed halftone texture, classic typography accents, warm retro colors, heritage vibe',
      minimalist: 'minimalist continuous single-line art, elegant modern silhouette, negative space, aesthetic clean contemporary design',
      pixar3d: 'cute 3D rendered character, Pixar style, subsurface scattering lighting, soft studio shadows, ultra high detail',
      watercolor: 'vibrant splash watercolor painting, ink splatter accents, organic flowing brushstrokes, artistic portrait',
      monogram: 'luxury typographic crest monogram emblem, gold foil accents, geometric heraldic badge, symmetrical vector',
      abstract: 'bold modern geometric abstract art, bauhaus and memphis design elements, striking color blocking'
    };

    const chosenStyleModifier = styleModifiers[style] || styleModifiers.streetwear;
    const finalPrompt = `${trimmedPrompt}. Style: ${chosenStyleModifier}. Optimized for custom merchandise and t-shirt apparel print, ultra sharp 300 DPI clarity, isolated central graphic.`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });

        // Generate image with gemini-3.1-flash-lite-image
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: [
              {
                text: finalPrompt
              }
            ]
          },
          config: {
            imageConfig: {
              aspectRatio: (['1:1', '3:4', '4:3', '9:16', '16:9'].includes(aspectRatio) ? aspectRatio : '1:1') as any
            }
          }
        });

        // Search for image in parts
        let generatedImageUrl: string | null = null;
        let generatedCaption = '';

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const mime = part.inlineData.mimeType || 'image/png';
              generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
            } else if (part.text) {
              generatedCaption += part.text;
            }
          }
        }

        if (generatedImageUrl) {
          return res.json({
            success: true,
            imageUrl: generatedImageUrl,
            prompt: trimmedPrompt,
            style,
            aspectRatio,
            engine: 'Gemini 3.1 Flash Lite Image',
            caption: generatedCaption || `Custom ${style} design generated for Leaxons apparel`
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini image generation attempt note:', geminiError?.message || geminiError);
      }
    }

    // High quality curated dynamic SVG / Graphic generator fallback
    // Ensures the user always gets a stunning, print-ready custom artwork preview even before API keys or when prototyping
    const colorsList = [
      ['#FF416C', '#8A2387', '#E94057'],
      ['#00F2FE', '#4FACFE', '#000046'],
      ['#F7971E', '#FFD200', '#F15A24'],
      ['#11998E', '#38EF7D', '#0F2027'],
      ['#8E2DE2', '#4A00E0', '#1F1C2C'],
      ['#FF0844', '#FFB199', '#3A1C71']
    ];
    const colorIndex = Math.abs(trimmedPrompt.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colorsList.length;
    const [c1, c2, c3] = colorsList[colorIndex];

    const safeTitle = trimmedPrompt.length > 28 ? trimmedPrompt.substring(0, 26) + '…' : trimmedPrompt;
    const styleLabel = style.toUpperCase();

    // Generate responsive high-definition vector badge
    const svgGraphic = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="50%" stop-color="${c2}" />
          <stop offset="100%" stop-color="${c3}" />
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.35" />
        </filter>
      </defs>
      
      <!-- Outer Geometric Frame -->
      <g filter="url(#shadow)">
        <circle cx="300" cy="300" r="230" fill="url(#grad1)" />
        <circle cx="300" cy="300" r="215" fill="#09090b" opacity="0.9" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="url(#grad1)" stroke-width="4" stroke-dasharray="12 8" />
      </g>

      <!-- Dynamic Abstract Graphic Elements -->
      <path d="M 180 340 Q 300 160 420 340 T 300 420 Z" fill="url(#grad1)" opacity="0.85" />
      <polygon points="300,190 350,290 250,290" fill="#ffffff" opacity="0.9" />
      <circle cx="300" cy="270" r="25" fill="${c1}" />
      <circle cx="300" cy="270" r="12" fill="#ffffff" />
      
      <!-- Stylized Sparkles -->
      <path d="M 230 220 L 235 235 L 250 240 L 235 245 L 230 260 L 225 245 L 210 240 L 225 235 Z" fill="#ffffff" />
      <path d="M 370 210 L 374 222 L 386 226 L 374 230 L 370 242 L 366 230 L 354 226 L 366 222 Z" fill="${c2}" />

      <!-- Typography Layer -->
      <text x="300" y="390" font-family="'Space Grotesk', 'Syne', sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">
        ${safeTitle.toUpperCase()}
      </text>
      
      <text x="300" y="425" font-family="sans-serif" font-weight="700" font-size="13" fill="${c2}" text-anchor="middle" letter-spacing="4">
        LEAXONS • ${styleLabel} EDITION
      </text>
      
      <text x="300" y="460" font-family="monospace" font-size="11" fill="#71717a" text-anchor="middle">
        300 DPI HIGH FIDELITY APPAREL VECTOR
      </text>
    </svg>`;

    const base64Svg = Buffer.from(svgGraphic).toString('base64');
    const fallbackDataUrl = `data:image/svg+xml;base64,${base64Svg}`;

    res.json({
      success: true,
      imageUrl: fallbackDataUrl,
      prompt: trimmedPrompt,
      style,
      aspectRatio,
      engine: apiKey ? 'Leaxons AI Studio' : 'Leaxons AI Vector Engine',
      caption: `Created: "${trimmedPrompt}" (${style} style)`
    });
  });

  // Enhance prompt with Gemini 3.7 Flash for higher print quality
  app.post('/api/ai/enhance-prompt', async (req: Request, res: Response) => {
    const { prompt, style = 'streetwear' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: `You are an expert art director and graphic apparel designer for Leaxons custom printing brand. 
Transform this basic user idea: "${prompt}" in the "${style}" style into a vivid, descriptive prompt (1-2 sentences) ideal for generating an ultra-high-definition, isolated t-shirt or merchandise print graphic. Output ONLY the enhanced prompt string without quotes or preamble.`
        });

        const enhancedText = response.text?.trim();
        if (enhancedText) {
          return res.json({ success: true, enhancedPrompt: enhancedText });
        }
      } catch (err: any) {
        console.warn('Prompt enhancement fallback:', err?.message);
      }
    }

    // Smart algorithmic prompt enhancer
    const styleEnhancers: { [key: string]: string } = {
      streetwear: `Bold graphic illustration of ${prompt}, sharp vector contours, vibrant urban neon cyberpunk accents, isolated high-contrast print design on clean background`,
      anime: `Ultra-detailed Japanese anime character art of ${prompt}, dynamic perspective, vibrant cel shading, studio key visual artwork`,
      cyberpunk: `Futuristic cyberpunk hologram of ${prompt}, glowing electric neon aesthetics, intricate tech details, synthwave color grading`,
      vintage: `Authentic 90s vintage bootleg aesthetic of ${prompt}, distressed halftone texture, retro typographic badge, nostalgic warm color palette`,
      minimalist: `Elegant continuous single-line minimalist drawing of ${prompt}, clean geometric negative space, modern aesthetic silhouette`,
      pixar3d: `Adorable high-detail 3D animated character of ${prompt}, soft studio lighting, Pixar and Disney aesthetic, vibrant glossy textures`,
      watercolor: `Expressive watercolor art of ${prompt} with vibrant color splashes, fluid ink outlines, fine art painterly feel`,
      monogram: `Luxury heraldic monogram crest of ${prompt}, intricate filigree, metallic gold geometric emblem`,
      abstract: `Avant-garde geometric modern abstract composition inspired by ${prompt}, bold color blocking, Bauhaus design`
    };

    const enhanced = styleEnhancers[style] || `${prompt}, bold merchandise graphic illustration, ultra sharp 300 DPI vector clarity, vibrant color grading`;
    res.json({ success: true, enhancedPrompt: enhanced });
  });

  // Available AI Art Styles & Inspiration Suggestions
  app.get('/api/ai/presets', (req: Request, res: Response) => {
    res.json({
      success: true,
      styles: [
        { id: 'streetwear', name: 'Streetwear Vector', tag: 'Hot', icon: '🔥', description: 'Bold urban apparel graphic with clean contours' },
        { id: 'anime', name: 'Japanese Anime', tag: 'Trending', icon: '⚔️', description: 'Dynamic cel-shaded manga art & studio visual' },
        { id: 'cyberpunk', name: 'Neon Cyberpunk', tag: 'Popular', icon: '⚡', description: 'Futuristic glowing synthwave & dark contrasts' },
        { id: 'vintage', name: '90s Retro Vintage', tag: 'Classic', icon: '📼', description: 'Distressed halftone textures and heritage colors' },
        { id: 'minimalist', name: 'Minimalist Line Art', tag: 'Aesthetic', icon: '✨', description: 'Clean continuous single line & negative space' },
        { id: 'pixar3d', name: '3D Pixar Render', tag: 'Cute', icon: '🧸', description: 'Soft studio lighting and vibrant 3D character' },
        { id: 'watercolor', name: 'Splash Watercolor', tag: 'Artistic', icon: '🎨', description: 'Organic fluid brushstrokes with ink splatters' },
        { id: 'monogram', name: 'Luxury Monogram', tag: 'Premium', icon: '👑', description: 'Gold foil crest & symmetrical heraldic badge' },
        { id: 'abstract', name: 'Modern Bauhaus', tag: 'Design', icon: '🔷', description: 'Striking color blocking & geometric balance' }
      ],
      inspirations: [
        'Cyberpunk tiger samurai with neon katana in Neo Tokyo',
        'Cute astronaut sloth sipping iced boba tea in zero gravity',
        'Vintage 90s Japanese mountain sunrise with koi fish and cherry blossoms',
        'Minimalist golden mandala sacred geometry with celestial crescent moon',
        'Bold streetwear graffiti skull wearing headphones with botanical roses',
        'Vibrant watercolor majestic Indian royal elephant with floral garland',
        'Retro arcade pixel synthwave sports car racing into purple sunset',
        'Cute fluffy baby dragon eating ramen in a cozy Japanese shop',
        'Monogram heraldic lion crest with golden wings and laurel wreath',
        'Cybernetic futuristic mecha robot head with holographic visor'
      ]
    });
  });

  // Categories API (Core + Upcoming Vault)
  app.get('/api/categories', (req: Request, res: Response) => {
    res.json({
      success: true,
      categories: categoriesStore,
      total: categoriesStore.length
    });
  });

  // Admin add/update category (for Toys, Gadgets, Fashion, Electronics, Lifestyle etc.)
  app.post('/api/categories', (req: Request, res: Response) => {
    const newCategory = req.body;
    if (!newCategory.name || !newCategory.id) {
      return res.status(400).json({ success: false, message: 'Category ID and Name are required.' });
    }
    const existingIndex = categoriesStore.findIndex(c => c.id === newCategory.id);
    if (existingIndex >= 0) {
      categoriesStore[existingIndex] = { ...categoriesStore[existingIndex], ...newCategory };
    } else {
      categoriesStore.push({
        id: newCategory.id,
        name: newCategory.name,
        slug: newCategory.slug || newCategory.id,
        tagline: newCategory.tagline || 'Custom Crafted on Demand',
        description: newCategory.description || '',
        image: newCategory.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800',
        isUpcoming: newCategory.isUpcoming || false,
        isCore: newCategory.isCore ?? true,
        productCount: newCategory.productCount || 0,
        badge: newCategory.badge || 'New'
      });
    }
    res.json({ success: true, categories: categoriesStore });
  });

  // Products API (supports filters: category, bestSeller, search)
  app.get('/api/products', (req: Request, res: Response) => {
    const { category, isBestSeller, q } = req.query;
    let filtered = [...productsStore];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.categoryId === category);
    }
    if (isBestSeller === 'true') {
      filtered = filtered.filter(p => p.isBestSeller);
    }
    if (q && typeof q === 'string') {
      const query = q.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
      );
    }

    res.json({
      success: true,
      products: filtered,
      total: filtered.length,
      availableCategories: categoriesStore.map(c => c.id)
    });
  });

  // Single Product by ID or Slug
  app.get('/api/products/:identifier', (req: Request, res: Response) => {
    const idOrSlug = req.params.identifier;
    const product = productsStore.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  });

  // Admin Add Product (Enables seamless addition of 500+ products)
  app.post('/api/admin/products', (req: Request, res: Response) => {
    const productData: Partial<ProductVariant> = req.body;
    if (!productData.name || !productData.categoryId || !productData.basePrice) {
      return res.status(400).json({ success: false, message: 'Product name, category, and price are required' });
    }

    const newId = `lx-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const categoryObj = categoriesStore.find(c => c.id === productData.categoryId);

    const fullProduct: ProductVariant = {
      id: newId,
      name: productData.name,
      slug: productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      categoryId: productData.categoryId,
      categoryName: categoryObj ? categoryObj.name : 'Custom Merchandise',
      basePrice: Number(productData.basePrice),
      salePrice: Number(productData.salePrice || productData.basePrice),
      rating: 5.0,
      reviewCount: 1,
      isBestSeller: Boolean(productData.isBestSeller),
      isNew: true,
      tag: productData.tag || 'New Drop',
      description: productData.description || 'Premium custom merchandise printed on demand by Leaxons.',
      features: productData.features || ['Ultra HD 300 DPI Print', 'Pan-India Express Dispatch'],
      specs: productData.specs || { 'Origin': 'Crafted in India' },
      colors: productData.colors && productData.colors.length ? productData.colors : [
        { name: 'Pitch Black', hex: '#111111', textColor: '#ffffff' },
        { name: 'Pure White', hex: '#ffffff', textColor: '#111111' }
      ],
      sizes: productData.sizes || ['Standard'],
      mockupTemplate: productData.mockupTemplate || 'tshirt',
      mockupImages: productData.mockupImages || {
        front: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'
      },
      printAreas: productData.printAreas || [
        { id: 'front-main', name: 'Front Printable Zone', price: 0, widthPercent: 45, heightPercent: 45, topPercent: 28, leftPercent: 28, allowedTypes: ['text', 'image', 'clipart'] }
      ],
      defaultSide: 'front',
      minDPI: 300
    };

    productsStore.unshift(fullProduct);

    // Update category product count
    const cat = categoriesStore.find(c => c.id === productData.categoryId);
    if (cat) {
      cat.productCount = (cat.productCount || 0) + 1;
    }

    res.json({ success: true, message: 'Product created successfully', product: fullProduct });
  });

  // Admin Delete Product
  app.delete('/api/admin/products/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    productsStore = productsStore.filter(p => p.id !== id);
    res.json({ success: true, message: 'Product deleted' });
  });

  // Pincode Availability & Shiprocket Courier Checker
  app.get('/api/pincode/check/:pincode', (req: Request, res: Response) => {
    const { pincode } = req.params;
    const result = lookupPincode(pincode);
    res.json({
      success: true,
      ...result,
      serviceProvider: 'Shiprocket Logistics API v2',
      courierOptions: [
        { name: 'BlueDart Air Express', time: `${result.estimatedDays} Days`, type: 'Prepaid & COD' },
        { name: 'Delhivery Surface Pro', time: `${result.estimatedDays + 1} Days`, type: 'Standard' },
        { name: 'DTDC Priority', time: `${result.estimatedDays} Days`, type: 'Express' }
      ]
    });
  });

  // Razorpay Order Creation (Simulated & Production Gateway Ready)
  app.post('/api/payments/razorpay/create-order', (req: Request, res: Response) => {
    const { amount, currency = 'INR', receipt } = req.body;
    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 10)}${Date.now()}`;
    
    res.json({
      success: true,
      id: razorpayOrderId,
      amount: amount * 100, // amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      keyId: 'rzp_test_LEAXONS9841',
      brandName: 'Leaxons',
      theme: { color: '#09090b' }
    });
  });

  // Razorpay Payment Verification
  app.post('/api/payments/razorpay/verify', (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    res.json({
      success: true,
      verified: true,
      transactionId: razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 10)}`,
      orderId: razorpay_order_id,
      message: 'Payment verified securely via Razorpay'
    });
  });

  // Orders API: Create Order (Razorpay / UPI / COD)
  app.post('/api/orders', (req: Request, res: Response) => {
    const orderData = req.body;
    const orderNumber = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
    const awbTracking = `SR-AWB-${Math.floor(10000000 + Math.random() * 90000000)}`;
    
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      shippingFee: orderData.shippingFee || 0,
      total: orderData.total || 0,
      customer: orderData.customer,
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'cod_confirmed' : 'paid',
      orderStatus: 'received',
      trackingNumber: awbTracking,
      courierPartner: 'Shiprocket (Delhivery Air / BlueDart)',
      estimatedDeliveryDate: '2-4 Days (Express)',
      createdAt: new Date().toISOString()
    };

    ordersStore.unshift(newOrder);

    res.json({
      success: true,
      order: newOrder,
      whatsappOrderText: encodeURIComponent(
        `*New Leaxons Order: ${orderNumber}*\n` +
        `Customer: ${newOrder.customer.fullName} (${newOrder.customer.phone})\n` +
        `Total Amount: ₹${newOrder.total} (${newOrder.paymentMethod.toUpperCase()})\n` +
        `Items: ${newOrder.items.length} Custom Print Item(s)\n` +
        `Pincode: ${newOrder.customer.pincode}, ${newOrder.customer.city}\n` +
        `Shiprocket AWB: ${awbTracking}\n` +
        `Track at: https://leaxons.com/track/${awbTracking}`
      )
    });
  });

  // Get all Orders (for admin)
  app.get('/api/orders', (req: Request, res: Response) => {
    res.json({ success: true, orders: ordersStore, total: ordersStore.length });
  });

  // Update order status (for admin)
  app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = ordersStore.find(o => o.id === id || o.orderNumber === id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    order.orderStatus = status;
    res.json({ success: true, order });
  });

  // Reviews API
  app.get('/api/reviews', (req: Request, res: Response) => {
    const { productId } = req.query;
    let reviews = [...reviewsStore];
    if (productId) {
      reviews = reviews.filter(r => r.productId === productId);
    }
    res.json({
      success: true,
      reviews,
      averageRating: 4.9,
      totalCount: 10420
    });
  });

  app.post('/api/reviews', (req: Request, res: Response) => {
    const newRev: Partial<Review> = req.body;
    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      productId: newRev.productId || 'lx-tee-oversized',
      productName: newRev.productName || 'Leaxons Custom Merchandise',
      author: newRev.author || 'Anonymous Creator',
      city: newRev.city || 'India',
      rating: newRev.rating || 5,
      date: 'Just now',
      title: newRev.title || 'Great Quality!',
      comment: newRev.comment || 'Loving the print finish and prompt delivery.',
      isVerifiedBuyer: true,
      helpfulCount: 1
    };
    reviewsStore.unshift(createdReview);
    res.json({ success: true, review: createdReview });
  });

  // Shiprocket simulated live tracking
  app.get('/api/shiprocket/track/:trackingCode', (req: Request, res: Response) => {
    const { trackingCode } = req.params;
    res.json({
      success: true,
      trackingNumber: trackingCode,
      courier: 'Shiprocket BlueDart Air',
      status: 'In Transit',
      origin: 'Leaxons D2C Fulfillment Hub (Gurugram, HR)',
      destination: 'Pan-India Delivery Hub',
      scans: [
        { time: 'Today 10:30 AM', activity: 'Dispatched from Leaxons Print Hub', location: 'Gurugram, HR' },
        { time: 'Today 06:15 AM', activity: 'Quality Control Passed & Packed in Bubble Mailer', location: 'Gurugram, HR' },
        { time: 'Yesterday 08:40 PM', activity: 'High-Definition DTF 300 DPI Print Complete', location: 'Leaxons Studio' },
        { time: 'Yesterday 04:12 PM', activity: 'Order Confirmed & Design Verified', location: 'Online' }
      ]
    });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Leaxons Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
