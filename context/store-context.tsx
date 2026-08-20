'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
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

interface StoreContextType {
  products: Product[];
  heroSlides: HeroSlide[];
  sectionVisibility: SectionVisibility;
  pageVisibility: PageVisibility;
  settings: StoreSettings;
  cart: CartItem[];
  wishlist: number[];
  toasts: { id: string; text: string }[];
  isServerSynced: boolean;
  showToast: (text: string) => void;
  uploadImage: (file: File) => Promise<string>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  toggleProductHidden: (id: number) => Promise<void>;
  updateHeroSlide: (id: number, slideFields: Partial<HeroSlide>) => Promise<void>;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => Promise<void>;
  deleteHeroSlide: (id: number) => Promise<void>;
  updateSectionVisibility: (section: keyof SectionVisibility, visible: boolean) => Promise<void>;
  updatePageVisibility: (page: keyof PageVisibility, visible: boolean) => Promise<void>;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(INITIAL_HERO_SLIDES);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(INITIAL_SECTION_VISIBILITY);
  const [pageVisibility, setPageVisibility] = useState<PageVisibility>(INITIAL_PAGE_VISIBILITY);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([1, 6]);
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);
  const [isServerSynced, setIsServerSynced] = useState(false);

  // Fetch live state from Server Database on mount
  useEffect(() => {
    let isMounted = true;

    async function loadStoreFromDatabase() {
      try {
        const res = await fetch('/api/store', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            if (Array.isArray(data.products)) setProducts(data.products);
            if (Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
            if (data.sectionVisibility) setSectionVisibility(data.sectionVisibility);
            if (data.pageVisibility) setPageVisibility(data.pageVisibility);
            if (data.settings) setSettings(data.settings);
            setIsServerSynced(true);
          }
        }
      } catch (err) {
        console.warn('Could not sync with server DB, using fallback defaults:', err);
      }
    }

    // Load customer personal cart & wishlist from localStorage
    try {
      const savedCart = localStorage.getItem('eeco_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('eeco_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Error loading local cart/wishlist:', e);
    }

    loadStoreFromDatabase();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save personal cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eeco_cart', JSON.stringify(cart));
      localStorage.setItem('eeco_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving local cart/wishlist:', e);
    }
  }, [cart, wishlist]);

  const showToast = useCallback((text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // Direct image upload helper
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Image upload failed');
    }

    const data = await res.json();
    return data.url;
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    const rawPrice = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 0;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: rawPrice,
          quantity,
          image: product.image,
        },
      ];
    });
    showToast(`Added ${quantity}x "${product.name.slice(0, 24)}..." to cart!`);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from cart');
  };

  const updateCartQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const q = item.quantity + delta;
            return q > 0 ? { ...item, quantity: q } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((x) => x !== id);
      } else {
        showToast('Added to Wishlist!');
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  // Admin Database Actions
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const created: Product = await res.json();
        setProducts((prev) => [created, ...prev]);
        showToast('Product added and saved to Database!');
      } else {
        throw new Error('Failed to save to database');
      }
    } catch (e) {
      console.error(e);
      // Optimistic fallback
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      setProducts((prev) => [{ ...newProduct, id: newId }, ...prev]);
      showToast('Product added (Offline mode).');
    }
  };

  const updateProduct = async (id: number, updatedFields: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const updated: Product = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        showToast('Product updated in Database!');
      } else {
        throw new Error('Failed to update in database');
      }
    } catch (e) {
      console.error(e);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
      );
      showToast('Product updated.');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast('Product deleted from Database.');
      } else {
        throw new Error('Failed to delete from database');
      }
    } catch (e) {
      console.error(e);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('Product deleted.');
    }
  };

  const toggleProductHidden = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}/visibility`, {
        method: 'PUT',
      });
      if (res.ok) {
        const updated: Product = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      }
    } catch (e) {
      console.error(e);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p))
      );
    }
  };

  const updateHeroSlide = async (id: number, slideFields: Partial<HeroSlide>) => {
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideFields),
      });
      if (res.ok) {
        const updated: HeroSlide = await res.json();
        setHeroSlides((prev) => prev.map((s) => (s.id === id ? updated : s)));
        showToast('Hero banner updated in Database!');
      } else {
        throw new Error('Failed to update banner');
      }
    } catch (e) {
      console.error(e);
      setHeroSlides((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...slideFields } : s))
      );
      showToast('Hero banner updated.');
    }
  };

  const addHeroSlide = async (slide: Omit<HeroSlide, 'id'>) => {
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slide),
      });
      if (res.ok) {
        const created: HeroSlide = await res.json();
        setHeroSlides((prev) => [...prev, created]);
        showToast('Hero banner added to Database!');
      } else {
        throw new Error('Failed to add banner');
      }
    } catch (e) {
      console.error(e);
      const newId = Math.max(...heroSlides.map((s) => s.id), 0) + 1;
      setHeroSlides((prev) => [...prev, { ...slide, id: newId }]);
      showToast('Hero banner added.');
    }
  };

  const deleteHeroSlide = async (id: number) => {
    if (heroSlides.length <= 1) {
      showToast('Cannot delete the last hero slide.');
      return;
    }
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setHeroSlides((prev) => prev.filter((s) => s.id !== id));
        showToast('Hero slide removed from Database.');
      } else {
        throw new Error('Failed to delete slide');
      }
    } catch (e) {
      console.error(e);
      setHeroSlides((prev) => prev.filter((s) => s.id !== id));
      showToast('Hero slide removed.');
    }
  };

  const updateSectionVisibility = async (section: keyof SectionVisibility, visible: boolean) => {
    const updated = { ...sectionVisibility, [section]: visible };
    setSectionVisibility(updated);
    try {
      await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [section]: visible }),
      });
      showToast(`Section "${String(section)}" visibility saved to Database.`);
    } catch (e) {
      console.error(e);
    }
  };

  const updatePageVisibility = async (page: keyof PageVisibility, visible: boolean) => {
    const updated = { ...pageVisibility, [page]: visible };
    setPageVisibility(updated);
    try {
      await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [page]: visible }),
      });
      showToast(`Page "${String(page)}" visibility saved to Database.`);
    } catch (e) {
      console.error(e);
    }
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        showToast('Store settings saved to Database!');
      }
    } catch (e) {
      console.error(e);
      showToast('Store settings saved.');
    }
  };

  const resetToDefaults = async () => {
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setHeroSlides(data.heroSlides);
        setSectionVisibility(data.sectionVisibility);
        setPageVisibility(data.pageVisibility);
        setSettings(data.settings);
        showToast('Database reset to defaults.');
        return;
      }
    } catch (e) {
      console.error(e);
    }
    setProducts(INITIAL_PRODUCTS);
    setHeroSlides(INITIAL_HERO_SLIDES);
    setSectionVisibility(INITIAL_SECTION_VISIBILITY);
    setPageVisibility(INITIAL_PAGE_VISIBILITY);
    setSettings(INITIAL_SETTINGS);
    showToast('Reset all data to default template.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        heroSlides,
        sectionVisibility,
        pageVisibility,
        settings,
        cart,
        wishlist,
        toasts,
        isServerSynced,
        showToast,
        uploadImage,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductHidden,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updateSectionVisibility,
        updatePageVisibility,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
