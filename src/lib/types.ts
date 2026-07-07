export type CategorySlug = "korean-food" | "k-beauty" | "baby-kids" | "ipx-goods";

export interface CategoryBase {
  slug: CategorySlug;
  shortName: string;
  emoji: string;
  gradient: string;
}

export interface CategoryContent {
  name: string;
  description: string;
}

export type Category = CategoryBase & CategoryContent;

export interface ProductBase {
  slug: string;
  category: CategorySlug;
  emoji: string;
  priceRange: string;
  searchKeyword: string;
  asin?: string;
}

export interface ProductContent {
  name: string;
  brand: string;
  summary: string;
  description: string;
  highlights: string[];
}

export type Product = ProductBase & ProductContent;

export interface PostBase {
  slug: string;
  category: CategorySlug;
  publishedAt: string;
  readMinutes: number;
  coverEmoji: string;
  productSlugs: string[];
}

export interface PostContent {
  title: string;
  excerpt: string;
  body: string[];
}

export type Post = PostBase & PostContent;
