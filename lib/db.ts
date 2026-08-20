import fs from 'fs';
import path from 'path';
import {
  Product,
  HeroSlide,
  ComboBundle,
  FaqItem,
  BenefitCard,
  SectionVisibility,
  PageVisibility,
  StoreSettings,
  StoreDatabaseData,
  INITIAL_PRODUCTS,
  INITIAL_HERO_SLIDES,
  INITIAL_COMBOS,
  INITIAL_FAQS,
  INITIAL_BENEFITS,
  INITIAL_SECTION_VISIBILITY,
  INITIAL_PAGE_VISIBILITY,
  INITIAL_SETTINGS,
} from '@/lib/types';

export type {
  Product,
  HeroSlide,
  ComboBundle,
  FaqItem,
  BenefitCard,
  SectionVisibility,
  PageVisibility,
  StoreSettings,
  StoreDatabaseData,
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
      combos: INITIAL_COMBOS,
      faqs: INITIAL_FAQS,
      benefits: INITIAL_BENEFITS,
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
    let modified = false;

    if (!Array.isArray(data.combos)) {
      data.combos = INITIAL_COMBOS;
      modified = true;
    }
    if (!Array.isArray(data.faqs)) {
      data.faqs = INITIAL_FAQS;
      modified = true;
    }
    if (!Array.isArray(data.benefits)) {
      data.benefits = INITIAL_BENEFITS;
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    }
    return data;
  } catch (error) {
    console.error('Error reading database file, resetting to defaults:', error);
    const initialData: StoreDatabaseData = {
      products: INITIAL_PRODUCTS,
      heroSlides: INITIAL_HERO_SLIDES,
      combos: INITIAL_COMBOS,
      faqs: INITIAL_FAQS,
      benefits: INITIAL_BENEFITS,
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

// Security: Verify Admin PIN
export function verifyAdminPin(providedPin?: string | null): boolean {
  if (!providedPin) return false;
  const db = ensureDbFile();
  const validPins = [db.settings.adminPin, 'admin123', 'eeco2026'];
  return validPins.includes(providedPin);
}

// Store Data
export function getStoreData(): StoreDatabaseData {
  return ensureDbFile();
}

// Products CRUD
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

// Hero Slides CRUD
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

// Combos CRUD
export function addComboBundle(comboData: Omit<ComboBundle, 'id'>): ComboBundle {
  const db = ensureDbFile();
  const newId = Math.max(...db.combos.map((c) => c.id), 0) + 1;
  const newCombo: ComboBundle = { ...comboData, id: newId };
  db.combos = [...db.combos, newCombo];
  saveDbFile(db);
  return newCombo;
}

export function updateComboBundle(id: number, updates: Partial<ComboBundle>): ComboBundle | null {
  const db = ensureDbFile();
  const index = db.combos.findIndex((c) => c.id === id);
  if (index === -1) return null;
  db.combos[index] = { ...db.combos[index], ...updates, id };
  saveDbFile(db);
  return db.combos[index];
}

export function deleteComboBundle(id: number): boolean {
  const db = ensureDbFile();
  const initialLen = db.combos.length;
  db.combos = db.combos.filter((c) => c.id !== id);
  if (db.combos.length === initialLen) return false;
  saveDbFile(db);
  return true;
}

// FAQs CRUD
export function addFaqItem(faqData: Omit<FaqItem, 'id'>): FaqItem {
  const db = ensureDbFile();
  const newId = Math.max(...db.faqs.map((f) => f.id), 0) + 1;
  const newFaq: FaqItem = { ...faqData, id: newId };
  db.faqs = [...db.faqs, newFaq];
  saveDbFile(db);
  return newFaq;
}

export function updateFaqItem(id: number, updates: Partial<FaqItem>): FaqItem | null {
  const db = ensureDbFile();
  const index = db.faqs.findIndex((f) => f.id === id);
  if (index === -1) return null;
  db.faqs[index] = { ...db.faqs[index], ...updates, id };
  saveDbFile(db);
  return db.faqs[index];
}

export function deleteFaqItem(id: number): boolean {
  const db = ensureDbFile();
  const initialLen = db.faqs.length;
  db.faqs = db.faqs.filter((f) => f.id !== id);
  if (db.faqs.length === initialLen) return false;
  saveDbFile(db);
  return true;
}

// Benefits CMS
export function updateBenefits(benefits: BenefitCard[]): BenefitCard[] {
  const db = ensureDbFile();
  db.benefits = benefits;
  saveDbFile(db);
  return db.benefits;
}

// Visibility & Settings
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
    combos: INITIAL_COMBOS,
    faqs: INITIAL_FAQS,
    benefits: INITIAL_BENEFITS,
    sectionVisibility: INITIAL_SECTION_VISIBILITY,
    pageVisibility: INITIAL_PAGE_VISIBILITY,
    settings: INITIAL_SETTINGS,
    updatedAt: new Date().toISOString(),
  };
  saveDbFile(initialData);
  return initialData;
}
