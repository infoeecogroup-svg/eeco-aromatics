'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Search,
  Star,
  Heart,
  Eye,
  ShoppingCart,
  Truck,
  ArrowRight,
  Flame,
  Sparkles,
  Wind,
  Droplets,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore, Product } from '../../context/store-context';
import { TopBar } from '../../components/top-bar';
import { Header } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Footer } from '../../components/footer';
import { CartDrawer } from '../../components/cart-drawer';
import { QuickViewModal, QuickViewProduct } from '../../components/quick-view-modal';
import { AnimatedSection, AnimatedGrid, fadeUpVariant, cardHoverProps } from '../../components/animations';

import { ProductCard } from '../../components/product-card';

function ShopContent() {
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();
  const searchParams = useSearchParams();

  const initialCat = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [priceSort, setPriceSort] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const categories = [
    'All',
    'Incense Sticks Packs',
    'Incense Powder Packs',
    'Air Fresheners',
    'Diffuser',
    'Combo Bundle',
    'Wholesale Products',
  ];

  const parseRupees = (priceStr: string) => {
    const cleaned = priceStr.replace('Rs.', '').replace(',', '').trim();
    return parseFloat(cleaned) || 0;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.hidden) return false;
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const numPrice = parseRupees(p.price);
      const matchPrice = numPrice <= maxPrice;
      const matchStock = !inStockOnly || p.stockState === 'in_stock';
      return matchCat && matchSearch && matchPrice && matchStock;
    }).sort((a, b) => {
      const priceA = parseRupees(a.price);
      const priceB = parseRupees(b.price);
      if (priceSort === 'price-low') return priceA - priceB;
      if (priceSort === 'price-high') return priceB - priceA;
      if (priceSort === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, priceSort]);

  const openQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setQuickViewOpen(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? isInWishlist(quickViewProduct.id) : false}
      />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <TopBar />
      <Header onOpenCart={() => setCartOpen(true)} />
      <Navigation />

      <div className="shop-page-wrap layout-max-width">
        {/* Breadcrumbs */}
        <div className="shop-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span style={{ color: '#111827', fontWeight: 700 }}>Shop Fragrances</span>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <span style={{ color: '#1A56DB', fontWeight: 700 }}>{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="shop-layout-grid">
          {/* Sidebar Filter Panel */}
          <aside className="shop-sidebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Filter size={18} color="#1A56DB" />
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Filters</h2>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h3>Fragrance Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className={`category-filter-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>
                      ({cat === 'All' ? products.filter((p) => !p.hidden).length : products.filter((p) => !p.hidden && p.category === cat).length})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3>Max Price</h3>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#1A56DB' }}>
                  Rs. {maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={400}
                max={6000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1A56DB', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                <span>Rs. 400</span>
                <span>Rs. 6,000</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="filter-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#1A56DB' }}
                />
                <span>In-Stock Items Only</span>
              </label>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setMaxPrice(6000);
                setInStockOnly(false);
                setPriceSort('default');
              }}
              style={{
                width: '100%',
                backgroundColor: '#F3F4F6',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#4B5563',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Reset All Filters
            </button>
          </aside>

          {/* Main Product Catalog */}
          <section>
            {/* Top Toolbar */}
            <div className="shop-top-bar">
              <div className="shop-result-count">
                Showing <strong>{filteredProducts.length}</strong> genuine aromatic products
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>Sort by:</span>
                <select
                  className="shop-sort-select"
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                >
                  <option value="default">Featured / Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5E7EB' }}>
                <Sparkles size={48} color="#1A56DB" style={{ marginBottom: '16px', opacity: 0.4 }} />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>No matching products found</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>Try adjusting your search criteria or price range.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setMaxPrice(6000);
                    setInStockOnly(false);
                  }}
                  style={{
                    backgroundColor: '#1A56DB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  View All Products
                </button>
              </div>
            ) : (
              <AnimatedGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isInWishlist(product.id)}
                    onToggleWishlist={toggleWishlist}
                    onQuickView={openQuickView}
                    onAddToCart={addToCart}
                  />
                ))}
              </AnimatedGrid>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading Shop Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
