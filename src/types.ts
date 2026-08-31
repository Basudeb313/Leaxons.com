export type ProductCategory = 
  | 'custom-tshirts'
  | 'custom-caps'
  | 'custom-mugs'
  | 'custom-keychains'
  | 'custom-mousepads'
  | 'photo-frames'
  | 'toys'
  | 'gadgets'
  | 'fashion'
  | 'electronics'
  | 'lifestyle';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  isUpcoming: boolean;
  isCore: boolean;
  productCount: number;
  badge?: string;
  gradient?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  textColor: string;
}

export interface PrintArea {
  id: string;
  name: string;
  price: number;
  widthPercent: number;
  heightPercent: number;
  topPercent: number;
  leftPercent: number;
  allowedTypes: ('text' | 'image' | 'clipart')[];
}

export interface ProductVariant {
  id: string;
  name: string;
  slug: string;
  categoryId: ProductCategory;
  categoryName: string;
  basePrice: number;
  salePrice: number;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  tag?: string;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  colors: ProductColor[];
  sizes?: string[];
  mockupTemplate: string; // Template type for 3D/2D visualizer
  mockupImages: {
    front: string;
    back?: string;
    angle?: string;
    lifestyle?: string;
  };
  printAreas: PrintArea[];
  defaultSide: 'front' | 'back' | 'angle';
  minDPI: number;
}

export interface CustomDesignLayer {
  id: string;
  type: 'image' | 'text' | 'clipart';
  side: 'front' | 'back' | 'angle';
  content: string; // image URL or text string or clipart key
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isCurved?: boolean;
  curveRadius?: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  rotation: number;
}

export interface ProductCustomizationState {
  productId: string;
  selectedColor: ProductColor;
  selectedSize: string;
  selectedPrintSide: 'front' | 'back' | 'angle';
  layers: CustomDesignLayer[];
  printQuality: 'standard_dtf' | 'hd_embroidery' | 'sublimation_pro';
  extraNotes?: string;
}

export interface CartItem {
  id: string;
  product: ProductVariant;
  customization: ProductCustomizationState;
  quantity: number;
  unitPrice: number;
  previewThumbnail: string;
  addedAt: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
}

export type PaymentMethod = 'upi' | 'razorpay' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  customer: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'cod_confirmed' | 'failed';
  orderStatus: 'received' | 'in_print' | 'quality_check' | 'dispatched' | 'delivered';
  trackingNumber: string;
  courierPartner: string;
  estimatedDeliveryDate: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedBuyer: boolean;
  photos?: string[];
  helpfulCount: number;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  isServiceable: boolean;
  estimatedDays: number;
  codAvailable: boolean;
  courierPartner: string;
  expressAvailable: boolean;
}
