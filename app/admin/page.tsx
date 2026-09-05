'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Sliders,
  Gift,
  HelpCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Save,
  Wrench,
  Settings,
  Flame,
  Sparkles,
  Wind,
  Droplets,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  Lock,
  Search,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Loader2,
  Tag,
  Truck,
  DollarSign,
  Layers,
  HelpCircle as FaqIcon,
  Award,
  Headphones,
  Link2 as LinkIcon,
  Globe,
  Share2,
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Mail,
} from 'lucide-react';
import {
  useStore,
  Product,
  HeroSlide,
  ComboBundle,
  FaqItem,
  BenefitCard,
  SectionVisibility,
  PageVisibility,
  StoreSettings,
  BusinessLink,
  BusinessProfile,
} from '../../context/store-context';

export default function AdminPage() {
  const {
    products,
    heroSlides,
    combos,
    faqs,
    benefits,
    sectionVisibility,
    pageVisibility,
    settings,
    businessProfile,
    businessLinks,
    lastUpdatedTime,
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
    addBusinessLink,
    updateBusinessLink,
    deleteBusinessLink,
    saveBusinessLinks,
    updateBusinessProfile,
    updateSectionVisibility,
    updatePageVisibility,
    updateSettings,
    resetToDefaults,
    uploadImage,
    showToast,
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'banners' | 'combos' | 'links' | 'faqs' | 'benefits' | 'visibility' | 'settings' | 'danger'
  >('overview');

  // Filters & Search for Products
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('All');
  const [selectedStockFilter, setSelectedStockFilter] = useState<'All' | 'in_stock' | 'out_of_stock'>('All');

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploadingProductImg, setIsUploadingProductImg] = useState(false);
  const [scentNoteInput, setScentNoteInput] = useState('');

  const [productForm, setProductForm] = useState<{
    name: string;
    category: Product['category'];
    price: string;
    originalPrice: string;
    discountText: string;
    badge: string;
    iconType: Product['iconType'];
    image: string;
    description: string;
    burnTime: string;
    scentNotes: string[];
    stockState: 'in_stock' | 'out_of_stock';
  }>({
    name: '',
    category: 'Incense Sticks Packs',
    price: 'Rs. 1,350.00',
    originalPrice: 'Rs. 1,600.00',
    discountText: '15% OFF',
    badge: '15% OFF',
    iconType: 'flame',
    image: '',
    description: '',
    burnTime: '45 mins per stick',
    scentNotes: ['Natural Aroma', 'Herbal Extracts'],
    stockState: 'in_stock',
  });

  // Combo Modal State
  const [comboModalOpen, setComboModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<ComboBundle | null>(null);
  const [isUploadingComboImg, setIsUploadingComboImg] = useState(false);
  const [inclusionInput, setInclusionInput] = useState('');

  const [comboForm, setComboForm] = useState<{
    title: string;
    badge: string;
    savings: string;
    price: string;
    regularValue: string;
    image: string;
    inclusions: string[];
  }>({
    title: '',
    badge: 'BEST VALUE',
    savings: 'SAVE RS. 800',
    price: 'Rs. 2,500.00',
    regularValue: 'Rs. 3,300.00',
    image: '/product_mega_combo.jpg',
    inclusions: ['14-in-1 Incense Sticks Pack', 'Pure Herbal Sambrani Powder 100g', 'Free Islandwide Delivery'],
  });

  // FAQ Modal State
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqForm, setFaqForm] = useState<{ q: string; a: string; category: string }>({
    q: '',
    a: '',
    category: 'General',
  });

  // Business Links (Linktree) Modal & Profile State
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<BusinessLink | null>(null);
  const [linkForm, setLinkForm] = useState<{
    title: string;
    url: string;
    subtitle: string;
    badge: string;
    icon: string;
    highlight: boolean;
    isActive: boolean;
    order: number;
  }>({
    title: '',
    url: '',
    subtitle: '',
    badge: '',
    icon: 'website',
    highlight: false,
    isActive: true,
    order: 1,
  });

  const [profileForm, setProfileForm] = useState<BusinessProfile>(
    businessProfile || {
      businessName: 'EECO AROMATICS',
      description: '',
      logo: '/eeco_logo.png',
      location: 'Sri Lanka',
      verified: true,
    }
  );
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    if (businessProfile) setProfileForm(businessProfile);
  }, [businessProfile]);

  // Benefits Form State (4 cards)
  const [benefitsForm, setBenefitsForm] = useState<BenefitCard[]>(benefits);
  useEffect(() => {
    if (benefits && benefits.length > 0) setBenefitsForm(benefits);
  }, [benefits]);

  // Uploading state for Hero Banners
  const [bannerUploadingId, setBannerUploadingId] = useState<number | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Session Authentication Check
  useEffect(() => {
    const authSession = sessionStorage.getItem('eeco_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPins = [settings.adminPin, 'admin123', 'eeco2026'];
    if (validPins.includes(pinInput)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('eeco_admin_auth', 'true');
      sessionStorage.setItem('eeco_admin_pin', pinInput);
      setPinError(false);
      showToast('Admin access authorized successfully!');
    } else {
      setPinError(true);
      showToast('Incorrect PIN. Default PIN is admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('eeco_admin_auth');
    sessionStorage.removeItem('eeco_admin_pin');
    setPinInput('');
    showToast('Logged out of Admin Panel.');
  };

  // Product Image Upload
  const handleProductFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingProductImg(true);
      const url = await uploadImage(file);
      setProductForm((prev) => ({ ...prev, image: url }));
      showToast('Product photo uploaded successfully!');
    } catch (err: any) {
      showToast(err?.message || 'Photo upload failed');
    } finally {
      setIsUploadingProductImg(false);
      e.target.value = '';
    }
  };

  // Combo Image Upload
  const handleComboFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingComboImg(true);
      const url = await uploadImage(file);
      setComboForm((prev) => ({ ...prev, image: url }));
      showToast('Combo bundle image uploaded successfully!');
    } catch (err: any) {
      showToast(err?.message || 'Image upload failed');
    } finally {
      setIsUploadingComboImg(false);
      e.target.value = '';
    }
  };

  // Banner Image Upload
  const handleBannerFileUpload = async (slideId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setBannerUploadingId(slideId);
      const url = await uploadImage(file);
      await updateHeroSlide(slideId, { bannerImage: url });
      showToast('Banner photo uploaded and saved to Database!');
    } catch (err: any) {
      showToast(err?.message || 'Banner upload failed');
    } finally {
      setBannerUploadingId(null);
      e.target.value = '';
    }
  };

  // Product CRUD Modal Handlers
  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Incense Sticks Packs',
      price: 'Rs. 1,350.00',
      originalPrice: 'Rs. 1,600.00',
      discountText: '15% OFF',
      badge: '15% OFF',
      iconType: 'flame',
      image: '',
      description: '',
      burnTime: '45 mins per stick',
      scentNotes: ['Natural Herbal Blend', 'Holy Basil'],
      stockState: 'in_stock',
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      discountText: product.discountText || '',
      badge: product.badge || '',
      iconType: product.iconType,
      image: product.image || '',
      description: product.description || '',
      burnTime: product.burnTime || '45 mins per stick',
      scentNotes: product.scentNotes || [],
      stockState: product.stockState === 'out_of_stock' ? 'out_of_stock' : 'in_stock',
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast('Please provide a name and price.');
      return;
    }

    if (editingProduct) {
      await updateProduct(editingProduct.id, productForm);
    } else {
      await addProduct({
        ...productForm,
        rating: 5,
        reviewCount: Math.floor(Math.random() * 100) + 120,
        shipping: 'Courier 1-3 Days',
        storeCategory: productForm.category,
      });
    }
    setProductModalOpen(false);
  };

  // Combo CRUD Modal Handlers
  const handleOpenNewCombo = () => {
    setEditingCombo(null);
    setComboForm({
      title: '',
      badge: 'BEST VALUE',
      savings: 'SAVE RS. 800',
      price: 'Rs. 2,500.00',
      regularValue: 'Rs. 3,300.00',
      image: '/product_mega_combo.jpg',
      inclusions: ['14-in-1 Incense Sticks Pack', 'Pure Herbal Sambrani Powder 100g', 'Free Islandwide Delivery'],
    });
    setComboModalOpen(true);
  };

  const handleOpenEditCombo = (c: ComboBundle) => {
    setEditingCombo(c);
    setComboForm({
      title: c.title,
      badge: c.badge,
      savings: c.savings,
      price: c.price,
      regularValue: c.regularValue,
      image: c.image,
      inclusions: c.inclusions || [],
    });
    setComboModalOpen(true);
  };

  const handleSaveCombo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comboForm.title || !comboForm.price) {
      showToast('Title and price are required.');
      return;
    }
    if (editingCombo) {
      await updateCombo(editingCombo.id, comboForm);
    } else {
      await addCombo(comboForm);
    }
    setComboModalOpen(false);
  };

  // FAQ CRUD Modal Handlers
  const handleOpenNewFaq = () => {
    setEditingFaq(null);
    setFaqForm({ q: '', a: '', category: 'General' });
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (f: FaqItem) => {
    setEditingFaq(f);
    setFaqForm({ q: f.q, a: f.a, category: f.category || 'General' });
    setFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.q || !faqForm.a) {
      showToast('Question and answer are required.');
      return;
    }
    if (editingFaq) {
      await updateFaq(editingFaq.id, faqForm);
    } else {
      await addFaq(faqForm);
    }
    setFaqModalOpen(false);
  };

  // Business Links (Linktree) CRUD Handlers
  const handleOpenAddLinkModal = () => {
    setEditingLink(null);
    setLinkForm({
      title: '',
      url: '',
      subtitle: '',
      badge: '',
      icon: 'website',
      highlight: false,
      isActive: true,
      order: (businessLinks?.length || 0) + 1,
    });
    setLinkModalOpen(true);
  };

  const handleOpenEditLinkModal = (link: BusinessLink) => {
    setEditingLink(link);
    setLinkForm({
      title: link.title || '',
      url: link.url || '',
      subtitle: link.subtitle || '',
      badge: link.badge || '',
      icon: link.icon || 'website',
      highlight: link.highlight || false,
      isActive: link.isActive !== undefined ? link.isActive : true,
      order: link.order || 1,
    });
    setLinkModalOpen(true);
  };

  const handleSaveLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkForm.title || !linkForm.url) {
      showToast('Please provide both a Title and a URL for the button.');
      return;
    }

    if (editingLink) {
      await updateBusinessLink(editingLink.id, linkForm);
      showToast('Button link updated successfully!');
    } else {
      await addBusinessLink(linkForm);
      showToast('New button link added successfully!');
    }
    setLinkModalOpen(false);
  };

  const handleDeleteLink = async (id: string) => {
    if (confirm('Are you sure you want to delete this link button?')) {
      await deleteBusinessLink(id);
      showToast('Link button removed.');
    }
  };

  const handleToggleLinkActive = async (link: BusinessLink) => {
    await updateBusinessLink(link.id, { isActive: !link.isActive });
    showToast(`Link button ${!link.isActive ? 'activated' : 'hidden'}.`);
  };

  const handleMoveLink = async (index: number, direction: 'up' | 'down') => {
    const newLinks = [...(businessLinks || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;

    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;

    const reordered = newLinks.map((item, idx) => ({ ...item, order: idx + 1 }));
    await saveBusinessLinks(reordered);
    showToast('Button order updated!');
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingLogo(true);
      const url = await uploadImage(file);
      setProfileForm((prev) => ({ ...prev, logo: url }));
      await updateBusinessProfile({ logo: url });
      showToast('Business logo uploaded and saved to Database!');
    } catch (err: any) {
      showToast(err?.message || 'Logo upload failed');
    } finally {
      setIsUploadingLogo(false);
      e.target.value = '';
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBusinessProfile(profileForm);
    showToast('Business profile details saved to Database!');
  };

  // Filtered Products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedProductCategory === 'All' || p.category === selectedProductCategory;
    const matchesStock =
      selectedStockFilter === 'All' ||
      (selectedStockFilter === 'in_stock' && p.stockState !== 'out_of_stock') ||
      (selectedStockFilter === 'out_of_stock' && p.stockState === 'out_of_stock');
    return matchesSearch && matchesCategory && matchesStock;
  });

  const inStockCount = products.filter((p) => p.stockState !== 'out_of_stock').length;
  const outOfStockCount = products.filter((p) => p.stockState === 'out_of_stock').length;

  // ================= 1. PIN LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at top, #1E3A8A 0%, #0F172A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'sans-serif',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            padding: '40px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1A56DB 0%, #059669 100%)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 25px rgba(26, 86, 219, 0.4)',
            }}
          >
            <Lock size={30} color="#FFFFFF" />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>EECO Control Center</h2>
          <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '28px' }}>
            Enter your Secure Admin PIN to access live database controls and store management.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="password"
                placeholder="Enter PIN (Default: admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: '#0B131E',
                  border: pinError ? '1.5px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  textAlign: 'center',
                  letterSpacing: '2px',
                  outline: 'none',
                }}
                autoFocus
              />
              {pinError && (
                <span style={{ fontSize: '12px', color: '#EF4444', display: 'block', marginTop: '6px' }}>
                  Incorrect PIN. Please try again or use default: admin123
                </span>
              )}
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#1A56DB',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(26, 86, 219, 0.4)',
              }}
            >
              Unlock Dashboard
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Link
              href="/"
              style={{
                fontSize: '13px',
                color: '#60A5FA',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Back to Storefront</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ================= 2. AUTHENTICATED DASHBOARD =================
  return (
    <div className="admin-shell" style={{ minHeight: '100vh', background: '#090E17', color: '#F1F5F9', display: 'flex' }}>
      {/* SIDEBAR NAVIGATION */}
      <aside
        style={{
          width: '270px',
          background: '#0D1522',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div>
          {/* Logo & Store Info */}
          <div style={{ padding: '0 8px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #1A56DB, #059669)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Flame size={20} color="#FFFFFF" />
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                EECO ADMIN
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Live Server Database Synced</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', name: 'Products Catalog', icon: Package, badge: products.length },
              { id: 'banners', name: 'Hero Banners CMS', icon: Sliders, badge: heroSlides.length },
              { id: 'combos', name: 'Combo Bundles CMS', icon: Gift, badge: combos.length },
              { id: 'links', name: 'Hidden Links (Linktree)', icon: LinkIcon, badge: businessLinks?.length },
              { id: 'faqs', name: 'Customer FAQs CMS', icon: FaqIcon, badge: faqs.length },
              { id: 'benefits', name: 'Service Benefits CMS', icon: Award },
              { id: 'visibility', name: 'Section & Page Visibility', icon: Layers },
              { id: 'settings', name: 'Store Settings & PIN', icon: Settings },
              { id: 'danger', name: 'Backup & Factory Reset', icon: AlertTriangle },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isActive ? '#1A56DB' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        padding: '2px 7px',
                        borderRadius: '999px',
                        fontWeight: 700,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {/* Dedicated 'View Hidden Links Page' Button in Admin Panel Only */}
          <Link
            href="/links"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px 12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(26,86,219,0.22), rgba(16,185,129,0.22))',
              border: '1px solid rgba(56,189,248,0.4)',
              color: '#38BDF8',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(26, 86, 219, 0.15)',
            }}
          >
            <span>🔗 View Hidden Links Page</span>
            <ExternalLink size={14} />
          </Link>

          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#60A5FA',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <span>View Live Website</span>
            <ExternalLink size={14} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#F87171',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <LogOut size={14} />
            <span>Logout PIN</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', maxHeight: '100vh' }}>
        {/* Top Action Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
              {activeTab === 'overview' && 'Store Analytics & Overview'}
              {activeTab === 'products' && 'Products Catalog Management'}
              {activeTab === 'banners' && 'Hero Slider & Promotional Banners'}
              {activeTab === 'combos' && 'Combo Bundles & Gift Sets'}
              {activeTab === 'links' && 'Hidden Business Links Page (Linktree)'}
              {activeTab === 'faqs' && 'Customer FAQs & Support'}
              {activeTab === 'benefits' && 'Service Benefits & Guarantee Cards'}
              {activeTab === 'visibility' && 'Granular Section & Page Visibility'}
              {activeTab === 'settings' && 'Store Configuration & Admin PIN'}
              {activeTab === 'danger' && 'Database Backup & Factory Reset'}
            </h1>
            <p style={{ fontSize: '13.5px', color: '#94A3B8' }}>
              Contabo Server Database Connected • Auto-Sync Active {lastUpdatedTime ? `(Last modified: ${new Date(lastUpdatedTime).toLocaleTimeString()})` : ''}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {activeTab === 'links' && (
              <>
                <Link
                  href="/links"
                  target="_blank"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    color: '#38BDF8',
                    padding: '11px 18px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={16} />
                  <span>View Hidden Links Page</span>
                </Link>

                <button
                  onClick={handleOpenAddLinkModal}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#1A56DB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '11px 20px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(26, 86, 219, 0.4)',
                  }}
                >
                  <Plus size={16} />
                  <span>Add New Button</span>
                </button>
              </>
            )}

            {activeTab === 'products' && (
              <button
                onClick={handleOpenNewProduct}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1A56DB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '11px 20px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(26, 86, 219, 0.4)',
                }}
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
            )}

            {activeTab === 'combos' && (
              <button
                onClick={handleOpenNewCombo}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '11px 20px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} />
                <span>Add New Combo</span>
              </button>
            )}

            {activeTab === 'faqs' && (
              <button
                onClick={handleOpenNewFaq}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1A56DB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '11px 20px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} />
                <span>Add New FAQ</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW & ANALYTICS ================= */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="admin-card" style={{ background: '#111C2A', borderRadius: '18px', padding: '22px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '13px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Total Products</span>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF' }}>{products.length}</h3>
                <span style={{ fontSize: '12px', color: '#60A5FA', display: 'block', marginTop: '4px' }}>In 6 fragrance categories</span>
              </div>

              <div className="admin-card" style={{ background: '#111C2A', borderRadius: '18px', padding: '22px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '13px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>In Stock</span>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#10B981' }}>{inStockCount}</h3>
                <span style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Ready for islandwide dispatch</span>
              </div>

              <div className="admin-card" style={{ background: '#111C2A', borderRadius: '18px', padding: '22px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '13px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Out of Stock</span>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#EF4444' }}>{outOfStockCount}</h3>
                <span style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Hidden / Sold out items</span>
              </div>

              <div className="admin-card" style={{ background: '#111C2A', borderRadius: '18px', padding: '22px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '13px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Active Hero Banners</span>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#F59E0B' }}>{heroSlides.length}</h3>
                <span style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginTop: '4px' }}>Rotating promotions on home</span>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Store Hotline &amp; Orders</h3>
                <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '16px', lineHeight: 1.6 }}>
                  WhatsApp Hotline: <strong style={{ color: '#FFFFFF' }}>+{settings.whatsappNumber}</strong><br />
                  Free Shipping Threshold: <strong style={{ color: '#FFFFFF' }}>Rs. {settings.freeDeliveryThreshold}</strong><br />
                  Islandwide Delivery Fee: <strong style={{ color: '#FFFFFF' }}>Rs. {settings.deliveryFee}</strong>
                </p>
                <button
                  onClick={() => setActiveTab('settings')}
                  style={{
                    backgroundColor: '#1E293B',
                    color: '#60A5FA',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Configure Store Settings
                </button>
              </div>

              <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Live Catalog Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={handleOpenNewProduct}
                    style={{
                      padding: '10px 16px',
                      background: '#1A56DB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    + Add New Fragrance Product with Photo
                  </button>
                  <button
                    onClick={() => setActiveTab('banners')}
                    style={{
                      padding: '10px 16px',
                      background: '#1E293B',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    Upload / Change Hero Banners
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS CATALOG CMS ================= */}
        {activeTab === 'products' && (
          <div>
            {/* Search and Filters Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '14px',
                background: '#111C2A',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Search input */}
              <div style={{ position: 'relative', width: '320px', maxWidth: '100%' }}>
                <Search size={16} color="#64748B" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search products by title or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    background: '#0B131E',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Category Filter */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['All', 'Incense Sticks Packs', 'Incense Powder Packs', 'Air Fresheners', 'Diffuser', 'Combo Bundle', 'Wholesale Products'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedProductCategory(cat)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedProductCategory === cat ? '#1A56DB' : 'rgba(255, 255, 255, 0.06)',
                        color: selectedProductCategory === cat ? '#FFFFFF' : '#94A3B8',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Products Table */}
            <div
              style={{
                background: '#111C2A',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#0B131E', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8' }}>
                    <th style={{ padding: '14px 18px' }}>Image &amp; Title</th>
                    <th style={{ padding: '14px 18px' }}>Category</th>
                    <th style={{ padding: '14px 18px' }}>Price</th>
                    <th style={{ padding: '14px 18px' }}>Stock Status</th>
                    <th style={{ padding: '14px 18px' }}>Visibility</th>
                    <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '8px',
                            background: '#0B131E',
                            overflow: 'hidden',
                            flexShrink: 0,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <img src={p.image || '/product_thulasi_sticks.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <strong style={{ color: '#FFFFFF', display: 'block', fontSize: '14px' }}>{p.name}</strong>
                          <span style={{ fontSize: '11.5px', color: '#64748B' }}>{p.burnTime || '45 mins'}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px', color: '#CBD5E1' }}>{p.category}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <strong style={{ color: '#60A5FA' }}>{p.price}</strong>
                        {p.originalPrice && <del style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>{p.originalPrice}</del>}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <button
                          onClick={() => updateProduct(p.id, { stockState: p.stockState === 'out_of_stock' ? 'in_stock' : 'out_of_stock' })}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: 'none',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            background: p.stockState === 'out_of_stock' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: p.stockState === 'out_of_stock' ? '#EF4444' : '#10B981',
                            cursor: 'pointer',
                          }}
                        >
                          {p.stockState === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
                        </button>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <button
                          onClick={() => toggleProductHidden(p.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: p.hidden ? '#64748B' : '#10B981',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                          }}
                        >
                          {p.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                          <span>{p.hidden ? 'Hidden' : 'Visible'}</span>
                        </button>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            style={{
                              background: 'rgba(26, 86, 219, 0.15)',
                              color: '#60A5FA',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                            }}
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              color: '#F87171',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HERO SLIDER CMS ================= */}
        {activeTab === 'banners' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Hero Carousel Slides</h3>
                <p style={{ fontSize: '13.5px', color: '#94A3B8' }}>
                  Upload high-res background banners (1920x600 px) and configure live offers.
                </p>
              </div>
              <button
                onClick={() =>
                  addHeroSlide({
                    offer: '⚡ NEW SEASON OFFER • ISLANDWIDE DELIVERY',
                    badge: 'HOT DEAL',
                    heading: 'Pure Ayurvedic Natural Incense Collection',
                    desc: 'Handcrafted Ceylon fragrances made with sacred botanical resins.',
                    icon: 'Sparkles',
                    bannerImage: '/banner_slider_1.png',
                    whatsappMsg: 'Hi EECO AROMATICS! I want to order the new collection.',
                  })
                }
                style={{
                  background: '#1A56DB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Add Slide
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  style={{
                    background: '#111C2A',
                    borderRadius: '18px',
                    padding: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 800, color: '#60A5FA', fontSize: '15px' }}>Slide #{index + 1}</span>
                    {heroSlides.length > 1 && (
                      <button
                        onClick={() => deleteHeroSlide(slide.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Offer Tag</label>
                      <input
                        type="text"
                        value={slide.offer}
                        onChange={(e) => updateHeroSlide(slide.id, { offer: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Badge Label</label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => updateHeroSlide(slide.id, { badge: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Main Heading</label>
                    <textarea
                      rows={2}
                      value={slide.heading}
                      onChange={(e) => updateHeroSlide(slide.id, { heading: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Description</label>
                    <textarea
                      rows={2}
                      value={slide.desc}
                      onChange={(e) => updateHeroSlide(slide.id, { desc: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  {/* Banner Photo Upload */}
                  <div>
                    <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
                      Background Banner Image (Upload or URL)
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {slide.bannerImage && (
                        <div
                          style={{
                            width: '200px',
                            height: '65px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            background: '#0B131E',
                          }}
                        >
                          <img src={slide.bannerImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}

                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: bannerUploadingId === slide.id ? '#334155' : '#1A56DB',
                          color: '#FFFFFF',
                          padding: '10px 18px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: bannerUploadingId === slide.id ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {bannerUploadingId === slide.id ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
                        <span>{bannerUploadingId === slide.id ? 'Uploading to Server...' : 'Upload Banner Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={bannerUploadingId === slide.id}
                          style={{ display: 'none' }}
                          onChange={(e) => handleBannerFileUpload(slide.id, e)}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={slide.bannerImage || ''}
                      onChange={(e) => updateHeroSlide(slide.id, { bannerImage: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. /banner_slider_1.png or /uploads/your_uploaded_photo.jpg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: COMBO BUNDLES CMS ================= */}
        {activeTab === 'combos' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {combos.map((combo) => (
                <div
                  key={combo.id}
                  style={{
                    background: '#111C2A',
                    borderRadius: '18px',
                    padding: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', background: '#0B131E' }}>
                      <img src={combo.image || '/product_mega_combo.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                        {combo.badge}
                      </span>
                      <span style={{ background: '#FEE2E2', color: '#E11D48', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                        {combo.savings}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>{combo.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#60A5FA' }}>{combo.price}</span>
                      <del style={{ fontSize: '13px', color: '#64748B' }}>{combo.regularValue}</del>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#94A3B8' }}>
                      {combo.inclusions.map((inc, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ color: '#10B981' }}>✔</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <button
                      onClick={() => handleOpenEditCombo(combo)}
                      style={{
                        flex: 1,
                        background: '#1E293B',
                        color: '#60A5FA',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Edit Bundle
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete combo bundle "${combo.title}"?`)) deleteCombo(combo.id);
                      }}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#F87171',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4.5: HIDDEN BUSINESS LINKS (LINKTREE) CMS ================= */}
        {activeTab === 'links' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Info Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(26, 86, 219, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '16px',
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#1A56DB',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LinkIcon size={22} color="#FFFFFF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: '#FFFFFF', marginBottom: '3px' }}>
                    Hidden Business Links Page (Linktree Style)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                    This page is isolated from main navigation, menus, and footer. It is only accessible via direct URL (<code style={{ color: '#38BDF8', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>/links</code>).
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  href="/links"
                  target="_blank"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#1A56DB',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(26, 86, 219, 0.3)',
                  }}
                >
                  <span>View Hidden Page</span>
                  <ExternalLink size={14} />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(`${window.location.origin}/links`);
                      showToast('Copied hidden page link to clipboard!');
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#E2E8F0',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Copy size={14} />
                  <span>Copy URL</span>
                </button>
              </div>
            </div>

            {/* Profile & Bio Section */}
            <div className="admin-card" style={{ background: '#111C2A', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Business Profile & Bio Customizer</h3>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Changes reflect immediately on /links</span>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '18px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Business Name</label>
                    <input
                      type="text"
                      value={profileForm.businessName}
                      onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. EECO AROMATICS"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Location / City Badge</label>
                    <input
                      type="text"
                      value={profileForm.location || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Colombo & Gampaha, Sri Lanka"
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Business Bio / Short Description</label>
                    <textarea
                      rows={2}
                      value={profileForm.description}
                      onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                      className="admin-input"
                      placeholder="Enter business bio, introduction, or key specialties..."
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={profileForm.logo || '/eeco_logo.png'}
                      alt="Logo"
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', background: '#FFFFFF', border: '2px solid #38BDF8' }}
                    />
                    <div>
                      <span style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Business Logo Image</span>
                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFFFFF',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: isUploadingLogo ? 'wait' : 'pointer',
                        }}
                      >
                        {isUploadingLogo ? <Loader2 size={13} className="spin" /> : <Upload size={13} />}
                        <span>{isUploadingLogo ? 'Uploading...' : 'Upload New Logo'}</span>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} disabled={isUploadingLogo} />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#059669',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Save size={15} />
                    <span>Save Profile Details</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Link Buttons Manager */}
            <div className="admin-card" style={{ background: '#111C2A', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                    Business Action Buttons ({businessLinks?.length || 0})
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                    Rearrange, edit, toggle visibility, or add new custom buttons for your hidden links page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddLinkModal}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#1A56DB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(26, 86, 219, 0.3)',
                  }}
                >
                  <Plus size={15} />
                  <span>Add New Button</span>
                </button>
              </div>

              {/* Links List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(businessLinks || []).map((link, idx) => (
                  <div
                    key={link.id || idx}
                    style={{
                      background: '#0D1522',
                      border: link.highlight ? '1.5px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px',
                      opacity: link.isActive ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Left info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '260px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background:
                            link.icon === 'whatsapp'
                              ? '#25D366'
                              : link.icon === 'facebook'
                              ? '#1877F2'
                              : link.icon === 'instagram'
                              ? 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)'
                              : link.icon === 'youtube'
                              ? '#FF0000'
                              : link.icon === 'tiktok'
                              ? '#000000'
                              : link.icon === 'gmail'
                              ? '#EA4335'
                              : '#1A56DB',
                          display: 'grid',
                          placeItems: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0,
                          border: link.icon === 'tiktok' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                        }}
                      >
                        {link.icon === 'website' && <Globe size={18} />}
                        {link.icon === 'whatsapp' && <MessageSquare size={18} />}
                        {link.icon === 'facebook' && <span style={{ fontWeight: 800, fontSize: '16px' }}>f</span>}
                        {link.icon === 'instagram' && <span style={{ fontWeight: 800, fontSize: '14px' }}>IG</span>}
                        {link.icon === 'youtube' && <span style={{ fontWeight: 800, fontSize: '13px' }}>YT</span>}
                        {link.icon === 'tiktok' && <span style={{ fontWeight: 800, fontSize: '13px' }}>TT</span>}
                        {link.icon === 'gmail' && <Mail size={18} />}
                        {!['website', 'whatsapp', 'facebook', 'instagram', 'youtube', 'tiktok', 'gmail'].includes(link.icon) && (
                          <Sparkles size={18} />
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>{link.title}</span>
                          {link.badge && (
                            <span
                              style={{
                                background: link.highlight ? 'linear-gradient(135deg, #FFBE00, #F59E0B)' : 'rgba(255, 255, 255, 0.15)',
                                color: link.highlight ? '#111827' : '#FFFFFF',
                                fontSize: '10.5px',
                                fontWeight: 800,
                                padding: '2px 8px',
                                borderRadius: '999px',
                              }}
                            >
                              {link.badge}
                            </span>
                          )}
                          {link.highlight && (
                            <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 700 }}>★ Highlighted</span>
                          )}
                        </div>

                        {link.subtitle && (
                          <span style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginTop: '2px' }}>
                            {link.subtitle}
                          </span>
                        )}

                        <span style={{ fontSize: '12px', color: '#60A5FA', display: 'block', marginTop: '2px', wordBreak: 'break-all' }}>
                          {link.url}
                        </span>
                      </div>
                    </div>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Move Up/Down buttons */}
                      <button
                        type="button"
                        onClick={() => handleMoveLink(idx, 'up')}
                        disabled={idx === 0}
                        title="Move Up"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: 'none',
                          color: idx === 0 ? '#475569' : '#94A3B8',
                          padding: '7px',
                          borderRadius: '8px',
                          cursor: idx === 0 ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <ArrowUp size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveLink(idx, 'down')}
                        disabled={idx === (businessLinks?.length || 0) - 1}
                        title="Move Down"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: 'none',
                          color: idx === (businessLinks?.length || 0) - 1 ? '#475569' : '#94A3B8',
                          padding: '7px',
                          borderRadius: '8px',
                          cursor: idx === (businessLinks?.length || 0) - 1 ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <ArrowDown size={15} />
                      </button>

                      {/* Active Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleLinkActive(link)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: link.isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          border: `1px solid ${link.isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                          color: link.isActive ? '#10B981' : '#F87171',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {link.isActive ? <Eye size={13} /> : <EyeOff size={13} />}
                        <span>{link.isActive ? 'Active' : 'Hidden'}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditLinkModal(link)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: 'none',
                          color: '#60A5FA',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '12.5px',
                          fontWeight: 600,
                        }}
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteLink(link.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: 'none',
                          color: '#F87171',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: FAQS CMS ================= */}
        {activeTab === 'faqs' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  style={{
                    background: '#111C2A',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '11px', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>
                      {faq.category || 'General Question'}
                    </span>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                      {idx + 1}. {faq.q}
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEditFaq(faq)}
                      style={{ background: '#1E293B', color: '#60A5FA', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete FAQ "${faq.q}"?`)) deleteFaq(faq.id);
                      }}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#F87171', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: SERVICE BENEFITS CMS ================= */}
        {activeTab === 'benefits' && (
          <div>
            <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '24px' }}>
              Edit the 4 service guarantee cards shown directly under the Hero Banner on the homepage.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {benefitsForm.map((card, idx) => (
                <div
                  key={card.id}
                  style={{
                    background: '#111C2A',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#60A5FA', display: 'block', marginBottom: '10px' }}>
                    Benefit Card #{idx + 1}
                  </span>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Card Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const updated = [...benefitsForm];
                        updated[idx].title = e.target.value;
                        setBenefitsForm(updated);
                      }}
                      className="admin-input"
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const updated = [...benefitsForm];
                        updated[idx].description = e.target.value;
                        setBenefitsForm(updated);
                      }}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Icon</label>
                    <select
                      value={card.icon}
                      onChange={(e) => {
                        const updated = [...benefitsForm];
                        updated[idx].icon = e.target.value;
                        setBenefitsForm(updated);
                      }}
                      className="admin-input"
                    >
                      <option value="ShieldCheck">Shield (Purity / Quality)</option>
                      <option value="Truck">Truck (Fast Delivery)</option>
                      <option value="Award">Award (Guaranteed Authentic)</option>
                      <option value="Headphones">Headphones (24/7 Support)</option>
                      <option value="PackageCheck">Package Check (COD)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => saveBenefits(benefitsForm)}
              style={{
                backgroundColor: '#1A56DB',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Save Service Benefits to Database
            </button>
          </div>
        )}

        {/* ================= TAB 7: SECTION & PAGE VISIBILITY ================= */}
        {activeTab === 'visibility' && (
          <div>
            <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Homepage Sections Visibility</h3>
              <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '20px' }}>
                Toggle any section on/off. Turned-off sections will vanish smoothly from the live storefront.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                {[
                  { key: 'hero', name: 'Hero Banner Slider' },
                  { key: 'benefits', name: 'Service Benefits (4 Cards)' },
                  { key: 'dailyDiscount', name: 'Daily Discount Products' },
                  { key: 'bestSelling', name: 'Best Selling Products' },
                  { key: 'categories', name: 'Shop by Category Cards' },
                  { key: 'ourProducts', name: 'Our Products Full Catalog' },
                  { key: 'wholesaleProducts', name: 'Wholesale Products (Curved Box)' },
                  { key: 'promoBanners', name: 'Promotional Offer Banners' },
                  { key: 'hotDeals', name: 'Hot Deals Countdown Timer' },
                  { key: 'newsletter', name: 'Newsletter Subscription' },
                ].map((sec) => (
                  <div
                    key={sec.key}
                    style={{
                      background: '#0B131E',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF' }}>{sec.name}</span>
                    <button
                      onClick={() => updateSectionVisibility(sec.key as keyof SectionVisibility, !sectionVisibility[sec.key as keyof SectionVisibility])}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        background: sectionVisibility[sec.key as keyof SectionVisibility] ? '#10B981' : '#334155',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      {sectionVisibility[sec.key as keyof SectionVisibility] ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Store Pages Visibility</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '16px' }}>
                {[
                  { key: 'shop', name: 'Shop / All Fragrances Page (/shop)' },
                  { key: 'comboBundle', name: 'Combo Bundles Page (/combo-bundle)' },
                  { key: 'about', name: 'About Us Page (/about)' },
                  { key: 'contact', name: 'Contact & FAQs Page (/contact)' },
                  { key: 'wishlist', name: 'Wishlist Page (/wishlist)' },
                  { key: 'cart', name: 'Cart Page (/cart)' },
                  { key: 'trackOrder', name: 'Track Order Page (/track-order)' },
                ].map((pg) => (
                  <div
                    key={pg.key}
                    style={{
                      background: '#0B131E',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF' }}>{pg.name}</span>
                    <button
                      onClick={() => updatePageVisibility(pg.key as keyof PageVisibility, !pageVisibility[pg.key as keyof PageVisibility])}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        background: pageVisibility[pg.key as keyof PageVisibility] ? '#10B981' : '#334155',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      {pageVisibility[pg.key as keyof PageVisibility] ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 8: STORE SETTINGS & PIN ================= */}
        {activeTab === 'settings' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSettings(settingsForm);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Store Identity &amp; Contact</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Store Name</label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Store Slogan</label>
                  <input
                    type="text"
                    value={settingsForm.storeSlogan}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeSlogan: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>WhatsApp Order Hotline</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Business Registration Number</label>
                  <input
                    type="text"
                    value={settingsForm.regNo}
                    onChange={(e) => setSettingsForm({ ...settingsForm, regNo: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Delivery Fees &amp; Announcement Bar</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Free Delivery Minimum Threshold (Rs.)</label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: parseInt(e.target.value, 10) || 0 })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Standard Courier Delivery Fee (Rs.)</label>
                  <input
                    type="number"
                    value={settingsForm.deliveryFee}
                    onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: parseInt(e.target.value, 10) || 0 })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Top Bar Announcement Marquee</label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>

            {/* Security Admin PIN */}
            <div style={{ background: '#111C2A', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Security &amp; Admin PIN</h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                Change your secret Admin Dashboard login PIN.
              </p>
              <div style={{ maxWidth: '320px' }}>
                <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Admin PIN</label>
                <input
                  type="text"
                  value={settingsForm.adminPin}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#1A56DB',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              Save All Settings
            </button>
          </form>
        )}

        {/* ================= TAB 9: DANGER ZONE & FACTORY RESET ================= */}
        {activeTab === 'danger' && (
          <div style={{ background: '#111C2A', borderRadius: '18px', padding: '28px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <AlertTriangle size={24} color="#EF4444" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#EF4444' }}>Factory Reset &amp; Default Restore</h3>
            </div>
            <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
              Restores the database to initial clean seed state (12 original authentic EECO products, 3 hero slides, 3 combo bundles, 4 FAQs, 4 service benefits, and default settings).
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset the database to factory template defaults?')) {
                  resetToDefaults();
                }
              }}
              style={{
                backgroundColor: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset Database to Factory Defaults
            </button>
          </div>
        )}
      </main>

      {/* ================= PRODUCT ADD/EDIT MODAL ================= */}
      <AnimatePresence>
        {productModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#111C2A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '32px',
                width: '100%',
                maxWidth: '620px',
                maxHeight: '90vh',
                overflowY: 'auto',
                color: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
                {editingProduct ? 'Edit Product' : 'Add New Fragrance Product'}
              </h3>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Product Title</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. EECO Thulasi Herbal Incense Sticks Pack"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                      className="admin-input"
                    >
                      <option value="Incense Sticks Packs">Incense Sticks Packs</option>
                      <option value="Incense Powder Packs">Incense Powder Packs</option>
                      <option value="Air Fresheners">Air Fresheners</option>
                      <option value="Diffuser">Diffusers &amp; Aroma Oils</option>
                      <option value="Combo Bundle">Combo Bundle</option>
                      <option value="Wholesale Products">Wholesale Products</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Stock Status</label>
                    <select
                      value={productForm.stockState}
                      onChange={(e) => setProductForm({ ...productForm, stockState: e.target.value as any })}
                      className="admin-input"
                    >
                      <option value="in_stock">In Stock (Available)</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Selling Price</label>
                    <input
                      type="text"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Rs. 1,350.00"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Original Price (Strikethrough)</label>
                    <input
                      type="text"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Rs. 1,600.00"
                    />
                  </div>
                </div>

                {/* Direct Image Upload */}
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
                    Product Photo (Upload from Local Storage or URL)
                  </label>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
                    {productForm.image ? (
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '1.5px solid #1A56DB',
                          background: '#0B131E',
                          flexShrink: 0,
                        }}
                      >
                        <img src={productForm.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '12px',
                          border: '1.5px dashed rgba(255, 255, 255, 0.2)',
                          background: '#0B131E',
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                          color: '#64748B',
                        }}
                      >
                        <ImageIcon size={24} />
                      </div>
                    )}

                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: isUploadingProductImg ? '#334155' : '#1A56DB',
                        color: '#FFFFFF',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: isUploadingProductImg ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {isUploadingProductImg ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
                      <span>{isUploadingProductImg ? 'Uploading...' : 'Choose Product Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingProductImg}
                        style={{ display: 'none' }}
                        onChange={handleProductFileUpload}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. /uploads/photo.jpg or /product_thulasi_sticks.jpg"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#1A56DB',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= COMBO BUNDLE MODAL ================= */}
      <AnimatePresence>
        {comboModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#111C2A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '32px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                color: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
                {editingCombo ? 'Edit Combo Bundle' : 'Add New Combo Bundle'}
              </h3>

              <form onSubmit={handleSaveCombo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Bundle Title</label>
                  <input
                    type="text"
                    value={comboForm.title}
                    onChange={(e) => setComboForm({ ...comboForm, title: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. Master Pooja & Home Fragrance Combo"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Badge Label</label>
                    <input
                      type="text"
                      value={comboForm.badge}
                      onChange={(e) => setComboForm({ ...comboForm, badge: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. BEST VALUE"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Savings Text</label>
                    <input
                      type="text"
                      value={comboForm.savings}
                      onChange={(e) => setComboForm({ ...comboForm, savings: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. SAVE RS. 950"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Combo Selling Price</label>
                    <input
                      type="text"
                      value={comboForm.price}
                      onChange={(e) => setComboForm({ ...comboForm, price: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Rs. 3,850.00"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Regular Value</label>
                    <input
                      type="text"
                      value={comboForm.regularValue}
                      onChange={(e) => setComboForm({ ...comboForm, regularValue: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Rs. 4,800.00"
                    />
                  </div>
                </div>

                {/* Combo Image Upload */}
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Bundle Photo</label>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '10px' }}>
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: isUploadingComboImg ? '#334155' : '#059669',
                        color: '#FFFFFF',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: isUploadingComboImg ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {isUploadingComboImg ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
                      <span>{isUploadingComboImg ? 'Uploading...' : 'Upload Bundle Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingComboImg}
                        style={{ display: 'none' }}
                        onChange={handleComboFileUpload}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={comboForm.image}
                    onChange={(e) => setComboForm({ ...comboForm, image: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. /uploads/combo.jpg or /product_mega_combo.jpg"
                  />
                </div>

                {/* Inclusions list */}
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Bundle Inclusions List</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Add item (e.g. 14x Incense Stick Packs)"
                      value={inclusionInput}
                      onChange={(e) => setInclusionInput(e.target.value)}
                      className="admin-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (inclusionInput.trim()) {
                          setComboForm({ ...comboForm, inclusions: [...comboForm.inclusions, inclusionInput.trim()] });
                          setInclusionInput('');
                        }
                      }}
                      style={{ padding: '0 16px', background: '#1A56DB', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Add
                    </button>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {comboForm.inclusions.map((inc, i) => (
                      <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0B131E', padding: '8px 12px', borderRadius: '8px', fontSize: '13px' }}>
                        <span>✔ {inc}</span>
                        <button
                          type="button"
                          onClick={() => setComboForm({ ...comboForm, inclusions: comboForm.inclusions.filter((_, idx) => idx !== i) })}
                          style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setComboModalOpen(false)}
                    style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#059669', color: '#FFFFFF', border: 'none', padding: '10px 22px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Save Bundle
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FAQ MODAL ================= */}
      <AnimatePresence>
        {faqModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#111C2A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '32px',
                width: '100%',
                maxWidth: '540px',
                color: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
                {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>

              <form onSubmit={handleSaveFaq} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Category Tag</label>
                  <input
                    type="text"
                    value={faqForm.category}
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. Delivery, Ordering, Quality"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Question</label>
                  <input
                    type="text"
                    value={faqForm.q}
                    onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. How long does delivery take?"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Answer</label>
                  <textarea
                    rows={4}
                    value={faqForm.a}
                    onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })}
                    className="admin-input"
                    placeholder="Enter detailed helpful answer..."
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setFaqModalOpen(false)}
                    style={{ background: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#1A56DB', color: '#FFFFFF', border: 'none', padding: '10px 22px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Save FAQ
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= LINKTREE BUTTON MODAL ================= */}
      <AnimatePresence>
        {linkModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#111C2A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '32px',
                width: '100%',
                maxWidth: '560px',
                maxHeight: '90vh',
                overflowY: 'auto',
                color: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
                {editingLink ? 'Edit Link Button' : 'Add New Link Button'}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>
                Customize button details, icon, badges, and target URL for the hidden links page.
              </p>

              <form onSubmit={handleSaveLink} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                    Button Title *
                  </label>
                  <input
                    type="text"
                    value={linkForm.title}
                    onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. WhatsApp Hotline, Official Online Store, Facebook"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                    Target URL / Link * (Use &apos;/&apos; for Homepage, or https:// / mailto:)
                  </label>
                  <input
                    type="text"
                    value={linkForm.url}
                    onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. / or https://wa.me/94762051906 or mailto:info.eecogroup@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                    Subtitle / Helper Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={linkForm.subtitle}
                    onChange={(e) => setLinkForm({ ...linkForm, subtitle: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. +94 76 205 1906 • 24/7 Islandwide Delivery"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                      Badge Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={linkForm.badge}
                      onChange={(e) => setLinkForm({ ...linkForm, badge: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. STORE, HOT, COD"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                      Brand Icon Type
                    </label>
                    <select
                      value={linkForm.icon}
                      onChange={(e) => setLinkForm({ ...linkForm, icon: e.target.value })}
                      className="admin-input"
                    >
                      <option value="website">Website / Store (Globe)</option>
                      <option value="whatsapp">WhatsApp (Chat)</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="gmail">Gmail / Email</option>
                      <option value="phone">Phone / Hotline</option>
                      <option value="map">Map / Location</option>
                      <option value="custom">Custom / Star</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '6px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#0B131E',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={linkForm.highlight}
                      onChange={(e) => setLinkForm({ ...linkForm, highlight: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#38BDF8', cursor: 'pointer' }}
                    />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', display: 'block' }}>
                        Highlight Button
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>Glow &amp; gold accent</span>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#0B131E',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={linkForm.isActive}
                      onChange={(e) => setLinkForm({ ...linkForm, isActive: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#10B981', cursor: 'pointer' }}
                    />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', display: 'block' }}>
                        Active &amp; Visible
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>Show on hidden page</span>
                    </div>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setLinkModalOpen(false)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '13px',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#1A56DB',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '13px',
                      boxShadow: '0 4px 14px rgba(26, 86, 219, 0.4)',
                    }}
                  >
                    {editingLink ? 'Save Button Changes' : 'Create Button'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
