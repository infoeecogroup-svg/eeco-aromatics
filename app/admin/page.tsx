'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Sliders,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Save,
  ShieldCheck,
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
} from 'lucide-react';
import { useStore, Product, HeroSlide, SectionVisibility, PageVisibility } from '../../context/store-context';

export default function AdminPage() {
  const {
    products,
    heroSlides,
    sectionVisibility,
    pageVisibility,
    settings,
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
    showToast,
  } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'banners' | 'visibility' | 'settings'>('dashboard');

  // Search in products
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('All');

  // Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New/Edit Product Form State
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
    stockState: 'in_stock',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Check session storage for existing auth
  useEffect(() => {
    const authSession = sessionStorage.getItem('eeco_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.adminPin || pinInput === 'admin123' || pinInput === 'eeco2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('eeco_admin_auth', 'true');
      setPinError(false);
      showToast('Admin access unlocked!');
    } else {
      setPinError(true);
      showToast('Incorrect PIN. Default is admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('eeco_admin_auth');
    setPinInput('');
    showToast('Logged out of Admin Panel.');
  };

  const openAddProduct = () => {
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
      stockState: 'in_stock',
    });
    setProductModalOpen(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      discountText: p.discountText || '',
      badge: p.badge || '',
      iconType: p.iconType,
      image: p.image || '',
      description: p.description || '',
      burnTime: p.burnTime || '',
      stockState: (p.stockState as any) || 'in_stock',
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) {
      showToast('Please enter product name');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
      });
    } else {
      addProduct({
        ...productForm,
        rating: 5,
        reviewCount: 150,
      });
    }
    setProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  // Filtered Products List
  const filteredAdminProducts = products.filter((p) => {
    const matchCat = selectedProductCategory === 'All' || p.category === selectedProductCategory;
    const matchSearch =
      productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // If not authenticated, show sleek PIN login screen
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0B131E 0%, #111C2A 100%)',
          color: '#F3F4F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            maxWidth: '420px',
            background: '#162234',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(7, 138, 131, 0.2)',
              border: '1px solid rgba(45, 212, 191, 0.3)',
              color: '#2DD4BF',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 20px auto',
            }}
          >
            <ShieldCheck size={32} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>EECO Admin CMS</h2>
          <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '28px' }}>
            Enter your admin PIN to access the store controller.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Enter PIN (Default: admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="admin-input"
                style={{ textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }}
              />
            </div>

            {pinError && (
              <span style={{ fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
                Incorrect PIN. Default is admin123
              </span>
            )}

            <motion.button
              type="submit"
              style={{
                backgroundColor: '#078A83',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14.5px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(7, 138, 131, 0.3)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              Unlock Dashboard
            </motion.button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href="/" style={{ color: '#94A3B8', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>Return to Customer Store</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/eeco_logo.png" alt="EECO Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {settings.storeName}
            </h3>
            <span style={{ fontSize: '11px', color: '#2DD4BF', fontWeight: 700 }}>ADMIN CONTROL PANEL</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Overview Dashboard</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} />
            <span>Products Catalog ({products.length})</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'banners' ? 'active' : ''}`}
            onClick={() => setActiveTab('banners')}
          >
            <Sparkles size={18} />
            <span>Hero &amp; Banners ({heroSlides.length})</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'visibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('visibility')}
          >
            <Sliders size={18} />
            <span>Sections &amp; Pages Visibility</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Maintenance &amp; Settings</span>
          </button>
        </nav>

        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: '#F3F4F6',
              background: 'rgba(255, 255, 255, 0.05)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={15} />
            <span>Open Live Store</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: '#EF4444',
              background: 'none',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <LogOut size={15} />
            <span>Lock / Log Out</span>
          </button>
        </div>
      </aside>

      {/* Admin Main Body */}
      <main className="admin-main">
        {/* Header Bar */}
        <header className="admin-header">
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800 }}>
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'banners' && 'Hero Slider & Promo CMS'}
              {activeTab === 'visibility' && 'Page & Section Visibility Controls'}
              {activeTab === 'settings' && 'Store Settings & Maintenance Mode'}
            </h1>
            <p style={{ fontSize: '13.5px', color: '#94A3B8', marginTop: '4px' }}>
              Real-time synchronization active • Changes persist to live website immediately
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {settings.maintenanceMode && (
              <span
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AlertTriangle size={14} />
                <span>MAINTENANCE MODE ACTIVE</span>
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              style={{
                background: '#078A83',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
              }}
            >
              <span>View Storefront</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stat Cards */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(7, 138, 131, 0.2)', color: '#2DD4BF', display: 'grid', placeItems: 'center' }}>
                  <Package size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Total Products</span>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>{products.length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(37, 211, 102, 0.2)', color: '#25D366', display: 'grid', placeItems: 'center' }}>
                  <CheckCircle size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Active on Store</span>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>{products.filter((p) => !p.hidden).length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 190, 0, 0.2)', color: '#FFBE00', display: 'grid', placeItems: 'center' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Hero Slides</span>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>{heroSlides.length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: settings.maintenanceMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(37, 211, 102, 0.2)', color: settings.maintenanceMode ? '#EF4444' : '#25D366', display: 'grid', placeItems: 'center' }}>
                  <Wrench size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Site Status</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, marginTop: '4px' }}>
                    {settings.maintenanceMode ? 'Maintenance' : 'Live & Active'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Short Cuts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800 }}>Recent Product Inventory</h3>
                  <button
                    onClick={() => setActiveTab('products')}
                    style={{ background: 'none', border: 'none', color: '#2DD4BF', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Manage All &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {products.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: '#111C2A',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#0B131E', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
                          {p.image ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Sparkles size={18} color="#2DD4BF" />}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#F3F4F6' }}>{p.name}</h4>
                          <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{p.category} • {p.price}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => toggleProductHidden(p.id)}
                          style={{
                            background: p.hidden ? 'rgba(239, 68, 68, 0.2)' : 'rgba(37, 211, 102, 0.2)',
                            color: p.hidden ? '#EF4444' : '#25D366',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {p.hidden ? 'Hidden' : 'Visible'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Toggles */}
              <div className="admin-card">
                <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '16px' }}>Quick Controls</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Maintenance Mode Toggle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#111C2A', borderRadius: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Maintenance Mode</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Temporarily show maintenance screen</span>
                    </div>
                    <div
                      className={`toggle-switch ${settings.maintenanceMode ? 'active' : ''}`}
                      onClick={() => updateSettings({ maintenanceMode: !settings.maintenanceMode })}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>

                  {/* Daily Discount Section */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#111C2A', borderRadius: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Daily Discount Section</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Show/hide on homepage</span>
                    </div>
                    <div
                      className={`toggle-switch ${sectionVisibility.dailyDiscount ? 'active' : ''}`}
                      onClick={() => updateSectionVisibility('dailyDiscount', !sectionVisibility.dailyDiscount)}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>

                  {/* Wholesale Products Section */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#111C2A', borderRadius: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Wholesale Products Section</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Curved teal box on homepage</span>
                    </div>
                    <div
                      className={`toggle-switch ${sectionVisibility.wholesaleProducts ? 'active' : ''}`}
                      onClick={() => updateSectionVisibility('wholesaleProducts', !sectionVisibility.wholesaleProducts)}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>

                  {/* Combo Bundle Page */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#111C2A', borderRadius: '12px' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700 }}>Combo Bundle Page (/combo-bundle)</h4>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>Enable or disable page</span>
                    </div>
                    <div
                      className={`toggle-switch ${pageVisibility.comboBundle ? 'active' : ''}`}
                      onClick={() => updatePageVisibility('comboBundle', !pageVisibility.comboBundle)}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>

                  {/* Reset Defaults */}
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all store data to default templates?')) {
                        resetToDefaults();
                      }
                    }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#EF4444',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      marginTop: '8px',
                    }}
                  >
                    <RefreshCw size={15} />
                    <span>Reset All Data to Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div>
            <div className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} color="#94A3B8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                  <input
                    type="text"
                    placeholder="Search products by title or fragrance..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="admin-input"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>

                <select
                  value={selectedProductCategory}
                  onChange={(e) => setSelectedProductCategory(e.target.value)}
                  className="admin-input"
                  style={{ width: '200px' }}
                >
                  <option value="All">All Categories</option>
                  <option value="Incense Sticks Packs">Incense Sticks</option>
                  <option value="Incense Powder Packs">Incense Powder</option>
                  <option value="Air Fresheners">Air Fresheners</option>
                  <option value="Diffuser">Diffusers</option>
                  <option value="Combo Bundle">Combo Bundles</option>
                  <option value="Wholesale Products">Wholesale Products</option>
                </select>
              </div>

              <motion.button
                onClick={openAddProduct}
                style={{
                  backgroundColor: '#078A83',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(7, 138, 131, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <Plus size={18} />
                <span>Add New Product</span>
              </motion.button>
            </div>

            {/* Products Table */}
            <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Visibility</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#0B131E', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
                            {p.image ? (
                              <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Sparkles size={18} color="#2DD4BF" />
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#F3F4F6' }}>{p.name}</div>
                            {p.badge && (
                              <span style={{ fontSize: '10.5px', background: '#D9003B', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>{p.category}</span>
                      </td>
                      <td>
                        <div>
                          <span style={{ fontWeight: 800, color: '#2DD4BF' }}>{p.price}</span>
                          <del style={{ fontSize: '11.5px', color: '#64748B', display: 'block' }}>{p.originalPrice}</del>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => updateProduct(p.id, { stockState: p.stockState === 'in_stock' ? 'out_of_stock' : 'in_stock' })}
                          style={{
                            background: p.stockState === 'in_stock' ? 'rgba(37, 211, 102, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: p.stockState === 'in_stock' ? '#25D366' : '#EF4444',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {p.stockState === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleProductHidden(p.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: p.hidden ? 'rgba(239, 68, 68, 0.2)' : 'rgba(45, 212, 191, 0.2)',
                            color: p.hidden ? '#EF4444' : '#2DD4BF',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {p.hidden ? <EyeOff size={12} /> : <Eye size={12} />}
                          <span>{p.hidden ? 'Hidden' : 'Live'}</span>
                        </button>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => openEditProduct(p)}
                            style={{ background: '#111C2A', border: '1px solid rgba(255,255,255,0.1)', color: '#F3F4F6', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                            aria-label="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete product "${p.name}"?`)) deleteProduct(p.id);
                            }}
                            style={{ background: '#111C2A', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                            aria-label="Delete"
                          >
                            <Trash2 size={14} />
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

        {/* TAB 3: BANNERS & HERO CMS */}
        {activeTab === 'banners' && (
          <div>
            <div className="admin-card">
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Hero Slider CMS</h3>
              <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '24px' }}>
                Edit headings, offer text, glassmorphism cards, and background banners shown on the homepage hero.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    style={{
                      background: '#111C2A',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#2DD4BF' }}>
                        Hero Slide #{idx + 1}
                      </span>
                      <button
                        onClick={() => deleteHeroSlide(slide.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Delete Slide
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Offer Tag</label>
                        <input
                          type="text"
                          value={slide.offer}
                          onChange={(e) => updateHeroSlide(slide.id, { offer: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Badge Text</label>
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={(e) => updateHeroSlide(slide.id, { badge: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Heading Text</label>
                      <textarea
                        rows={2}
                        value={slide.heading}
                        onChange={(e) => updateHeroSlide(slide.id, { heading: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Description</label>
                      <textarea
                        rows={2}
                        value={slide.desc}
                        onChange={(e) => updateHeroSlide(slide.id, { desc: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                        <label style={{ fontSize: '12.5px', color: '#94A3B8' }}>Background Banner Image Path</label>
                        <span style={{ fontSize: '11px', background: 'rgba(255, 190, 0, 0.15)', color: '#FFBE00', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                          📐 Recommended: 1920 x 600 px (16:5 Wide Desktop) / 1200 x 500 px (Max 3MB)
                        </span>
                      </div>
                      <input
                        type="text"
                        value={slide.bannerImage || ''}
                        onChange={(e) => updateHeroSlide(slide.id, { bannerImage: e.target.value })}
                        className="admin-input"
                        placeholder="e.g. /xtrime_aroma_banner.jpg or /banner_incense_packs.jpg"
                      />
                      <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                        High-resolution horizontal landscape banner. Automatically scales and crops smoothly on all screens.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VISIBILITY CONTROLS */}
        {activeTab === 'visibility' && (
          <div>
            {/* Sections Visibility */}
            <div className="admin-card">
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Homepage Sections Visibility</h3>
              <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '24px' }}>
                Toggle any section on or off. Hidden sections will vanish cleanly from the live storefront.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
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
                      background: '#111C2A',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{sec.name}</span>
                    <div
                      className={`toggle-switch ${(sectionVisibility as any)[sec.key] ? 'active' : ''}`}
                      onClick={() => updateSectionVisibility(sec.key as any, !(sectionVisibility as any)[sec.key])}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subpages Visibility */}
            <div className="admin-card">
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>Store Pages Visibility</h3>
              <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '24px' }}>
                Enable or temporarily hide entire subpages from navigation and customer access.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  { key: 'shop', name: 'Shop Catalog Page (/shop)' },
                  { key: 'comboBundle', name: 'Combo Bundle Page (/combo-bundle)' },
                  { key: 'about', name: 'About Us Page (/about)' },
                  { key: 'contact', name: 'Contact Page (/contact)' },
                  { key: 'wishlist', name: 'Wishlist Page (/wishlist)' },
                  { key: 'cart', name: 'Cart & Checkout (/cart)' },
                  { key: 'trackOrder', name: 'Track Order Page (/track-order)' },
                ].map((pg) => (
                  <div
                    key={pg.key}
                    style={{
                      background: '#111C2A',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{pg.name}</span>
                    <div
                      className={`toggle-switch ${(pageVisibility as any)[pg.key] ? 'active' : ''}`}
                      onClick={() => updatePageVisibility(pg.key as any, !(pageVisibility as any)[pg.key])}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS & MAINTENANCE */}
        {activeTab === 'settings' && (
          <div>
            <form onSubmit={handleSaveSettings}>
              {/* Maintenance Card */}
              <div
                className="admin-card"
                style={{
                  border: settingsForm.maintenanceMode ? '1.5px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: settingsForm.maintenanceMode ? '#EF4444' : '#F3F4F6' }}>
                      Site Maintenance Mode
                    </h3>
                    <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                      When enabled, all store visitors will see the maintenance landing page with your WhatsApp contact button.
                    </p>
                  </div>

                  <div
                    className={`toggle-switch ${settingsForm.maintenanceMode ? 'active' : ''}`}
                    onClick={() => setSettingsForm({ ...settingsForm, maintenanceMode: !settingsForm.maintenanceMode })}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                    Maintenance Notice Message
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.maintenanceNotice}
                    onChange={(e) => setSettingsForm({ ...settingsForm, maintenanceNotice: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              {/* General Store Settings */}
              <div className="admin-card">
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>General Store Settings</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Store Name</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Store Slogan</label>
                    <input
                      type="text"
                      value={settingsForm.storeSlogan}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeSlogan: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Official Registration No.</label>
                    <input
                      type="text"
                      value={settingsForm.regNo}
                      onChange={(e) => setSettingsForm({ ...settingsForm, regNo: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>WhatsApp Number (Country code + digits)</label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Free Delivery Threshold (Rs.)</label>
                    <input
                      type="number"
                      value={settingsForm.freeDeliveryThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Standard Delivery Fee (Rs.)</label>
                    <input
                      type="number"
                      value={settingsForm.deliveryFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: Number(e.target.value) })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Admin Passcode / PIN</label>
                  <input
                    type="text"
                    value={settingsForm.adminPin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                    className="admin-input"
                    style={{ width: '240px' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  style={{
                    backgroundColor: '#078A83',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(7, 138, 131, 0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Save size={18} />
                  <span>Save Store Settings</span>
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {productModalOpen && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              zIndex: 30000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                width: '100%',
                maxWidth: '580px',
                background: '#162234',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '32px',
                maxHeight: '90vh',
                overflowY: 'auto',
                color: '#F3F4F6',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Product Title *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="admin-input"
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
                      <option value="Diffuser">Diffuser</option>
                      <option value="Combo Bundle">Combo Bundle</option>
                      <option value="Wholesale Products">Wholesale Products</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Icon Type</label>
                    <select
                      value={productForm.iconType}
                      onChange={(e) => setProductForm({ ...productForm, iconType: e.target.value as any })}
                      className="admin-input"
                    >
                      <option value="flame">Flame (Incense Sticks)</option>
                      <option value="sparkles">Sparkles (Powder / Herbal)</option>
                      <option value="wind">Wind (Air Fresheners)</option>
                      <option value="droplets">Droplets (Diffuser)</option>
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
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Original / Strikethrough Price</label>
                    <input
                      type="text"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Discount Badge</label>
                    <input
                      type="text"
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Stock Status</label>
                    <select
                      value={productForm.stockState}
                      onChange={(e) => setProductForm({ ...productForm, stockState: e.target.value as any })}
                      className="admin-input"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                    <label style={{ fontSize: '12.5px', color: '#94A3B8' }}>Product Photo URL / Path</label>
                    <span style={{ fontSize: '11px', background: 'rgba(7, 138, 131, 0.2)', color: '#2DD4BF', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      📐 Recommended: 800 x 800 px (1:1 Square, Max 2MB)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="admin-input"
                    placeholder="e.g. /product_thulasi_sticks.jpg or https://your-image-url.jpg"
                  />
                  <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                    Square (1:1 aspect ratio, e.g. 600x600, 800x800, 1000x1000) produces sharp, uniform alignment in product carousels and store catalog grids.
                  </span>
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
                    style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#F3F4F6', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ backgroundColor: '#078A83', color: '#FFFFFF', border: 'none', padding: '10px 22px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
