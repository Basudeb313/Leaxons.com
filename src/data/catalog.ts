import { CategoryInfo, ProductVariant, Review, PincodeInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'custom-tshirts',
    name: 'Custom T-Shirts',
    slug: 'custom-tshirts',
    tagline: 'Premium 220 GSM Bio-Washed Cotton',
    description: 'Ultra-soft oversized, classic & gym fit tees with HD DTF 300 DPI print that never cracks or fades.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    isUpcoming: false,
    isCore: true,
    productCount: 42,
    badge: 'Best Seller',
    gradient: 'from-zinc-900 to-zinc-700',
  },
  {
    id: 'custom-caps',
    name: 'Custom Caps',
    slug: 'custom-caps',
    tagline: 'Structured 6-Panel Twill & Snapbacks',
    description: 'Precision Japanese embroidery and high-density 3D puff print on breathable cotton twill.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    isUpcoming: false,
    isCore: true,
    productCount: 28,
    badge: 'Trending',
    gradient: 'from-stone-900 to-stone-700',
  },
  {
    id: 'custom-mugs',
    name: 'Custom Mugs',
    slug: 'custom-mugs',
    tagline: 'Gloss Ceramic & Thermal Tumblers',
    description: 'Microwave and dishwasher-safe Grade A+ glossy ceramic with 360° panoramic sublimation.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    isUpcoming: false,
    isCore: true,
    productCount: 35,
    badge: 'Popular Gift',
    gradient: 'from-amber-950 to-amber-800',
  },
  {
    id: 'custom-keychains',
    name: 'Custom Keychains',
    slug: 'custom-keychains',
    tagline: 'Crystal Acrylic & Laser Engraved Steel',
    description: 'Diamond-cut shatterproof 4mm acrylic and metallic alloy with double-sided HD UV print.',
    image: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=800&auto=format&fit=crop&q=80',
    isUpcoming: false,
    isCore: true,
    productCount: 50,
    badge: 'From ₹149',
    gradient: 'from-slate-900 to-slate-700',
  },
  {
    id: 'custom-mousepads',
    name: 'Custom Mousepads',
    slug: 'custom-mousepads',
    tagline: 'Speed Edition Micro-Woven Fabric',
    description: 'Anti-fray stitched edges with anti-slip natural rubber base and spill-resistant micro-texture.',
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&auto=format&fit=crop&q=80',
    isUpcoming: false,
    isCore: true,
    productCount: 22,
    badge: 'Gamer & Desk',
    gradient: 'from-neutral-900 to-neutral-800',
  },
  {
    id: 'photo-frames',
    name: 'Photo Frames',
    slug: 'photo-frames',
    tagline: 'Museum Grade Acrylic & Matte Wood',
    description: 'Ultra-clear glare-free acrylic with archival photographic printing that preserves memory for 50+ years.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    isUpcoming: false,
    isCore: true,
    productCount: 19,
    badge: 'Premium Finish',
    gradient: 'from-zinc-950 to-neutral-700',
  },
  // Upcoming Vault Categories
  {
    id: 'toys',
    name: 'Custom Toys & Plushies',
    slug: 'toys',
    tagline: '3D Action Figures & Custom Plush',
    description: 'Personalized mini 3D avatars, custom plushies, and custom printed wooden jigsaw puzzles.',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&auto=format&fit=crop&q=80',
    isUpcoming: true,
    isCore: false,
    productCount: 0,
    badge: 'Coming Soon',
    gradient: 'from-purple-950 to-indigo-900',
  },
  {
    id: 'gadgets',
    name: 'Custom Tech Gadgets',
    slug: 'gadgets',
    tagline: 'Wireless Chargers & Power Banks',
    description: 'Custom laser engraved MagSafe chargers, matte wireless earbuds cases, and metal smart power banks.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    isUpcoming: true,
    isCore: false,
    productCount: 0,
    badge: 'Q3 2026',
    gradient: 'from-cyan-950 to-blue-900',
  },
  {
    id: 'fashion',
    name: 'D2C Fashion & Hoodies',
    slug: 'fashion',
    tagline: '380 GSM Heavyweight French Terry',
    description: 'Boxy streetwear hoodies, varsity jackets, zip-ups and acid-wash vintage streetwear.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    isUpcoming: true,
    isCore: false,
    productCount: 0,
    badge: 'In Production',
    gradient: 'from-rose-950 to-red-900',
  },
  {
    id: 'electronics',
    name: 'Smart Electronics',
    slug: 'electronics',
    tagline: 'LED Neon Signs & Smart Desk Clocks',
    description: 'Custom illuminated RGB neon nameplates, ambient smart matrix displays, and Bluetooth speaker cubes.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    isUpcoming: true,
    isCore: false,
    productCount: 0,
    badge: 'Preview Only',
    gradient: 'from-emerald-950 to-teal-900',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Travel',
    slug: 'lifestyle',
    tagline: 'Canvas Duffle & Thermal Flasks',
    description: 'Custom embroidered travel duffle bags, stainless steel insulated bottles, and leatherette passport wallets.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    isUpcoming: true,
    isCore: false,
    productCount: 0,
    badge: 'Sneak Peek',
    gradient: 'from-amber-950 to-orange-900',
  }
];

export const PRODUCTS: ProductVariant[] = [
  {
    id: 'lx-tee-oversized',
    name: 'Signature Oversized Streetwear T-Shirt',
    slug: 'signature-oversized-streetwear-tshirt',
    categoryId: 'custom-tshirts',
    categoryName: 'Custom T-Shirts',
    basePrice: 699,
    salePrice: 549,
    rating: 4.9,
    reviewCount: 328,
    isBestSeller: true,
    tag: 'National Bestseller',
    description: 'Engineered with 240 GSM heavy-combed cotton for the quintessential relaxed drop-shoulder silhouette. Features reinforced twin-needle stitching and color-locking pre-shrunk fabric that holds shape wash after wash.',
    features: [
      '240 GSM 100% Super Combed Bio-Washed Cotton',
      'Ultra HD DTF 300 DPI Transfer Print',
      'Pre-shrunk, Zero Color Bleeding Guarantee',
      'Drop Shoulder Relaxed Urban Fit',
      'Pan-India Dispatch in 24-48 Hours'
    ],
    specs: {
      'Fabric': '100% Super Combed Cotton (Bio-Washed)',
      'GSM': '240 Heavyweight',
      'Fit': 'Oversized / Drop Shoulder',
      'Neckline': 'Lycra Ribbed Crew Neck',
      'Wash Care': 'Machine wash cold inside out, iron on reverse'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#111111', textColor: '#ffffff' },
      { name: 'Optic White', hex: '#fcfcfc', textColor: '#111111' },
      { name: 'Sage Olive', hex: '#4a5342', textColor: '#ffffff' },
      { name: 'Midnight Navy', hex: '#162238', textColor: '#ffffff' },
      { name: 'Dusty Crimson', hex: '#7a2828', textColor: '#ffffff' },
      { name: 'Sand Khaki', hex: '#c8b69b', textColor: '#111111' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    mockupTemplate: 'tshirt',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      back: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      lifestyle: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'front-chest', name: 'Front Chest / Center', price: 0, widthPercent: 44, heightPercent: 44, topPercent: 28, leftPercent: 28, allowedTypes: ['text', 'image', 'clipart'] },
      { id: 'back-full', name: 'Full Back Statement', price: 99, widthPercent: 50, heightPercent: 50, topPercent: 25, leftPercent: 25, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-cap-structured',
    name: 'Pro-Structured 6-Panel Baseball Cap',
    slug: 'pro-structured-6-panel-baseball-cap',
    categoryId: 'custom-caps',
    categoryName: 'Custom Caps',
    basePrice: 499,
    salePrice: 399,
    rating: 4.8,
    reviewCount: 184,
    isBestSeller: true,
    tag: 'Trending Now',
    description: 'Premium heavyweight cotton twill with an ultra-rigid buckram front panel to showcase intricate embroidery, 3D puff monograms, or high-definition heat transfers.',
    features: [
      '100% Breathable Chino Cotton Twill',
      'Pro-Stitched Crown with 6 Embroidered Eyelets',
      'Adjustable Antique Brass Buckle Closure (54-62cm)',
      'Pre-Curved Visor with Contrast Underbill',
      'Sweat-Wicking Inner Headband'
    ],
    specs: {
      'Material': 'Chino Cotton Twill',
      'Profile': 'Mid-Profile Structured',
      'Closure': 'Metal Slider Buckle (Unisex Size)',
      'Visor': 'Curved 8-Row Stitch'
    },
    colors: [
      { name: 'Pitch Black', hex: '#181818', textColor: '#ffffff' },
      { name: 'Bone White', hex: '#f2eee6', textColor: '#181818' },
      { name: 'Vintage Khaki', hex: '#a8987b', textColor: '#ffffff' },
      { name: 'Royal Navy', hex: '#1b263b', textColor: '#ffffff' },
      { name: 'Forest Green', hex: '#264653', textColor: '#ffffff' }
    ],
    sizes: ['One Size (Adjustable)'],
    mockupTemplate: 'cap',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      angle: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'front-crown', name: 'Front Crown Patch', price: 0, widthPercent: 40, heightPercent: 32, topPercent: 36, leftPercent: 30, allowedTypes: ['text', 'image', 'clipart'] },
      { id: 'side-arch', name: 'Side Mini Emblem', price: 49, widthPercent: 24, heightPercent: 24, topPercent: 42, leftPercent: 65, allowedTypes: ['text', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-mug-ceramic',
    name: 'Dual-Tone Gloss Ceramic Coffee Mug (350ml)',
    slug: 'dual-tone-gloss-ceramic-coffee-mug',
    categoryId: 'custom-mugs',
    categoryName: 'Custom Mugs',
    basePrice: 399,
    salePrice: 299,
    rating: 4.9,
    reviewCount: 412,
    isBestSeller: true,
    tag: 'Gift Favorite',
    description: 'Food-grade AAA+ porcelain ceramic with deep rich interior colors and pure glossy exterior. Panoramic 360-degree high-density sublimation with zero pixelation.',
    features: [
      'Grade AAA+ Microwave & Dishwasher Safe Ceramic',
      '360° Edge-to-Edge Gloss Sublimation Wrap',
      'Comfort-Grip Ergonomic C-Handle',
      'Breakage-Proof Secure Thermocol Packaging',
      'Non-Toxic Lead-Free Glaze'
    ],
    specs: {
      'Capacity': '350 ml / 11.8 oz',
      'Material': 'Pure Porcelain Ceramic',
      'Diameter': '8.2 cm, Height 9.6 cm',
      'Safety': 'Microwave & Dishwasher Approved'
    },
    colors: [
      { name: 'Pure White Gloss', hex: '#ffffff', textColor: '#111111' },
      { name: 'Dual Black & White', hex: '#1a1a1a', textColor: '#ffffff' },
      { name: 'Dual Crimson Red', hex: '#991b1b', textColor: '#ffffff' },
      { name: 'Dual Cobalt Blue', hex: '#1e40af', textColor: '#ffffff' },
      { name: 'Dual Sunshine Yellow', hex: '#ca8a04', textColor: '#111111' }
    ],
    mockupTemplate: 'mug',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      angle: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'front-mug', name: 'Front Face Print', price: 0, widthPercent: 36, heightPercent: 44, topPercent: 30, leftPercent: 32, allowedTypes: ['text', 'image', 'clipart'] },
      { id: 'wrap-mug', name: 'Full 360° Wrap', price: 50, widthPercent: 65, heightPercent: 44, topPercent: 30, leftPercent: 18, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-keychain-acrylic',
    name: 'Custom Crystal Clear Acrylic Keychain',
    slug: 'custom-crystal-clear-acrylic-keychain',
    categoryId: 'custom-keychains',
    categoryName: 'Custom Keychains',
    basePrice: 199,
    salePrice: 149,
    rating: 4.9,
    reviewCount: 520,
    isBestSeller: true,
    tag: 'Best Value',
    description: 'Precision CNC laser cut 4mm shatter-resistant optical acrylic with double-sided UV cured scratch-proof print and premium alloy swivel ring.',
    features: [
      '4mm Ultra-Clear Shatterproof Optical Acrylic',
      'Dual-Sided High-Definition UV Protected Print',
      'Custom Outline Die-Cut to Match Your Artwork',
      'Heavy Duty Rust-Free Alloy Swivel Clasp',
      'Individually Poly-Bagged with Protective Peel Film'
    ],
    specs: {
      'Thickness': '4 mm Extra Thick',
      'Dimensions': '6 cm x 6 cm Max Die-cut',
      'Ring Material': 'Zinc Alloy with Nickle Polish'
    },
    colors: [
      { name: 'Crystal Clear', hex: '#f0f9ff', textColor: '#0f172a' },
      { name: 'Smoky Tint', hex: '#334155', textColor: '#ffffff' },
      { name: 'Holographic Shimmer', hex: '#e0e7ff', textColor: '#312e81' }
    ],
    mockupTemplate: 'keychain',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'acrylic-face', name: 'Full Die-cut Area', price: 0, widthPercent: 48, heightPercent: 48, topPercent: 28, leftPercent: 26, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-mousepad-deskmat',
    name: 'Ultra-Smooth Speed Edition Desk Mat (800x300mm)',
    slug: 'ultra-smooth-speed-edition-desk-mat',
    categoryId: 'custom-mousepads',
    categoryName: 'Custom Mousepads',
    basePrice: 599,
    salePrice: 449,
    rating: 4.9,
    reviewCount: 295,
    isBestSeller: true,
    tag: 'Desk Setup Essential',
    description: 'High-density micro-woven cloth surface engineered for pinpoint sensor tracking. Anti-fray 360-degree precision edge stitching and 4mm heavy textured rubber base.',
    features: [
      'Micro-Textured High-Density Fabric for Low Friction',
      'Spill-Resistant Hydrophobic Coating',
      'Edge-To-Edge 300 DPI Thermal Sublimation',
      'Non-Slip Vulcanized Textured Rubber Grip',
      'Generous 800mm x 300mm Wide Workspace Area'
    ],
    specs: {
      'Dimensions': '800 mm x 300 mm x 4 mm',
      'Surface': 'Smooth Speed Micro-Weave Cloth',
      'Base': 'Anti-Skid Natural Rubber',
      'Edge': 'Precision Interlocking Stitching'
    },
    colors: [
      { name: 'Jet Black Edge', hex: '#171717', textColor: '#ffffff' },
      { name: 'Cyber White Edge', hex: '#f5f5f5', textColor: '#171717' },
      { name: 'Titanium Gray', hex: '#404040', textColor: '#ffffff' }
    ],
    sizes: ['XL Desk Mat (80x30cm)', 'Standard Gaming (24x20cm)', 'XXL Battle Station (90x40cm)'],
    mockupTemplate: 'mousepad',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'deskmat-full', name: 'Panoramic Desk Surface', price: 0, widthPercent: 78, heightPercent: 55, topPercent: 22, leftPercent: 11, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-frame-minimalist',
    name: 'Museum-Grade Floating Acrylic Photo Frame',
    slug: 'museum-grade-floating-acrylic-photo-frame',
    categoryId: 'photo-frames',
    categoryName: 'Photo Frames',
    basePrice: 899,
    salePrice: 699,
    rating: 5.0,
    reviewCount: 167,
    isBestSeller: true,
    tag: 'Premium Luxury',
    description: 'High-clarity optical cast acrylic face with archival true-tone photographic print. Features solid metallic brass standoffs and minimalist floating bevel.',
    features: [
      'Optical Quality Anti-Glare Cast Acrylic',
      'Archival Giclée Photo Print (50+ Year Color Life)',
      'Brushed Champagne Gold & Matte Black Brass Standoffs',
      'Wall Mount & Tabletop Dual Display Support',
      'Handcrafted Zero-Bubble Acrylic Sealing'
    ],
    specs: {
      'Frame Size': '8x10 Inch / 12x18 Inch / A4',
      'Material': 'Pure Acrylic + Solid Aluminum Standoffs',
      'Print': '12-Color HD Archival Photo Paper'
    },
    colors: [
      { name: 'Brushed Brass / Clear', hex: '#d4af37', textColor: '#000000' },
      { name: 'Matte Onyx Black', hex: '#1c1917', textColor: '#ffffff' },
      { name: 'Silver Chrome', hex: '#e2e8f0', textColor: '#0f172a' }
    ],
    sizes: ['A4 (8.3 x 11.7 in)', '8 x 10 in', '12 x 18 in Large Gallery'],
    mockupTemplate: 'frame',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'frame-photo', name: 'Center Photo Window', price: 0, widthPercent: 50, heightPercent: 58, topPercent: 21, leftPercent: 25, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-tee-classic-polo',
    name: 'Luxury Pique Cotton Custom Polo',
    slug: 'luxury-pique-cotton-custom-polo',
    categoryId: 'custom-tshirts',
    categoryName: 'Custom T-Shirts',
    basePrice: 799,
    salePrice: 649,
    rating: 4.8,
    reviewCount: 142,
    isBestSeller: false,
    tag: 'Corporate & Casual',
    description: 'Crafted from 230 GSM honeycomb pique cotton with a structured ribbed collar and pearlized buttons. Ideal for subtle crest embroidery or pocket prints.',
    features: [
      '230 GSM Honeycomb Pique Cotton',
      'Ribbed Collar & Sleeve Cuffs',
      'Laser-Engraved Pearl Finish Buttons',
      'Bio-Washed for Zero Pilling',
      'Tailored Regular Fit'
    ],
    specs: {
      'Fabric': '100% Combed Pique Cotton',
      'GSM': '230 GSM',
      'Collar': 'Ribbed Flatknit'
    },
    colors: [
      { name: 'Classic Navy', hex: '#1e293b', textColor: '#ffffff' },
      { name: 'Pure White', hex: '#ffffff', textColor: '#000000' },
      { name: 'Charcoal Grey', hex: '#334155', textColor: '#ffffff' },
      { name: 'Royal Maroon', hex: '#831843', textColor: '#ffffff' }
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    mockupTemplate: 'tshirt',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'left-chest', name: 'Left Chest Emblem', price: 0, widthPercent: 25, heightPercent: 25, topPercent: 30, leftPercent: 56, allowedTypes: ['text', 'image', 'clipart'] },
      { id: 'back-crest', name: 'Upper Back Tag', price: 69, widthPercent: 35, heightPercent: 25, topPercent: 25, leftPercent: 32, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  },
  {
    id: 'lx-mug-magic',
    name: 'Heat-Sensitive Color Changing Magic Mug',
    slug: 'heat-sensitive-color-changing-magic-mug',
    categoryId: 'custom-mugs',
    categoryName: 'Custom Mugs',
    basePrice: 499,
    salePrice: 369,
    rating: 4.9,
    reviewCount: 389,
    isBestSeller: true,
    tag: 'Surprise Gift',
    description: 'Black ceramic mug that magically reveals your custom photo or artwork when hot beverage (coffee, tea, water) is poured in!',
    features: [
      'Thermo-Chromic Matte Coating',
      'Reveals Vibrant 300 DPI Artwork at >45°C',
      'FDA Approved Ceramic & Non-Toxic Dyes',
      '330ml Generous Volume',
      'Gift-Ready Safety Box'
    ],
    specs: {
      'Volume': '330 ml',
      'Technology': 'Thermo-Chromic Thermal Coating',
      'Care': 'Gentle Hand Wash (No abrasive pads)'
    },
    colors: [
      { name: 'Matte Magic Black', hex: '#111827', textColor: '#ffffff' },
      { name: 'Magic Midnight Blue', hex: '#1e3a8a', textColor: '#ffffff' }
    ],
    mockupTemplate: 'mug',
    mockupImages: {
      front: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    },
    printAreas: [
      { id: 'wrap-magic', name: 'Panoramic Magic Window', price: 0, widthPercent: 60, heightPercent: 44, topPercent: 30, leftPercent: 20, allowedTypes: ['text', 'image', 'clipart'] }
    ],
    defaultSide: 'front',
    minDPI: 300
  }
];

export const CLIPARTS = [
  { id: 'heart', name: 'Heart Flame', svg: '❤️', category: 'Love' },
  { id: 'star', name: 'Glitter Star', svg: '✨', category: 'Aesthetic' },
  { id: 'crown', name: 'Monarch Crown', svg: '👑', category: 'Badge' },
  { id: 'fire', name: 'Lit Fire', svg: '🔥', category: 'Hype' },
  { id: 'lightning', name: 'Thunder Bolt', svg: '⚡', category: 'Street' },
  { id: 'rocket', name: 'Cosmic Rocket', svg: '🚀', category: 'Tech' },
  { id: 'skull', name: 'Cyber Skull', svg: '💀', category: 'Street' },
  { id: 'butterfly', name: 'Y2K Butterfly', svg: '🦋', category: 'Aesthetic' },
  { id: 'peace', name: 'Peace Sign', svg: '✌️', category: 'Retro' },
  { id: 'india-flag', name: 'India Pride', svg: '🇮🇳', category: 'Desi' },
  { id: 'coffee', name: 'Coffee Cup', svg: '☕', category: 'Lifestyle' },
  { id: 'camera', name: 'Retro Shutter', svg: '📸', category: 'Memories' }
];

export const FONT_OPTIONS = [
  { id: 'jakarta', name: 'Plus Jakarta (Modern)', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  { id: 'syne', name: 'Syne (Avant-Garde)', fontFamily: "'Syne', sans-serif" },
  { id: 'bebas', name: 'Bebas Neue (Impact)', fontFamily: "'Bebas Neue', sans-serif" },
  { id: 'playfair', name: 'Playfair (Luxury Serif)', fontFamily: "'Playfair Display', serif" },
  { id: 'space', name: 'Space Grotesk (Tech)', fontFamily: "'Space Grotesk', monospace" },
  { id: 'inter', name: 'Inter (Clean Apple)', fontFamily: "'Inter', sans-serif" }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'lx-tee-oversized',
    productName: 'Signature Oversized Streetwear T-Shirt',
    author: 'Aarav Sharma',
    city: 'Bengaluru, Karnataka',
    rating: 5,
    date: '3 days ago',
    title: 'Print quality is insane! Better than international brands',
    comment: 'I uploaded my own 3D graphic artwork and was worried the DTF print would feel rubbery. To my surprise, the fabric is super soft 240 GSM heavy cotton and the colors pop vibrantly without any cracking. Received in 3 days via Shiprocket!',
    isVerifiedBuyer: true,
    photos: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80'
    ],
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    productId: 'lx-mug-ceramic',
    productName: 'Dual-Tone Gloss Ceramic Coffee Mug',
    author: 'Pooja Iyer',
    city: 'Mumbai, Maharashtra',
    rating: 5,
    date: '1 week ago',
    title: 'Best personalized corporate & personal gift',
    comment: 'Ordered 15 custom mugs with employee names and personalized illustrations. Each mug came in solid thermocol packaging with zero damage. The live preview on the website is 100% accurate to the actual printed mug. Ordering more for Diwali!',
    isVerifiedBuyer: true,
    helpfulCount: 29
  },
  {
    id: 'rev-3',
    productId: 'lx-cap-structured',
    productName: 'Pro-Structured 6-Panel Baseball Cap',
    author: 'Rohan Deshmukh',
    city: 'Pune, Maharashtra',
    rating: 5,
    date: '2 weeks ago',
    title: 'The structure of the cap is legit premium',
    comment: 'The buckle closure and high-density embroidery look like something out of a luxury boutique in Bandra. Fits perfectly and breathable in Pune heat.',
    isVerifiedBuyer: true,
    helpfulCount: 18
  },
  {
    id: 'rev-4',
    productId: 'lx-mousepad-deskmat',
    productName: 'Ultra-Smooth Speed Edition Desk Mat',
    author: 'Vikramaditya Roy',
    city: 'Gurugram, Haryana',
    rating: 5,
    date: '2 weeks ago',
    title: 'My desk setup transformed completely',
    comment: 'Edge-to-edge sublimation print is crystal clear. My Logitech G Pro mouse glides like ice. COD order was seamless with WhatsApp tracking updates.',
    isVerifiedBuyer: true,
    helpfulCount: 35
  },
  {
    id: 'rev-5',
    productId: 'lx-frame-minimalist',
    productName: 'Museum-Grade Floating Acrylic Photo Frame',
    author: 'Ananya Verma',
    city: 'Delhi NCR',
    rating: 5,
    date: '3 weeks ago',
    title: 'Tears of joy for anniversary gift',
    comment: 'Framed our wedding photograph in the 12x18 acrylic format. The floating brass standoffs make it look like a high-end art gallery piece on our living room wall. Highly recommended!',
    isVerifiedBuyer: true,
    helpfulCount: 54
  }
];

export const PINCODE_DATABASE: { [prefix: string]: { city: string; state: string; days: number } } = {
  '110': { city: 'New Delhi', state: 'Delhi', days: 2 },
  '400': { city: 'Mumbai', state: 'Maharashtra', days: 2 },
  '560': { city: 'Bengaluru', state: 'Karnataka', days: 2 },
  '600': { city: 'Chennai', state: 'Tamil Nadu', days: 3 },
  '700': { city: 'Kolkata', state: 'West Bengal', days: 3 },
  '500': { city: 'Hyderabad', state: 'Telangana', days: 2 },
  '411': { city: 'Pune', state: 'Maharashtra', days: 2 },
  '380': { city: 'Ahmedabad', state: 'Gujarat', days: 2 },
  '302': { city: 'Jaipur', state: 'Rajasthan', days: 3 },
  '226': { city: 'Lucknow', state: 'Uttar Pradesh', days: 3 },
  '160': { city: 'Chandigarh', state: 'Punjab / Haryana', days: 2 },
  '682': { city: 'Kochi', state: 'Kerala', days: 3 },
  '452': { city: 'Indore', state: 'Madhya Pradesh', days: 3 },
  '800': { city: 'Patna', state: 'Bihar', days: 3 },
  '781': { city: 'Guwahati', state: 'Assam', days: 4 }
};

export function lookupPincode(pincode: string): PincodeInfo {
  const cleanPin = pincode.replace(/\D/g, '').slice(0, 6);
  
  if (cleanPin.length !== 6) {
    return {
      pincode: cleanPin,
      city: '',
      state: '',
      isServiceable: false,
      estimatedDays: 0,
      codAvailable: false,
      courierPartner: 'Shiprocket Express',
      expressAvailable: false
    };
  }

  const prefix = cleanPin.slice(0, 3);
  const matched = PINCODE_DATABASE[prefix];

  if (matched) {
    return {
      pincode: cleanPin,
      city: matched.city,
      state: matched.state,
      isServiceable: true,
      estimatedDays: matched.days,
      codAvailable: true,
      courierPartner: 'Shiprocket BlueDart / Delhivery Air',
      expressAvailable: true
    };
  }

  // Pan India default fallback for valid 6 digit Indian pin
  return {
    pincode: cleanPin,
    city: 'Pan-India Destination',
    state: 'India',
    isServiceable: true,
    estimatedDays: 4,
    codAvailable: true,
    courierPartner: 'Shiprocket Express Ground / Air',
    expressAvailable: true
  };
}
