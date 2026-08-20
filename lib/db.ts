import fs from 'fs';
import path from 'path';

export interface Product {
  id: number;
  badge?: string;
  category: 'Incense Sticks Packs' | 'Incense Powder Packs' | 'Air Fresheners' | 'Diffuser' | 'Combo Bundle' | 'Wholesale Products';
  name: string;
  price: string;
  originalPrice: string;
  discountText?: string;
  rating: number;
  reviewCount: number;
  wishlistActive?: boolean;
  shipping?: string;
  storeCategory?: string;
  stockState?: 'in_stock' | 'out_of_stock' | 'notified';
  iconType: 'flame' | 'sparkles' | 'wind' | 'droplets';
  image?: string;
  description?: string;
  burnTime?: string;
  scentNotes?: string[];
  hidden?: boolean;
}

export interface HeroSlide {
  id: number;
  offer: string;
  badge: string;
  heading: string;
  desc: string;
  icon: string;
  bannerImage?: string;
  whatsappMsg?: string;
  glassCard?: {
    badge: string;
    price: string;
    sub: string;
    items: string[];
  };
}

export interface SectionVisibility {
  hero: boolean;
  benefits: boolean;
  dailyDiscount: boolean;
  bestSelling: boolean;
  categories: boolean;
  topSelling: boolean;
  ourProducts: boolean;
  wholesaleProducts: boolean;
  promoBanners: boolean;
  newlyLaunched: boolean;
  hotDeals: boolean;
  newsletter: boolean;
}

export interface PageVisibility {
  shop: boolean;
  comboBundle: boolean;
  about: boolean;
  contact: boolean;
  wishlist: boolean;
  cart: boolean;
  trackOrder: boolean;
}

export interface StoreSettings {
  storeName: string;
  storeSlogan: string;
  regNo: string;
  whatsappNumber: string;
  whatsappMessage: string;
  announcementText: string;
  maintenanceMode: boolean;
  maintenanceNotice: string;
  freeDeliveryThreshold: number;
  deliveryFee: number;
  adminPin: string;
}

export interface StoreDatabaseData {
  products: Product[];
  heroSlides: HeroSlide[];
  sectionVisibility: SectionVisibility;
  pageVisibility: PageVisibility;
  settings: StoreSettings;
  updatedAt: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    badge: '15% OFF',
    category: 'Incense Sticks Packs',
    iconType: 'flame',
    image: '/product_thulasi_sticks.jpg',
    name: 'EECO Thulasi Herbal Incense Sticks Pack (14 Packets)',
    price: 'Rs. 1,350.00',
    originalPrice: 'Rs. 1,600.00',
    discountText: '15% OFF',
    rating: 5,
    reviewCount: 240,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Sticks',
    stockState: 'in_stock',
    burnTime: '45 mins per stick',
    scentNotes: ['Holy Basil (Thulasi)', 'Ayurvedic Herbal Blend', 'Sacred Sandal'],
    description: 'Authentic handcrafted Thulasi herbal incense sticks for meditation, prayer, and refreshing living spaces with sacred herbal aroma.',
  },
  {
    id: 2,
    badge: '15% OFF',
    category: 'Incense Sticks Packs',
    iconType: 'flame',
    image: '/product_pink_rose_sticks.jpg',
    name: 'EECO Pink Rose Fragrance Incense Sticks Pack (14 Packets)',
    price: 'Rs. 1,350.00',
    originalPrice: 'Rs. 1,600.00',
    discountText: '15% OFF',
    rating: 5,
    reviewCount: 215,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Sticks',
    stockState: 'in_stock',
    burnTime: '45 mins per stick',
    scentNotes: ['Sweet Damask Rose', 'Floral Essence', 'Subtle Amber'],
    description: 'Delicate floral aroma of fresh blooming pink roses crafted to bring tranquility, romance, and peaceful ambiance to your home.',
  },
  {
    id: 3,
    badge: 'HOT',
    category: 'Air Fresheners',
    iconType: 'wind',
    image: '/product_jasmine_air_freshener.jpg',
    name: 'EECO Jasmine Luxury Air Freshener Spray 100ml',
    price: 'Rs. 690.00',
    originalPrice: 'Rs. 850.00',
    discountText: '18% OFF',
    rating: 5,
    reviewCount: 198,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Air Fresheners',
    stockState: 'in_stock',
    burnTime: 'Long Lasting Spray',
    scentNotes: ['Pure Jasmine Blossoms', 'Morning Dew', 'Gentle Citrus'],
    description: 'Instant room freshness with natural Jasmine extract. Neutralizes odor and envelops rooms in refreshing floral elegance.',
  },
  {
    id: 4,
    badge: 'BEST SELLER',
    category: 'Incense Powder Packs',
    iconType: 'sparkles',
    image: '/product_sambrani_powder.jpg',
    name: 'EECO Pure Herbal Sambrani Dhoop Powder 100g',
    price: 'Rs. 750.00',
    originalPrice: 'Rs. 950.00',
    discountText: '21% OFF',
    rating: 5,
    reviewCount: 310,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Powder',
    stockState: 'in_stock',
    burnTime: 'Pure resin smoke',
    scentNotes: ['Natural Benzoin Resin', 'Frankincense', 'Spiritual Dhoop'],
    description: 'Authentic temple grade Sambrani incense powder for sacred poojas, removing negativity, and purifying room atmosphere naturally.',
  },
  {
    id: 5,
    badge: 'POPULAR',
    category: 'Diffuser',
    iconType: 'droplets',
    image: '/product_lemongrass_oil.jpg',
    name: 'EECO Sri Lankan Pure Lemongrass Essential Aroma Oil 30ml',
    price: 'Rs. 1,450.00',
    originalPrice: 'Rs. 1,800.00',
    discountText: '19% OFF',
    rating: 5,
    reviewCount: 180,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Diffuser',
    stockState: 'in_stock',
    burnTime: 'Diffuser Drops',
    scentNotes: ['Ceylon Lemongrass', 'Citrus Top', 'Herbal Base'],
    description: 'Pure extracted Ceylon lemongrass essential oil. Natural mosquito repellent and revitalizing aroma for reed and electric diffusers.',
  },
  {
    id: 6,
    badge: '20% OFF',
    category: 'Combo Bundle',
    iconType: 'sparkles',
    image: '/product_mega_combo.jpg',
    name: 'EECO Mega Aromatic Bundle (14 Sticks + 2 Powders + Diffuser)',
    price: 'Rs. 3,850.00',
    originalPrice: 'Rs. 4,800.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 420,
    shipping: 'FREE Delivery Islandwide',
    storeCategory: 'Combo Bundle',
    stockState: 'in_stock',
    burnTime: 'Complete set',
    scentNotes: ['Assorted Signature Collection', 'Herbal & Floral Variety'],
    description: 'The ultimate home fragrance gift collection containing 14 handcrafted incense stick packs, 2 herbal powders, and natural aroma diffuser.',
  },
  {
    id: 7,
    badge: 'VALUE PACK',
    category: 'Wholesale Products',
    iconType: 'flame',
    image: '/product_wholesale_pack.jpg',
    name: 'EECO Retail Wholesale Box (50 Handcrafted Stick Packets)',
    price: 'Rs. 4,200.00',
    originalPrice: 'Rs. 5,500.00',
    discountText: '24% OFF',
    rating: 5,
    reviewCount: 145,
    shipping: 'Bulk Courier Dispatch',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: 'Bulk Retail Stock',
    scentNotes: ['Multi-Aroma Retail Mix', 'Thulasi, Rose, Sandalwood'],
    description: 'Special wholesale pack for shops, spiritual centres, and bulk purchasers with maximum retail margin and verified shelf quality.',
  },
  {
    id: 8,
    badge: '14-in-1 PACK',
    category: 'Incense Sticks Packs',
    iconType: 'flame',
    image: '/product_sandalwood_sticks.jpg',
    name: 'EECO Royal Sandalwood Incense Sticks Pack (14 Packets)',
    price: 'Rs. 1,450.00',
    originalPrice: 'Rs. 1,750.00',
    discountText: '17% OFF',
    rating: 5,
    reviewCount: 290,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Sticks',
    stockState: 'in_stock',
    burnTime: '45 mins per stick',
    scentNotes: ['Royal Mysore Sandalwood', 'Woody Amber', 'Sacred Musk'],
    description: 'Deep woody sandalwood sticks prepared using traditional artisanal recipes to create a calming and divine meditation sanctuary.',
  },
  {
    id: 9,
    badge: 'SPECIAL',
    category: 'Incense Powder Packs',
    iconType: 'sparkles',
    image: '/product_cinnamon_powder.jpg',
    name: 'EECO Ceylon Cinnamon & Clove Herbal Dhoop Powder 100g',
    price: 'Rs. 800.00',
    originalPrice: 'Rs. 990.00',
    discountText: '19% OFF',
    rating: 5,
    reviewCount: 162,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Powder',
    stockState: 'in_stock',
    burnTime: 'Rich spicy smoke',
    scentNotes: ['Ceylon Cinnamon Bark', 'Spicy Clove', 'Herbal Bark'],
    description: 'Warm spicy fragrance made with real Ceylon cinnamon bark and aromatic cloves for warm energetic home vibration.',
  },
  {
    id: 10,
    badge: 'FRESH',
    category: 'Air Fresheners',
    iconType: 'wind',
    image: '/product_lavender_spray.jpg',
    name: 'EECO French Lavender Relaxation Air Freshener Spray 100ml',
    price: 'Rs. 690.00',
    originalPrice: 'Rs. 850.00',
    discountText: '18% OFF',
    rating: 5,
    reviewCount: 175,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Air Fresheners',
    stockState: 'in_stock',
    burnTime: 'Long Lasting Spray',
    scentNotes: ['French Lavender', 'Chamomile Herb', 'Soft Vanilla'],
    description: 'Calming lavender spray designed for bedrooms, meditation corners, and stress-free soothing environments before sleep.',
  },
  {
    id: 11,
    badge: 'EXCLUSIVE',
    category: 'Diffuser',
    iconType: 'droplets',
    image: '/product_eucalyptus_oil.jpg',
    name: 'EECO Natural Eucalyptus & Mint Diffuser Aroma Blend 30ml',
    price: 'Rs. 1,450.00',
    originalPrice: 'Rs. 1,800.00',
    discountText: '19% OFF',
    rating: 5,
    reviewCount: 140,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Diffuser',
    stockState: 'in_stock',
    burnTime: 'Diffuser Drops',
    scentNotes: ['Cool Eucalyptus', 'Wild Peppermint', 'Crisp Herbal Pine'],
    description: 'Refreshing therapeutic aroma oil blend to clear nasal pathways, refresh stale air, and energize workspaces.',
  },
  {
    id: 12,
    badge: 'GIFT SET',
    category: 'Combo Bundle',
    iconType: 'sparkles',
    image: '/product_starter_combo.jpg',
    name: 'EECO Heritage Starter Pack (7 Incense Sticks + 1 Herbal Powder)',
    price: 'Rs. 1,950.00',
    originalPrice: 'Rs. 2,450.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 230,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Combo Bundle',
    stockState: 'in_stock',
    burnTime: 'Handy Starter Set',
    scentNotes: ['Thulasi, Sandalwood, Jasmine & Sambrani'],
    description: 'The perfect introductory aromatic gift box for your household featuring popular handcrafted stick varieties and herbal powder.',
  },
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    offer: '⚡ SPECIAL ONLINE EXCLUSIVE • ISLANDWIDE COD',
    badge: 'HOT OFFER',
    heading: 'Handcrafted Incense & Pure Ceylon Fragrance Packs',
    desc: 'Enrich your sanctuary with 100% natural, herbal, and spiritually uplifting fragrances made with authentic Sri Lankan botanical extracts.',
    icon: 'Sparkles',
    bannerImage: '/banner_slider_1.png',
    whatsappMsg: 'Hi EECO AROMATICS! I want to order the 14-in-1 Incense Sticks Collection.',
    glassCard: {
      badge: 'TOP VALUE DEAL',
      price: 'Rs. 1,350.00',
      sub: '14 Packs included • Long burn time',
      items: ['14 Natural Fragrance Packs', '100% Herbal & Non-toxic', 'Same-Day Dispatch'],
    },
  },
  {
    id: 2,
    offer: '🔥 BUNDLE SAVINGS • SAVE UP TO 30%',
    badge: 'COMBO PACKS',
    heading: 'Complete Spiritual Pooja & Home Wellness Bundles',
    desc: 'Get incense sticks, Sambrani dhoop powders, and luxury diffuser aroma oils together with free delivery across all 25 districts.',
    icon: 'Package',
    bannerImage: '/banner_slider_2.png',
    whatsappMsg: 'Hi EECO AROMATICS! I want to order the Mega Aromatic Combo Bundle.',
    glassCard: {
      badge: 'MEGA COMBO PACK',
      price: 'Rs. 3,850.00',
      sub: 'Save Rs. 950 with free doorstep delivery',
      items: ['14 Stick Packs + 2 Powders', 'Essential Aroma Diffuser 30ml', 'Free Islandwide Delivery'],
    },
  },
  {
    id: 3,
    offer: '🌿 100% NATURAL • TEMPLE GRADE PURITY',
    badge: 'HERBAL COLLECTION',
    heading: 'Traditional Sambrani & Ashtadupa Powders',
    desc: 'Crafted using sacred herbal resins according to age-old Ayurvedic traditions to cleanse indoor energies and bring tranquility.',
    icon: 'Flame',
    bannerImage: '/banner_slider_3.png',
    whatsappMsg: 'Hi EECO AROMATICS! I want to inquire about Sambrani & Ashtadupa herbal powders.',
    glassCard: {
      badge: 'HERBAL PURITY',
      price: 'Rs. 750.00',
      sub: 'Authentic resin smoke & sacred dhoop',
      items: ['Temple Grade Benzoin Resin', 'No Harmful Chemicals', 'Cash on Delivery Available'],
    },
  },
];

export const INITIAL_SECTION_VISIBILITY: SectionVisibility = {
  hero: true,
  benefits: true,
  dailyDiscount: true,
  bestSelling: true,
  categories: true,
  topSelling: true,
  ourProducts: true,
  wholesaleProducts: true,
  promoBanners: true,
  newlyLaunched: true,
  hotDeals: true,
  newsletter: true,
};

export const INITIAL_PAGE_VISIBILITY: PageVisibility = {
  shop: true,
  comboBundle: true,
  about: true,
  contact: true,
  wishlist: true,
  cart: true,
  trackOrder: true,
};

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'EECO AROMATICS',
  storeSlogan: 'Fragrance for Your Soul',
  regNo: 'EECO-LK-2026-REG',
  whatsappNumber: '94762051906',
  whatsappMessage: 'Hi EECO AROMATICS! I would like to place an order.',
  announcementText: '🔥 Islandwide Cash on Delivery (COD) Available! Free Delivery on orders over Rs. 3,500.',
  maintenanceMode: false,
  maintenanceNotice: 'We are updating our fragrance catalog. You can still order directly on WhatsApp.',
  freeDeliveryThreshold: 3500,
  deliveryFee: 350,
  adminPin: 'admin123',
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

function ensureDbFile(): StoreDatabaseData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: StoreDatabaseData = {
      products: INITIAL_PRODUCTS,
      heroSlides: INITIAL_HERO_SLIDES,
      sectionVisibility: INITIAL_SECTION_VISIBILITY,
      pageVisibility: INITIAL_PAGE_VISIBILITY,
      settings: INITIAL_SETTINGS,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(content) as StoreDatabaseData;
    return data;
  } catch (error) {
    console.error('Error reading database file, resetting to defaults:', error);
    const initialData: StoreDatabaseData = {
      products: INITIAL_PRODUCTS,
      heroSlides: INITIAL_HERO_SLIDES,
      sectionVisibility: INITIAL_SECTION_VISIBILITY,
      pageVisibility: INITIAL_PAGE_VISIBILITY,
      settings: INITIAL_SETTINGS,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDbFile(data: StoreDatabaseData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Database API helper functions
export function getStoreData(): StoreDatabaseData {
  return ensureDbFile();
}

export function addProduct(productData: Omit<Product, 'id'>): Product {
  const db = ensureDbFile();
  const newId = Math.max(...db.products.map((p) => p.id), 0) + 1;
  const newProduct: Product = { ...productData, id: newId };
  db.products = [newProduct, ...db.products];
  saveDbFile(db);
  return newProduct;
}

export function updateProduct(id: number, updates: Partial<Product>): Product | null {
  const db = ensureDbFile();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...updates, id };
  saveDbFile(db);
  return db.products[index];
}

export function deleteProduct(id: number): boolean {
  const db = ensureDbFile();
  const initialLen = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length === initialLen) return false;
  saveDbFile(db);
  return true;
}

export function toggleProductHidden(id: number): Product | null {
  const db = ensureDbFile();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.products[index].hidden = !db.products[index].hidden;
  saveDbFile(db);
  return db.products[index];
}

export function addHeroSlide(slideData: Omit<HeroSlide, 'id'>): HeroSlide {
  const db = ensureDbFile();
  const newId = Math.max(...db.heroSlides.map((s) => s.id), 0) + 1;
  const newSlide: HeroSlide = { ...slideData, id: newId };
  db.heroSlides = [...db.heroSlides, newSlide];
  saveDbFile(db);
  return newSlide;
}

export function updateHeroSlide(id: number, updates: Partial<HeroSlide>): HeroSlide | null {
  const db = ensureDbFile();
  const index = db.heroSlides.findIndex((s) => s.id === id);
  if (index === -1) return null;
  db.heroSlides[index] = { ...db.heroSlides[index], ...updates, id };
  saveDbFile(db);
  return db.heroSlides[index];
}

export function deleteHeroSlide(id: number): boolean {
  const db = ensureDbFile();
  if (db.heroSlides.length <= 1) return false;
  db.heroSlides = db.heroSlides.filter((s) => s.id !== id);
  saveDbFile(db);
  return true;
}

export function updateSectionVisibility(updates: Partial<SectionVisibility>): SectionVisibility {
  const db = ensureDbFile();
  db.sectionVisibility = { ...db.sectionVisibility, ...updates };
  saveDbFile(db);
  return db.sectionVisibility;
}

export function updatePageVisibility(updates: Partial<PageVisibility>): PageVisibility {
  const db = ensureDbFile();
  db.pageVisibility = { ...db.pageVisibility, ...updates };
  saveDbFile(db);
  return db.pageVisibility;
}

export function updateSettings(updates: Partial<StoreSettings>): StoreSettings {
  const db = ensureDbFile();
  db.settings = { ...db.settings, ...updates };
  saveDbFile(db);
  return db.settings;
}

export function resetToDefaults(): StoreDatabaseData {
  const initialData: StoreDatabaseData = {
    products: INITIAL_PRODUCTS,
    heroSlides: INITIAL_HERO_SLIDES,
    sectionVisibility: INITIAL_SECTION_VISIBILITY,
    pageVisibility: INITIAL_PAGE_VISIBILITY,
    settings: INITIAL_SETTINGS,
    updatedAt: new Date().toISOString(),
  };
  saveDbFile(initialData);
  return initialData;
}
