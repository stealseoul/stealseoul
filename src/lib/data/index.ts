import { Locale } from "@/i18n/locales";
import { categoryBases, productBases, postBases } from "./base";
import { Category, Product, Post, CategorySlug } from "@/lib/types";
import { getAdminProducts } from "./admin-products";

import * as en from "./content/en";
import * as ko from "./content/ko";
import * as es from "./content/es";
import * as zh from "./content/zh";
import * as ja from "./content/ja";

const contentByLocale = { en, ko, es, zh, ja } as const;

function getContent(locale: Locale) {
  return contentByLocale[locale] ?? contentByLocale.en;
}

export function getCategories(locale: Locale): Category[] {
  const content = getContent(locale);
  return categoryBases.map((base) => ({
    ...base,
    ...(content.categories[base.slug] ?? en.categories[base.slug]),
  }));
}

export function getCategory(locale: Locale, slug: string): Category | undefined {
  const base = categoryBases.find((c) => c.slug === slug);
  if (!base) return undefined;
  const content = getContent(locale);
  const categoryContent = content.categories[base.slug] ?? en.categories[base.slug];
  if (!categoryContent) return undefined;
  return { ...base, ...categoryContent };
}

// Static products (base.ts + content/*.ts) merged with admin-managed products
// from Supabase. A Supabase row reusing an existing static slug is an edit
// that wins; a Supabase row with a new slug is an addition. Supabase itself
// degrades to [] whenever it isn't configured yet — see ./supabase.ts.
async function getMergedProducts(locale: Locale): Promise<Product[]> {
  const content = getContent(locale);
  const staticProducts = productBases.map((base) => ({
    ...base,
    ...(content.products[base.slug] ?? en.products[base.slug]),
  }));
  const adminProducts = await getAdminProducts(locale);

  const bySlug = new Map<string, Product>();
  for (const product of staticProducts) bySlug.set(product.slug, product);
  for (const product of adminProducts) bySlug.set(product.slug, product);
  return Array.from(bySlug.values());
}

export async function getProducts(locale: Locale): Promise<Product[]> {
  return getMergedProducts(locale);
}

export async function getProduct(locale: Locale, slug: string): Promise<Product | undefined> {
  const products = await getMergedProducts(locale);
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(
  locale: Locale,
  category: CategorySlug | string,
): Promise<Product[]> {
  const products = await getMergedProducts(locale);
  return products.filter((p) => p.category === category);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const adminProducts = await getAdminProducts("en");
  const slugs = new Set(productBases.map((p) => p.slug));
  adminProducts.forEach((p) => slugs.add(p.slug));
  return Array.from(slugs);
}

export function getPosts(locale: Locale): Post[] {
  const content = getContent(locale);
  return postBases.map((base) => ({
    ...base,
    ...(content.posts[base.slug] ?? en.posts[base.slug]),
  }));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  const base = postBases.find((p) => p.slug === slug);
  if (!base) return undefined;
  const content = getContent(locale);
  const postContent = content.posts[base.slug] ?? en.posts[base.slug];
  if (!postContent) return undefined;
  return { ...base, ...postContent };
}

export function getPostsByCategory(locale: Locale, category: CategorySlug | string): Post[] {
  const content = getContent(locale);
  return postBases
    .filter((p) => p.category === category)
    .map((base) => ({ ...base, ...(content.posts[base.slug] ?? en.posts[base.slug]) }));
}

export function getAllCategorySlugs() {
  return categoryBases.map((c) => c.slug);
}

export function getAllPostSlugs() {
  return postBases.map((p) => p.slug);
}
