"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "./actions";
import { Category, CategorySlug, Product } from "@/lib/types";

export default function EditProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: Category[];
}) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [summary, setSummary] = useState(product.summary);
  const [description, setDescription] = useState(product.description);
  const [highlightsText, setHighlightsText] = useState(product.highlights.join("\n"));
  const [priceRange, setPriceRange] = useState(product.priceRange);
  const [searchKeyword, setSearchKeyword] = useState(product.searchKeyword);
  const [category, setCategory] = useState<CategorySlug>(product.category);
  const [emoji, setEmoji] = useState(product.emoji);
  const [asin, setAsin] = useState(product.asin ?? "");
  const [verifiedDiscountNote, setVerifiedDiscountNote] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    setSaved(false);

    const highlights = highlightsText
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const result = await updateProduct({
      slug: product.slug,
      category,
      emoji,
      priceRange,
      searchKeyword,
      asin: asin || undefined,
      verifiedDiscountNote: verifiedDiscountNote || undefined,
      name,
      brand,
      summary,
      description,
      highlights,
    });

    setSaving(false);

    if (!result.ok) {
      setSaveError(result.error ?? "Something went wrong.");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6">
      <Field label="Product name">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Category">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategorySlug)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Emoji (visual placeholder)">
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          className="w-24 rounded-lg border border-neutral-300 px-3 py-2 text-center text-lg"
        />
      </Field>

      <Field label="Brand">
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Price range">
        <input
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Summary">
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Highlights (one per line)">
        <textarea
          value={highlightsText}
          onChange={(e) => setHighlightsText(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Amazon search keyword (used only if no ASIN is set below)">
        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      <Field label="Amazon ASIN (links straight to the product page instead of a search)">
        <input
          value={asin}
          onChange={(e) => setAsin(e.target.value.toUpperCase())}
          placeholder="e.g. B0D7J4T14L"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm font-mono"
        />
      </Field>

      <Field label="Verified discount note (optional — only enter something you've personally confirmed is currently accurate)">
        <input
          value={verifiedDiscountNote}
          onChange={(e) => setVerifiedDiscountNote(e.target.value)}
          placeholder='e.g. "Was $29.99, now $19.99 as of Jul 6"'
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
      </Field>

      {saveError && <p className="text-sm text-red-600">{saveError}</p>}
      {saved && <p className="text-sm text-green-600">Saved — live within a few seconds.</p>}

      <button
        onClick={handleSave}
        disabled={saving || !name || !summary}
        className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
