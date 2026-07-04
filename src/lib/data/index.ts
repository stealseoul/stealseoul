import { Locale } from "@/i18n/locales";
import { categoryBases, productBases, postBases } from "./base";
import { Category, Product, Post, CategorySlug } from "@/lib/types";

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
  return categoryBases.map((base) => ({ ...base, ...content.categories[base.slug] }));
}

export function getCategory(locale: Locale, slug: string): Category | undefined {
  const base = categoryBases.find((c) => c.slug === slug);
  if (!base) return undefined;
  const content = getContent(locale);
  return { ...base, ...content.categories[base.slug] };
}

export function getProducts(locale: Locale): Product[] {
  const content = getContent(locale);
  return productBases.map((base) => ({ ...base, ...content.products[base.slug] }));
}

export function getProduct(locale: Locale, slug: string): Product | undefined {
  const base = productBases.find((p) => p.slug === slug);
  if (!base) return undefined;
  const content = getContent(locale);
  const productContent = content.products[base.slug];
  if (!productContent) return undefined;
  return { ...base, ...productContent };
}

export function getProductsByCategory(locale: Locale, category: CategorySlug | string): Product[] {
  const content = getContent(locale);
  return productBases
    .filter((p) => p.category === category)
    .map((base) => ({ ...base, ...content.products[base.slug] }));
}

export function getPosts(locale: Locale): Post[] {
  const content = getContent(locale);
  return postBases.map((base) => ({ ...base, ...content.posts[base.slug] }));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  const base = postBases.find((p) => p.slug === slug);
  if (!base) return undefined;
  const content = getContent(locale);
  const postContent = content.posts[base.slug];
  if (!postContent) return undefined;
  return { ...base, ...postContent };
}

export function getPostsByCategory(locale: Locale, category: CategorySlug | string): Post[] {
  const content = getContent(locale);
  return postBases
    .filter((p) => p.category === category)
    .map((base) => ({ ...base, ...content.posts[base.slug] }));
}

export function getAllCategorySlugs() {
  return categoryBases.map((c) => c.slug);
}

export function getAllProductSlugs() {
  return productBases.map((p) => p.slug);
}

export function getAllPostSlugs() {
  return postBases.map((p) => p.slug);
}
