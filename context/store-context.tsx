'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

const INITIAL_PRODUCTS: Product[] = [
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
    badge: 'SPECIAL',
    category: 'Incense Powder Packs',
    iconType: 'sparkles',
    image: '/product_ashtadupa_powder.jpg',
    name: 'EECO Special Ashtadupa Herbal Incense Powder (100g)',
    price: 'Rs. 400.00',
    originalPrice: 'Rs. 500.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 310,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Powder',
    stockState: 'in_stock',
    burnTime: 'Continuous Fragrant Smoke',
    scentNotes: ['8 Traditional Sacred Herbs', 'Natural Guggul', 'Pure Benzoin Sambrani'],
    description: 'Ancient Ashtadupa 8-herb sacred smoke powder for purification of homes, temples, and removing negative energy.',
  },
  {
    id: 5,
    badge: 'MEGA BUNDLE',
    category: 'Incense Powder Packs',
    iconType: 'sparkles',
    image: '/product_jasmine_powder_bundle.jpg',
    name: 'EECO Special Jasmine Incense Powder Pack (12x100g Bundle)',
    price: 'Rs. 2,000.00',
    originalPrice: 'Rs. 2,400.00',
    discountText: 'Rs. 400 OFF',
    rating: 5,
    reviewCount: 275,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Powder',
    stockState: 'in_stock',
    burnTime: 'High-Yield Economy Pack',
    scentNotes: ['Jasmine Sambrani', 'White Floral Dhoop', 'Natural Herbal Resins'],
    description: 'Super value bundle of 12 jasmine dhoop powder packets for daily spiritual pooja and home air freshening.',
  },
  {
    id: 6,
    badge: 'SUPER OFFER',
    category: 'Incense Sticks Packs',
    iconType: 'flame',
    image: '/banner_incense_packs.jpg',
    name: 'EECO 14-in-1 Fragrance Incense Sticks Super Value Box',
    price: 'Rs. 1,300.00',
    originalPrice: 'Rs. 1,680.00',
    discountText: '22% OFF',
    rating: 5,
    reviewCount: 320,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Sticks',
    stockState: 'in_stock',
    burnTime: '14 Varied Scents',
    scentNotes: ['Lavender', 'Rose', 'Sandal', 'Jasmine', 'Cinnamon', 'Sambrani'],
    description: 'All 14 top fragrances bundled into a single grand master box. Ideal for fragrance lovers seeking variety.',
  },
  {
    id: 7,
    badge: 'POPULAR',
    category: 'Diffuser',
    iconType: 'droplets',
    image: '/banner_room_diffuser.jpg',
    name: 'EECO Extrime Luxury Room Diffuser (12 Natural Scents)',
    price: 'Rs. 1,500.00',
    originalPrice: 'Rs. 1,800.00',
    discountText: '16% OFF',
    rating: 5,
    reviewCount: 189,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Room Diffusers',
    stockState: 'in_stock',
    burnTime: 'Lasts up to 60 Days',
    scentNotes: ['Aromatics Essential Oils', 'Natural Reed Sticks', 'Pure Essence'],
    description: 'Continuous flameless fragrance diffusion with natural rattan reed sticks and pure fragrance oils.',
  },
  {
    id: 8,
    badge: 'ORGANIC',
    category: 'Incense Powder Packs',
    iconType: 'sparkles',
    image: '/banner_cinnamon_dhoop.jpg',
    name: 'EECO Organic Cinnamon Dhoop Incense Powder (100g)',
    price: 'Rs. 400.00',
    originalPrice: 'Rs. 500.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 190,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Powder',
    stockState: 'in_stock',
    burnTime: 'Natural Cinnamon Smoke',
    scentNotes: ['Ceylon Cinnamon Bark', 'Spiced Resins', 'Warm Wood'],
    description: 'Made from authentic pure Ceylon Cinnamon bark. Produces a warm, comforting spicy smoke that purifies room atmosphere.',
  },
  {
    id: 9,
    badge: 'MASTER BUNDLE',
    category: 'Combo Bundle',
    iconType: 'sparkles',
    image: '/xtrime_aroma_banner.jpg',
    name: 'EECO XTRIME AROMA Special Offer Bundle (14 Sticks + 4 Dupa)',
    price: 'Rs. 2,100.00',
    originalPrice: 'Rs. 2,600.00',
    discountText: 'SPECIAL OFFER',
    rating: 5,
    reviewCount: 450,
    shipping: 'FREE Delivery Included',
    storeCategory: 'Combo Bundles',
    stockState: 'in_stock',
    burnTime: 'Complete Fragrance Kit',
    scentNotes: ['14 Sticks Pack', '4 Suwada Dupa', 'FREE 50g Ashtadupa'],
    description: 'The ultimate household fragrance collection: 14-in-1 Incense Pack + 4 Dupa Packs + FREE Ashtadupa 50g with Free Islandwide Delivery!',
  },
  {
    id: 10,
    badge: '15% OFF',
    category: 'Incense Sticks Packs',
    iconType: 'flame',
    image: '/product_pink_rose_sticks.jpg',
    name: 'EECO Natural Lavender Serenity Incense Sticks Pack',
    price: 'Rs. 1,250.00',
    originalPrice: 'Rs. 1,500.00',
    discountText: '15% OFF',
    rating: 5,
    reviewCount: 189,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Sticks',
    stockState: 'in_stock',
    burnTime: '45 mins per stick',
    scentNotes: ['French Lavender', 'Calming Herbal', 'Vanilla undertone'],
    description: 'Deeply relaxing French lavender herbal incense sticks crafted for restful sleep, stress relief, and evening peace.',
  },
  {
    id: 11,
    badge: '15% OFF',
    category: 'Incense Powder Packs',
    iconType: 'sparkles',
    image: '/product_ashtadupa_powder.jpg',
    name: 'EECO Traditional Sambrani Dhoop Herbal Incense Powder 250g',
    price: 'Rs. 1,450.00',
    originalPrice: 'Rs. 1,750.00',
    discountText: '15% OFF',
    rating: 5,
    reviewCount: 210,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Incense Powder',
    stockState: 'in_stock',
    burnTime: 'Traditional Sambrani Smoke',
    scentNotes: ['Pure Benzoin Resin', 'Sandalwood Dust', 'Temple Herbs'],
    description: 'Authentic Sambrani dhoop powder for home purification, prayer rituals, and infant hair drying rituals.',
  },
  {
    id: 12,
    badge: '15% OFF',
    category: 'Diffuser',
    iconType: 'droplets',
    image: '/banner_room_diffuser.jpg',
    name: 'EECO Ceramic Aromatics Oil Burner & Reed Diffuser Set',
    price: 'Rs. 2,490.00',
    originalPrice: 'Rs. 2,990.00',
    discountText: '15% OFF',
    rating: 5,
    reviewCount: 189,
    shipping: 'Courier 1-3 Days',
    storeCategory: 'Room Diffusers',
    stockState: 'in_stock',
    burnTime: 'Includes Burner + Oil',
    scentNotes: ['Ceramic Craft', 'Pure Essential Oil', 'Tea-light Powered'],
    description: 'Elegant handcrafted ceramic burner with essential oils for warm therapeutic aroma diffusion.',
  },
  {
    id: 13,
    badge: 'WHOLESALE 25%',
    category: 'Wholesale Products',
    iconType: 'flame',
    image: '/banner_incense_packs.jpg',
    name: 'EECO Wholesale 14-in-1 Fragrance Incense Sticks (Master Box 100 Packs)',
    price: 'Rs. 7,900.00',
    originalPrice: 'Rs. 10,500.00',
    discountText: '25% OFF',
    rating: 5,
    reviewCount: 380,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: 'Master Carton (100 Units)',
    scentNotes: ['14 Fragrance Varieties', 'Retail Ready Packaging', 'High Profit Margin'],
    description: 'Bulk merchant master carton containing 100 assorted packs of 14-in-1 fragrance incense sticks. Perfect for retail resale and supermarkets.',
  },
  {
    id: 14,
    badge: 'WHOLESALE 22%',
    category: 'Wholesale Products',
    iconType: 'sparkles',
    image: '/product_ashtadupa_powder.jpg',
    name: 'EECO Wholesale Ashtadupa Herbal Powder Bulk Sack (5kg Commercial Pack)',
    price: 'Rs. 3,800.00',
    originalPrice: 'Rs. 4,900.00',
    discountText: '22% OFF',
    rating: 5,
    reviewCount: 310,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '5kg Heavy-Duty Bulk Sack',
    scentNotes: ['8 Sacred Resins', 'Aroma Guggul', 'Benzoin Sambrani'],
    description: 'High-yield 5kg bulk commercial pack of sacred Ashtadupa herbal dhoop powder for temple ceremonies, Ayurvedic spas, and retail distribution.',
  },
  {
    id: 15,
    badge: 'WHOLESALE 22%',
    category: 'Wholesale Products',
    iconType: 'sparkles',
    image: '/product_jasmine_powder_bundle.jpg',
    name: 'EECO Wholesale Jasmine Dhoop Powder Commercial Bundle (50 Packets)',
    price: 'Rs. 6,900.00',
    originalPrice: 'Rs. 8,900.00',
    discountText: '22% OFF',
    rating: 5,
    reviewCount: 290,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '50 Individually Sealed Units',
    scentNotes: ['Pure Jasmine Extracts', 'White Floral Dhoop', 'Natural Resins'],
    description: 'Commercial wholesale lot of 50 packs (100g each) of premium Jasmine herbal dhoop powder with high retail profit margins.',
  },
  {
    id: 16,
    badge: 'WHOLESALE 22%',
    category: 'Wholesale Products',
    iconType: 'wind',
    image: '/product_jasmine_air_freshener.jpg',
    name: 'EECO Wholesale Luxury Air Freshener Carton (24x 100ml Sprays)',
    price: 'Rs. 11,800.00',
    originalPrice: 'Rs. 15,200.00',
    discountText: '22% OFF',
    rating: 5,
    reviewCount: 240,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '24 Display Cans (100ml)',
    scentNotes: ['Jasmine Mist', 'Lavender Burst', 'Rose Petal'],
    description: 'Full retail countertop display carton containing 24 luxury fragrance room spray bottles for salons, hotels, and gift boutiques.',
  },
  {
    id: 17,
    badge: 'WHOLESALE 20%',
    category: 'Wholesale Products',
    iconType: 'sparkles',
    image: '/banner_cinnamon_dhoop.jpg',
    name: 'EECO Wholesale Organic Ceylon Cinnamon Dhoop (20x 100g Packs)',
    price: 'Rs. 6,400.00',
    originalPrice: 'Rs. 8,000.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 215,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '20 Sealed Packs',
    scentNotes: ['Ceylon Cinnamon Bark', 'Spiced Resins', 'Natural Wood'],
    description: 'Pure Organic Ceylon Cinnamon incense powder packs in bulk merchant packs. Highly sought-after export-grade herbal quality.',
  },
  {
    id: 18,
    badge: 'WHOLESALE 20%',
    category: 'Wholesale Products',
    iconType: 'droplets',
    image: '/banner_room_diffuser.jpg',
    name: 'EECO Wholesale Extrime Luxury Room Diffusers Box (12 Assorted Units)',
    price: 'Rs. 13,500.00',
    originalPrice: 'Rs. 16,800.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 230,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '12 Luxury Reed Glass Bottles',
    scentNotes: ['12 Natural Scent Varieties', 'Rattan Reed Sticks Included', 'Gift Boxed'],
    description: 'Wholesale retail case of 12 complete room diffuser sets with natural rattan sticks in premium individual packaging.',
  },
  {
    id: 19,
    badge: 'WHOLESALE 25%',
    category: 'Wholesale Products',
    iconType: 'flame',
    image: '/product_thulasi_sticks.jpg',
    name: 'EECO Wholesale Thulasi Herbal Incense Sticks Master Carton (100 Packs)',
    price: 'Rs. 7,900.00',
    originalPrice: 'Rs. 10,500.00',
    discountText: '25% OFF',
    rating: 5,
    reviewCount: 340,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '100 Pack Master Case',
    scentNotes: ['Holy Basil Extract', 'Ayurvedic Herb Blend', 'Temple Resins'],
    description: 'Bulk carton of 100 packets of genuine Thulasi herbal incense sticks. High turnover retail inventory for Ayurvedic stores.',
  },
  {
    id: 20,
    badge: 'WHOLESALE 25%',
    category: 'Wholesale Products',
    iconType: 'flame',
    image: '/product_pink_rose_sticks.jpg',
    name: 'EECO Wholesale Pink Rose Fragrance Sticks Master Carton (100 Packs)',
    price: 'Rs. 7,900.00',
    originalPrice: 'Rs. 10,500.00',
    discountText: '25% OFF',
    rating: 5,
    reviewCount: 290,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '100 Pack Master Case',
    scentNotes: ['Damask Rose Oil', 'Sweet Floral', 'Aromatic Wood'],
    description: 'Bulk master carton containing 100 packets of fragrant Pink Rose incense sticks for commercial distribution and florist resale.',
  },
  {
    id: 21,
    badge: 'WHOLESALE 20%',
    category: 'Wholesale Products',
    iconType: 'sparkles',
    image: '/product_ashtadupa_powder.jpg',
    name: 'EECO Wholesale Traditional Sambrani Dhoop Powder (10kg Master Sack)',
    price: 'Rs. 7,200.00',
    originalPrice: 'Rs. 9,000.00',
    discountText: '20% OFF',
    rating: 5,
    reviewCount: 360,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '10kg Commercial Sack',
    scentNotes: ['Benzoin Resins', 'Sandalwood Flour', 'Temple Herbs'],
    description: 'Heavy 10kg bulk sack of traditional Sambrani incense powder for religious shrines, meditation centers, and bulk packaging.',
  },
  {
    id: 22,
    badge: 'WHOLESALE 25%',
    category: 'Wholesale Products',
    iconType: 'flame',
    image: '/banner_incense_packs.jpg',
    name: 'EECO Wholesale French Lavender Serenity Sticks Master Carton (100 Packs)',
    price: 'Rs. 7,900.00',
    originalPrice: 'Rs. 10,500.00',
    discountText: '25% OFF',
    rating: 5,
    reviewCount: 280,
    shipping: 'FREE Bulk Shipping',
    storeCategory: 'Wholesale Products',
    stockState: 'in_stock',
    burnTime: '100 Pack Master Case',
    scentNotes: ['French Lavender', 'Soothing Flora', 'Pure Resins'],
    description: 'Master lot of 100 packs of Lavender herbal sticks for wellness spas, meditation retreats, and retail shops.',
  },
];

const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    offer: 'XTRIME AROMA • EECO GROUP',
    badge: 'Rs. 2,100/- SPECIAL OFFER',
    heading: '14-in-1 Incense Sticks &\n4 Suwada Dupa Packs!',
    desc: 'Includes 14-in-1 Incense Sticks Pack (Rs. 1300) + 4 Suwada Dupa Packs (Rs. 800) + FREE 50g Ashtadupa Dupa Pack + FREE Islandwide Delivery!',
    icon: 'flame',
    bannerImage: '/xtrime_aroma_banner.jpg',
    whatsappMsg: 'Hi EECO AROMATICS, I want to order the Rs.2100 XTRIME AROMA Special Offer Bundle!',
    glassCard: {
      badge: 'SPECIAL OFFER BUNDLE',
      price: 'Rs. 2,100/-',
      sub: 'Rs. 2,100/- පමණයි',
      items: [
        '✔ 14 in 1 Hadhankuru Pack (Rs. 1300)',
        '✔ 100g Suwada Dupa 4 Packs (Rs. 800)',
        '🎁 FREE 50g Ashtadupa Dupa Pack',
        '🚚 FREE Islandwide Delivery',
      ],
    },
  },
  {
    id: 1,
    offer: 'XTRIME AROMA • INCENSE PACKS',
    badge: 'Rs. 1,300/- ONLY (WAS Rs. 1,680)',
    heading: '14-in-1 Fragrance Incense\nSticks Super Value Pack',
    desc: '14 Fragrance varieties in 1 single pack! Pack 1 with delivery: Rs. 1,350/-. Pack 2: Rs. 2,650/- with FREE Card Air Freshener & FREE Delivery!',
    icon: 'flame',
    bannerImage: '/banner_incense_packs.jpg',
    whatsappMsg: 'Hi EECO AROMATICS, I want to order the 14-in-1 Incense Sticks Super Value Pack!',
    glassCard: {
      badge: 'INCENSE STICKS OFFER',
      price: 'Rs. 1,300/-',
      sub: 'Rs. 1,680 වෙනුවට තනි පෙට්ටියක',
      items: [
        '✔ 14 Fragrance Varieties Pack',
        '✔ Pack 1 With Delivery: Rs. 1,350/-',
        '✔ Pack 2: Rs. 2,650/- + FREE Air Freshener',
        '🚚 Cash On Delivery Available',
      ],
    },
  },
  {
    id: 2,
    offer: 'XTRIME AROMA • ROOM DIFFUSER',
    badge: 'Rs. 1,500/- SPECIAL PRICE',
    heading: 'Luxury Room Diffuser &\n12 Natural Fragrances',
    desc: 'Turn your home into a relaxing escape with premium room diffusers. Available in Lavender, Rose, Jasmine, Sandalwood, Citronella, Lemon & more!',
    icon: 'droplets',
    bannerImage: '/banner_room_diffuser.jpg',
    whatsappMsg: 'Hi EECO AROMATICS, I want to order the Extrime Aroma Room Diffuser (Rs. 1500/-)!',
    glassCard: {
      badge: 'ROOM DIFFUSER',
      price: 'Rs. 1,500/-',
      sub: 'Turn your space into a relaxing escape',
      items: [
        '✔ 12 Fragrance Choices Available',
        '✔ Long Lasting Aromatics Oil',
        '✔ Sleek Glass Bottle & Reed Sticks',
        '🚚 Cash On Delivery Available',
      ],
    },
  },
  {
    id: 3,
    offer: 'EECO AROMATICS • CINNAMON DHOOP',
    badge: 'STARTING FROM Rs. 400/=',
    heading: 'Pure Organic Cinnamon\nIncense Powder Packs',
    desc: 'Authentic Cinnamon Dhoop Powder for sacred home air purification. Available in 100g (Rs. 400), 250g, 500g & 1kg packs with Rs. 300 islandwide delivery!',
    icon: 'sparkles',
    bannerImage: '/banner_cinnamon_dhoop.jpg',
    whatsappMsg: 'Hi EECO AROMATICS, I want to order the Organic Cinnamon Incense Powder Pack!',
    glassCard: {
      badge: 'CINNAMON DHOOP POWDER',
      price: 'Rs. 400/=',
      sub: 'සදහම් සුවඳ පැතිරෙන සුවඳ දුම් පූජාව',
      items: [
        '✔ 100g Pack: Rs. 400/=',
        '✔ Available in 250g, 500g & 1kg',
        '✔ Pure Natural Cinnamon Blend',
        '🚚 Islandwide Delivery Rs. 300',
      ],
    },
  },
];

const INITIAL_SECTION_VISIBILITY: SectionVisibility = {
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

const INITIAL_PAGE_VISIBILITY: PageVisibility = {
  shop: true,
  comboBundle: true,
  about: true,
  contact: true,
  wishlist: true,
  cart: true,
  trackOrder: true,
};

const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'EECO AROMATICS',
  storeSlogan: 'We Care About You',
  regNo: '',
  whatsappNumber: '940762051906',
  whatsappMessage: 'Hi EECO AROMATICS, I would like to make an inquiry.',
  announcementText: 'EECO AROMATICS • WE CARE ABOUT YOU • Cash on Delivery Available',
  maintenanceMode: false,
  maintenanceNotice: 'We are currently performing scheduled maintenance to enhance your fragrance shopping experience. Our WhatsApp hotline is active 24/7 for instant orders.',
  freeDeliveryThreshold: 2000,
  deliveryFee: 300,
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
  showToast: (text: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  // Admin Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleProductHidden: (id: number) => void;
  updateHeroSlide: (id: number, slide: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (id: number) => void;
  updateSectionVisibility: (section: keyof SectionVisibility, visible: boolean) => void;
  updatePageVisibility: (page: keyof PageVisibility, visible: boolean) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted state from localStorage on mount and merge new defaults
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('eeco_products');
      if (savedProducts) {
        const parsed: Product[] = JSON.parse(savedProducts);
        const existingIds = new Set(parsed.map((p) => p.id));
        const newInitial = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        setProducts([...parsed, ...newInitial]);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }

      const savedSlides = localStorage.getItem('eeco_hero_slides');
      if (savedSlides) {
        const parsedSlides: HeroSlide[] = JSON.parse(savedSlides);
        const existingSlideIds = new Set(parsedSlides.map((s) => s.id));
        const newSlides = INITIAL_HERO_SLIDES.filter((s) => !existingSlideIds.has(s.id));
        setHeroSlides([...parsedSlides, ...newSlides]);
      }

      const savedSections = localStorage.getItem('eeco_section_visibility');
      if (savedSections) {
        setSectionVisibility({
          ...INITIAL_SECTION_VISIBILITY,
          ...JSON.parse(savedSections),
          wholesaleProducts: true, // Ensure wholesaleProducts is always true by default
        });
      }

      const savedPages = localStorage.getItem('eeco_page_visibility');
      if (savedPages) {
        setPageVisibility({
          ...INITIAL_PAGE_VISIBILITY,
          ...JSON.parse(savedPages),
        });
      }

      const savedSettings = localStorage.getItem('eeco_settings');
      if (savedSettings) {
        setSettings({
          ...INITIAL_SETTINGS,
          ...JSON.parse(savedSettings),
        });
      }

      const savedCart = localStorage.getItem('eeco_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('eeco_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Failed to load storage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('eeco_products', JSON.stringify(products));
      localStorage.setItem('eeco_hero_slides', JSON.stringify(heroSlides));
      localStorage.setItem('eeco_section_visibility', JSON.stringify(sectionVisibility));
      localStorage.setItem('eeco_page_visibility', JSON.stringify(pageVisibility));
      localStorage.setItem('eeco_settings', JSON.stringify(settings));
      localStorage.setItem('eeco_cart', JSON.stringify(cart));
      localStorage.setItem('eeco_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save storage:', e);
    }
  }, [products, heroSlides, sectionVisibility, pageVisibility, settings, cart, wishlist, isLoaded]);

  const showToast = (text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  const parsePrice = (priceStr: string) => {
    const cleaned = priceStr.replace('Rs.', '').replace(',', '').trim();
    return parseFloat(cleaned) || 0;
  };

  const addToCart = (product: Product, quantity = 1) => {
    const numericPrice = parsePrice(product.price);
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
          price: numericPrice,
          quantity,
          image: product.image,
        },
      ];
    });
    showToast(`"${product.name.substring(0, 24)}..." added to cart!`);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
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

  // Admin Actions
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts((prev) => [{ ...newProduct, id: newId }, ...prev]);
    showToast('Product added successfully!');
  };

  const updateProduct = (id: number, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated!');
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted.');
  };

  const toggleProductHidden = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p))
    );
  };

  const updateHeroSlide = (id: number, slideFields: Partial<HeroSlide>) => {
    setHeroSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...slideFields } : s))
    );
    showToast('Hero slide updated!');
  };

  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const newId = Math.max(...heroSlides.map((s) => s.id), 0) + 1;
    setHeroSlides((prev) => [...prev, { ...slide, id: newId }]);
    showToast('Hero slide added!');
  };

  const deleteHeroSlide = (id: number) => {
    if (heroSlides.length <= 1) {
      showToast('Cannot delete the last hero slide.');
      return;
    }
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
    showToast('Hero slide removed.');
  };

  const updateSectionVisibility = (section: keyof SectionVisibility, visible: boolean) => {
    setSectionVisibility((prev) => ({ ...prev, [section]: visible }));
    showToast(`Section "${String(section)}" visibility updated.`);
  };

  const updatePageVisibility = (page: keyof PageVisibility, visible: boolean) => {
    setPageVisibility((prev) => ({ ...prev, [page]: visible }));
    showToast(`Page "${String(page)}" visibility updated.`);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings saved!');
  };

  const resetToDefaults = () => {
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
        showToast,
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
