'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  Truck,
  PackageCheck,
  CircleDollarSign,
  Headphones,
  ChevronUp,
  Mail,
  ArrowUpRight,
  Flame,
  Sparkles,
  Wind,
  Droplets,
  MessageCircle,
  ShieldCheck,
  Award,
} from 'lucide-react';
import {
  AnimatedSection,
  AnimatedGrid,
  fadeUpVariant,
  categoryHoverProps,
  buttonHoverProps,
  ToastContainer,
  EASE_ULTRA_SMOOTH,
} from '../components/animations';
import { useStore, Product } from '../context/store-context';
import { TopBar } from '../components/top-bar';
import { Header } from '../components/header';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { CartDrawer } from '../components/cart-drawer';
import { QuickViewModal, QuickViewProduct } from '../components/quick-view-modal';
import { MaintenanceScreen } from '../components/maintenance-screen';
import { ProductCard } from '../components/product-card';
import { ProductSliderSection } from '../components/product-slider-section';
import { HeroBannerSlider } from '../components/hero-banner-slider';

const BENEFIT_CARDS = [
  {
    id: 1,
    icon: Truck,
    title: 'Free Shipping',
    description: 'Enjoy the convenience of free doorstep delivery on qualifying orders',
  },
  {
    id: 2,
    icon: Headphones,
    title: '24/7 Live Support',
    description: 'Round-the-clock customer assistance & order support on WhatsApp',
  },
  {
    id: 3,
    icon: PackageCheck,
    title: 'Cash on Delivery',
    description: 'Pay cash conveniently upon doorstep courier delivery islandwide',
  },
  {
    id: 4,
    icon: CircleDollarSign,
    title: 'Secure Payment',
    description: 'Safe and authentic herbal products backed by 100% satisfaction guarantee',
  },
];

const CATEGORIES_DATA = [
  { id: 1, name: 'Incense Sticks Packs', displayName: 'Incense Sticks Packs', iconType: 'flame' as const },
  { id: 2, name: 'Incense Powder Packs', displayName: 'Incense Powder Packs', iconType: 'sparkles' as const },
  { id: 3, name: 'Air Fresheners', displayName: 'Air Fresheners', iconType: 'wind' as const },
  { id: 4, name: 'Diffuser', displayName: 'Diffusers', iconType: 'droplets' as const },
  { id: 5, name: 'Wholesale Products', displayName: 'Wholesale & Bulk', iconType: 'sparkles' as const },
];

const FILTER_CATEGORIES = [
  'All Products',
  'Incense Sticks Packs',
  'Incense Powder Packs',
  'Air Fresheners',
  'Diffuser',
  'Wholesale Products',
];

export default function Home() {
  const {
    products,
    benefits,
    sectionVisibility,
    settings,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toasts,
    showToast,
  } = useStore();

  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Products');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Real-time countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 122,
    hours: 22,
    minutes: 1,
    seconds: 7,
  });

  // Lenis Smooth Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener for Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (settings.maintenanceMode) {
    return <MaintenanceScreen />;
  }

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      showToast('Subscribed to EECO AROMATICS updates!');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    } else {
      showToast('Please enter a valid email.');
    }
  };

  const getProductIcon = (type: Product['iconType']) => {
    switch (type) {
      case 'flame':
        return <Flame size={36} color="#059669" />;
      case 'sparkles':
        return <Sparkles size={36} color="#E11D48" />;
      case 'wind':
        return <Wind size={36} color="#1A56DB" />;
      case 'droplets':
        return <Droplets size={36} color="#A855F7" />;
      default:
        return <Sparkles size={36} color="#1A56DB" />;
    }
  };

  const visibleProducts = products.filter((p) => !p.hidden);

  const filteredOurProducts = visibleProducts.filter((p) => {
    return activeFilter === 'All Products' || p.category === activeFilter;
  });

  const wholesaleProductsList = visibleProducts.filter(
    (p) => p.category === 'Wholesale Products' || p.storeCategory === 'Wholesale Products'
  );

  const displayWholesaleProducts =
    wholesaleProductsList.length > 0
      ? wholesaleProductsList
      : visibleProducts;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer toasts={toasts} onDismiss={() => {}} />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? isInWishlist(quickViewProduct.id) : false}
      />

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Header */}
      <Header onOpenCart={() => setCartOpen(true)} />

      {/* Persistent Sticky Navigation */}
      <Navigation />

      {/* ================= 4. FULL-WIDTH HERO BANNER SLIDER ================= */}
      {sectionVisibility.hero && (
        <section aria-label="Featured Promotional Banners">
          <HeroBannerSlider autoPlayInterval={3500} />
        </section>
      )}

      {/* ================= 5. SERVICE BENEFITS SECTION ================= */}
      {sectionVisibility.benefits && (
        <AnimatedSection className="benefits-section-wrap layout-max-width">
          <AnimatedGrid className="benefits-grid">
            {benefits.map((card) => {
              let IconComponent = ShieldCheck;
              if (card.icon === 'Truck') IconComponent = Truck;
              else if (card.icon === 'Headphones') IconComponent = Headphones;
              else if (card.icon === 'PackageCheck') IconComponent = PackageCheck;
              else if (card.icon === 'Award') IconComponent = Award;

              return (
                <motion.div
                  className="benefit-card-spec"
                  key={card.id}
                  variants={fadeUpVariant}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="benefit-icon-container">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="benefit-card-title">{card.title}</h3>
                  <p className="benefit-card-desc">{card.description}</p>
                </motion.div>
              );
            })}
          </AnimatedGrid>
        </AnimatedSection>
      )}

      {/* ================= 6. ALL PRODUCTS GRID ================= */}
      {sectionVisibility.dailyDiscount && (
        <section className="daily-discount-wrap layout-max-width" aria-label="Explore Fragrances">
          <h2 className="discount-heading-text">Explore All Fragrances</h2>
          <AnimatedGrid className="daily-discount-grid">
            {visibleProducts.slice(0, 12).map((product) => (
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
        </section>
      )}

      {/* ================= 7. BEST SELLING PRODUCTS (Golden Amber Logo Theme) ================= */}
      {sectionVisibility.bestSelling && (
        <AnimatedSection className="bestselling-section-wrap layout-max-width">
          <div className="bestselling-inner-box">
            <div className="bestselling-header-cutout">
              <h2>Best Selling Products</h2>
              <p>Top customer picks &amp; value bundles</p>
            </div>

            <ProductSliderSection
              title="Best Selling Products"
              subtitle="Sri Lanka's highest-rated aromatic sticks & diffusers"
              viewAllLink="/shop"
              products={visibleProducts}
              isWishlisted={isInWishlist}
              onToggleWishlist={toggleWishlist}
              onQuickView={openQuickView}
              onAddToCart={addToCart}
              className="bestselling-slider-inner"
              autoPlayInterval={3500}
            />
          </div>
        </AnimatedSection>
      )}

      {/* ================= 8. SHOP BY CATEGORY SECTION ================= */}
      {sectionVisibility.categories && (
        <AnimatedSection className="shop-by-category-wrap layout-max-width">
          <div className="category-header-row">
            <div className="category-header-left">
              <h2>Shop by Category</h2>
              <p>Explore Sri Lankan crafted fragrance lines</p>
            </div>
            <Link
              href="/shop"
              style={{
                color: '#1A56DB',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>View Full Catalog</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <AnimatedGrid className="category-8x2-grid">
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  className="category-card-item"
                  variants={fadeUpVariant}
                  {...categoryHoverProps}
                >
                  <div className="category-card-img-box">
                    {getProductIcon(cat.iconType)}
                    <span style={{ fontSize: '11px', color: '#1A56DB', fontWeight: 700 }}>
                      EECO LINE
                    </span>
                  </div>
                  <span className="category-card-title">{cat.displayName}</span>
                </motion.div>
              </Link>
            ))}
          </AnimatedGrid>
        </AnimatedSection>
      )}

      {/* ================= 10. OUR PRODUCTS CATALOG SECTION (3s Auto-Shuffle Carousel) ================= */}
      {sectionVisibility.ourProducts && (
        <ProductSliderSection
          title="Our Products"
          subtitle="Explore all categories & pure fragrances"
          viewAllLink="/shop"
          products={filteredOurProducts}
          isWishlisted={isInWishlist}
          onToggleWishlist={toggleWishlist}
          onQuickView={openQuickView}
          onAddToCart={addToCart}
          autoPlayInterval={3000}
          headerChildren={
            <div className="filter-pills-row" style={{ flexWrap: 'wrap', gap: '8px' }}>
              {FILTER_CATEGORIES.map((filter) => (
                <motion.button
                  key={filter}
                  className={`filter-pill-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          }
        />
      )}

      {/* ================= 10B. WHOLESALE PRODUCTS SECTION ================= */}
      {sectionVisibility.wholesaleProducts !== false && (
        <AnimatedSection className="wholesale-section-wrap layout-max-width">
          <div className="wholesale-inner-box">
            <div className="wholesale-header-cutout">
              <h2>Wholesale Products</h2>
              <p>Up to 30% discount for bulk orders 🔥</p>
            </div>

            <ProductSliderSection
              title="Top Wholesale &amp; Bulk Deals"
              subtitle="Master cartons, commercial bundles and high profit margin packs"
              viewAllLink="/shop?category=Wholesale+Products"
              products={displayWholesaleProducts}
              isWishlisted={isInWishlist}
              onToggleWishlist={toggleWishlist}
              onQuickView={openQuickView}
              onAddToCart={addToCart}
              autoPlayInterval={3000}
              className="wholesale-slider-inner"
            />
          </div>
        </AnimatedSection>
      )}

      {/* ================= 11. PROMOTIONAL BANNERS ================= */}
      {sectionVisibility.promoBanners && (
        <AnimatedSection className="promo-banners-wrap layout-max-width">
          <Link href="/combo-bundle" style={{ textDecoration: 'none' }}>
            <motion.div
              className="promo-banner-card"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 65%, rgba(15, 23, 42, 0.25) 100%), url('/banner_incense_packs.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ duration: 0.25, ease: EASE_ULTRA_SMOOTH }}
            >
              <div className="promo-banner-content" style={{ width: '85%' }}>
                <span
                  style={{
                    background: '#D9003B',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '999px',
                  }}
                >
                  Rs. 1,300/- SUPER OFFER
                </span>
                <h3 style={{ color: '#FFFFFF', marginTop: '8px' }}>14-in-1 Incense Sticks</h3>
                <p style={{ color: '#E2E8F0' }}>
                  14 Fragrance varieties in 1 single pack! Pack 2 for Rs. 2,650/- + FREE Air
                  Freshener!
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFBE00',
                    fontWeight: 700,
                    fontSize: '13px',
                    marginTop: '10px',
                  }}
                >
                  <span>View Combo Offers</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/combo-bundle" style={{ textDecoration: 'none' }}>
            <motion.div
              className="promo-banner-card"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 65%, rgba(15, 23, 42, 0.25) 100%), url('/banner_cinnamon_dhoop.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ duration: 0.25, ease: EASE_ULTRA_SMOOTH }}
            >
              <div className="promo-banner-content" style={{ width: '85%' }}>
                <span
                  style={{
                    background: '#FFBE00',
                    color: '#111827',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '999px',
                  }}
                >
                  FROM Rs. 400/=
                </span>
                <h3 style={{ color: '#FFFFFF', marginTop: '8px' }}>Organic Cinnamon Dhoop</h3>
                <p style={{ color: '#E2E8F0' }}>
                  Pure natural Cinnamon Dhoop powder for home air purification (100g, 250g, 500g,
                  1kg).
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFBE00',
                    fontWeight: 700,
                    fontSize: '13px',
                    marginTop: '10px',
                  }}
                >
                  <span>View Combo Offers</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/combo-bundle" style={{ textDecoration: 'none' }}>
            <motion.div
              className="promo-banner-card"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 65%, rgba(15, 23, 42, 0.25) 100%), url('/banner_room_diffuser.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ duration: 0.25, ease: EASE_ULTRA_SMOOTH }}
            >
              <div className="promo-banner-content" style={{ width: '85%' }}>
                <span
                  style={{
                    background: '#9BE86A',
                    color: '#111827',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '999px',
                  }}
                >
                  Rs. 1,500/- SPECIAL
                </span>
                <h3 style={{ color: '#FFFFFF', marginTop: '8px' }}>Luxury Room Diffusers</h3>
                <p style={{ color: '#E2E8F0' }}>
                  Turn your space into a relaxing escape with 12 natural oil fragrance options!
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFBE00',
                    fontWeight: 700,
                    fontSize: '13px',
                    marginTop: '10px',
                  }}
                >
                  <span>View Combo Offers</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          </Link>
        </AnimatedSection>
      )}

      {/* ================= 13. HOT DEALS COUNTDOWN (With 3s Product Slider) ================= */}
      {sectionVisibility.hotDeals && (
        <AnimatedSection className="hotdeals-section-wrap layout-max-width">
          <div className="hotdeals-left-panel">
            <span className="hotdeals-eyebrow">Limited Time Offer</span>
            <h2 className="hotdeals-heading">Hot Deals This Week</h2>
            <p className="hotdeals-desc">
              Weekly deals bring fresh aromatic offers. Elevate your daily routine and home fragrance
              experience with limited-time savings.
            </p>

            <div className="countdown-timer-row">
              <div className="time-card-box">
                <span className="time-number">{String(timeLeft.days).padStart(3, '0')}</span>
                <span className="time-label">Days</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-card-box">
                <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="time-label">Hours</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-card-box">
                <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="time-label">Min</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-card-box">
                <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="time-label">Sec</span>
              </div>
            </div>

            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <motion.button className="btn-hotdeals-viewall" {...buttonHoverProps}>
                <span>Explore All Deals</span>
                <div className="hotdeals-arrow-circle">
                  <ArrowUpRight size={16} />
                </div>
              </motion.button>
            </Link>
          </div>

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <ProductSliderSection
              title="Featured Hot Deals"
              subtitle="Special discounts"
              viewAllLink="/shop"
              products={visibleProducts.slice(0, 8)}
              isWishlisted={isInWishlist}
              onToggleWishlist={toggleWishlist}
              onQuickView={openQuickView}
              onAddToCart={addToCart}
              autoPlayInterval={3000}
              desktopItemsPerView={4}
              className="hotdeals-slider-inner"
              containerStyle={{ margin: 0, padding: 0 }}
            />
          </div>
        </AnimatedSection>
      )}

      {/* ================= 15. NEWSLETTER SECTION ================= */}
      {sectionVisibility.newsletter && (
        <AnimatedSection className="newsletter-wrapper layout-max-width">
          <h2 className="newsletter-title">Subscribe to our newsletter</h2>
          <p className="newsletter-subtitle">
            Stay updated! Subscribe to our mailing list for news, fragrance launches, and exclusive offers.
          </p>
        </AnimatedSection>
      )}

      {/* Main Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
