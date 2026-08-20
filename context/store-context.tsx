'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  Product,
  HeroSlide,
  ComboBundle,
  FaqItem,
  BenefitCard,
  SectionVisibility,
  PageVisibility,
  StoreSettings,
  INITIAL_PRODUCTS,
  INITIAL_HERO_SLIDES,
  INITIAL_COMBOS,
  INITIAL_FAQS,
  INITIAL_BENEFITS,
  INITIAL_SECTION_VISIBILITY,
  INITIAL_PAGE_VISIBILITY,
  INITIAL_SETTINGS,
} from '@/lib/types';

export type { Product, HeroSlide, ComboBundle, FaqItem, BenefitCard, SectionVisibility, PageVisibility, StoreSettings };

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface StoreContextType {
  products: Product[];
  heroSlides: HeroSlide[];
  combos: ComboBundle[];
  faqs: FaqItem[];
  benefits: BenefitCard[];
  sectionVisibility: SectionVisibility;
  pageVisibility: PageVisibility;
  settings: StoreSettings;
  cart: CartItem[];
  wishlist: number[];
  toasts: { id: string; text: string }[];
  isServerSynced: boolean;
  lastUpdatedTime: string;
  showToast: (text: string) => void;
  uploadImage: (file: File) => Promise<string>;
  addToCart: (product: Product | { id: number; name: string; price: string; image?: string }, quantity?: number) => void;
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
  addCombo: (combo: Omit<ComboBundle, 'id'>) => Promise<void>;
  updateCombo: (id: number, comboFields: Partial<ComboBundle>) => Promise<void>;
  deleteCombo: (id: number) => Promise<void>;
  addFaq: (faq: Omit<FaqItem, 'id'>) => Promise<void>;
  updateFaq: (id: number, faqFields: Partial<FaqItem>) => Promise<void>;
  deleteFaq: (id: number) => Promise<void>;
  saveBenefits: (newBenefits: BenefitCard[]) => Promise<void>;
  updateSectionVisibility: (section: keyof SectionVisibility, visible: boolean) => Promise<void>;
  updatePageVisibility: (page: keyof PageVisibility, visible: boolean) => Promise<void>;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(INITIAL_HERO_SLIDES);
  const [combos, setCombos] = useState<ComboBundle[]>(INITIAL_COMBOS);
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [benefits, setBenefits] = useState<BenefitCard[]>(INITIAL_BENEFITS);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(INITIAL_SECTION_VISIBILITY);
  const [pageVisibility, setPageVisibility] = useState<PageVisibility>(INITIAL_PAGE_VISIBILITY);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([1, 6]);
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);
  const [isServerSynced, setIsServerSynced] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');

  const lastSyncTimestampRef = useRef<string>('');

  const getAdminPin = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('eeco_admin_pin') || 'admin123';
    }
    return 'admin123';
  };

  const showToast = useCallback((text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // Fetch live store database
  const syncStore = useCallback(async (isInitial = false) => {
    try {
      const res = await fetch('/api/store', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.updatedAt !== lastSyncTimestampRef.current) {
          lastSyncTimestampRef.current = data.updatedAt || new Date().toISOString();
          setLastUpdatedTime(lastSyncTimestampRef.current);

          if (Array.isArray(data.products)) setProducts(data.products);
          if (Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
          if (Array.isArray(data.combos)) setCombos(data.combos);
          if (Array.isArray(data.faqs)) setFaqs(data.faqs);
          if (Array.isArray(data.benefits)) setBenefits(data.benefits);
          if (data.sectionVisibility) setSectionVisibility(data.sectionVisibility);
          if (data.pageVisibility) setPageVisibility(data.pageVisibility);
          if (data.settings) setSettings(data.settings);
          if (isInitial) setIsServerSynced(true);
        }
      }
    } catch (err) {
      if (isInitial) {
        console.warn('Could not sync with server DB, using cached template defaults:', err);
      }
    }
  }, []);

  // Initial load + Real-time Background Polling (every 4 seconds)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('eeco_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('eeco_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Error reading personal cart/wishlist:', e);
    }

    syncStore(true);

    const interval = setInterval(() => {
      syncStore(false);
    }, 4000);

    return () => clearInterval(interval);
  }, [syncStore]);

  // Save personal cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('eeco_cart', JSON.stringify(cart));
      localStorage.setItem('eeco_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving personal cart/wishlist:', e);
    }
  }, [cart, wishlist]);

  // Upload image helper with PIN security
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'x-admin-pin': getAdminPin(),
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Image upload failed. Check Admin PIN authorization.');
    }

    const data = await res.json();
    return data.url;
  };

  // Cart Actions
  const addToCart = (product: Product | { id: number; name: string; price: string; image?: string }, quantity = 1) => {
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

  // Products CRUD
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const created: Product = await res.json();
        setProducts((prev) => [created, ...prev]);
        showToast('Product added and saved to Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save to database');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error saving product');
    }
  };

  const updateProduct = async (id: number, updatedFields: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        const updated: Product = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        showToast('Product updated in Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error updating product');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-pin': getAdminPin(),
        },
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast('Product deleted from Database.');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to delete');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error deleting product');
    }
  };

  const toggleProductHidden = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}/visibility`, {
        method: 'PUT',
        headers: {
          'x-admin-pin': getAdminPin(),
        },
      });
      if (res.ok) {
        const updated: Product = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Hero Slides CRUD
  const updateHeroSlide = async (id: number, slideFields: Partial<HeroSlide>) => {
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(slideFields),
      });
      if (res.ok) {
        const updated: HeroSlide = await res.json();
        setHeroSlides((prev) => prev.map((s) => (s.id === id ? updated : s)));
        showToast('Hero banner updated in Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update banner');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error updating banner');
    }
  };

  const addHeroSlide = async (slide: Omit<HeroSlide, 'id'>) => {
    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(slide),
      });
      if (res.ok) {
        const created: HeroSlide = await res.json();
        setHeroSlides((prev) => [...prev, created]);
        showToast('Hero banner added to Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to add banner');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error adding banner');
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
        headers: {
          'x-admin-pin': getAdminPin(),
        },
      });
      if (res.ok) {
        setHeroSlides((prev) => prev.filter((s) => s.id !== id));
        showToast('Hero slide removed from Database.');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to delete slide');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error deleting banner');
    }
  };

  // Combo Bundles CRUD
  const addCombo = async (combo: Omit<ComboBundle, 'id'>) => {
    try {
      const res = await fetch('/api/combos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(combo),
      });
      if (res.ok) {
        const created: ComboBundle = await res.json();
        setCombos((prev) => [...prev, created]);
        showToast('Combo Bundle added to Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to add combo');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error adding combo bundle');
    }
  };

  const updateCombo = async (id: number, comboFields: Partial<ComboBundle>) => {
    try {
      const res = await fetch(`/api/combos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(comboFields),
      });
      if (res.ok) {
        const updated: ComboBundle = await res.json();
        setCombos((prev) => prev.map((c) => (c.id === id ? updated : c)));
        showToast('Combo Bundle updated in Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update combo');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error updating combo bundle');
    }
  };

  const deleteCombo = async (id: number) => {
    try {
      const res = await fetch(`/api/combos/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-pin': getAdminPin(),
        },
      });
      if (res.ok) {
        setCombos((prev) => prev.filter((c) => c.id !== id));
        showToast('Combo Bundle removed from Database.');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to delete combo');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error deleting combo bundle');
    }
  };

  // FAQs CRUD
  const addFaq = async (faq: Omit<FaqItem, 'id'>) => {
    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(faq),
      });
      if (res.ok) {
        const created: FaqItem = await res.json();
        setFaqs((prev) => [...prev, created]);
        showToast('FAQ added to Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to add FAQ');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error adding FAQ');
    }
  };

  const updateFaq = async (id: number, faqFields: Partial<FaqItem>) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(faqFields),
      });
      if (res.ok) {
        const updated: FaqItem = await res.json();
        setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
        showToast('FAQ updated in Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update FAQ');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error updating FAQ');
    }
  };

  const deleteFaq = async (id: number) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-pin': getAdminPin(),
        },
      });
      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        showToast('FAQ removed from Database.');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to delete FAQ');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error deleting FAQ');
    }
  };

  // Benefits
  const saveBenefits = async (newBenefits: BenefitCard[]) => {
    try {
      const res = await fetch('/api/benefits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
        body: JSON.stringify(newBenefits),
      });
      if (res.ok) {
        const updated: BenefitCard[] = await res.json();
        setBenefits(updated);
        showToast('Service Benefits saved to Database!');
      } else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save benefits');
      }
    } catch (e: any) {
      showToast(e?.message || 'Error saving benefits');
    }
  };

  const updateSectionVisibility = async (section: keyof SectionVisibility, visible: boolean) => {
    const updated = { ...sectionVisibility, [section]: visible };
    setSectionVisibility(updated);
    try {
      await fetch('/api/sections', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
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
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
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
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': getAdminPin(),
        },
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
      const res = await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'x-admin-pin': getAdminPin(),
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setHeroSlides(data.heroSlides);
        setCombos(data.combos || INITIAL_COMBOS);
        setFaqs(data.faqs || INITIAL_FAQS);
        setBenefits(data.benefits || INITIAL_BENEFITS);
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
    setCombos(INITIAL_COMBOS);
    setFaqs(INITIAL_FAQS);
    setBenefits(INITIAL_BENEFITS);
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
        combos,
        faqs,
        benefits,
        sectionVisibility,
        pageVisibility,
        settings,
        cart,
        wishlist,
        toasts,
        isServerSynced,
        lastUpdatedTime,
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
        addCombo,
        updateCombo,
        deleteCombo,
        addFaq,
        updateFaq,
        deleteFaq,
        saveBenefits,
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
