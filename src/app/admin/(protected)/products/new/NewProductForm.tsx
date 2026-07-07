"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAmazonPreview, createProduct, generateProductImage } from "./actions";
import { slugify } from "@/lib/slugify";
import { Category, CategorySlug } from "@/lib/types";

export default function NewProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();

  const [rawInput, setRawInput] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchNote, setFetchNote] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const [asin, setAsin] = useState("");
  const [amazonUrl, setAmazonUrl] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [brand, setBrand] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState<CategorySlug>(categories[0]?.slug ?? "korean-food");
  const [emoji, setEmoji] = useState("📦");
  const [verifiedDiscountNote, setVerifiedDiscountNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleGenerateImage() {
    setGeneratingImage(true);
    setImageError(null);
    const result = await generateProductImage(slug, name, summary);
    setGeneratingImage(false);
    if (!result.ok || !result.url) {
      setImageError(result.error ?? "Image generation failed.");
      return;
    }
    setImageUrl(result.url);
  }

  async function handleFetchPreview() {
    if (!rawInput.trim()) return;
    setFetching(true);
    setFetchNote(null);
    const result = await fetchAmazonPreview(rawInput);
    setFetching(false);

    if ("error" in result) {
      setFetchNote(result.error);
      return;
    }

    setAsin(result.asin);
    setAmazonUrl(result.sourceUrl);
    setSearchKeyword((prev) => prev || result.keywords || result.title || "");

    if (result.ok) {
      setName(result.title ?? "");
      setDescription(result.description ?? "");
      setPriceRange(result.priceText ? `${result.priceText}` : "");
      setFetchNote("Auto-filled from the product page — review every field before saving.");
    } else {
      setFetchNote("Couldn't auto-fetch details (Amazon likely blocked the request) — enter everything manually below.");
    }

    setRevealed(true);
  }

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);

    const highlights = highlightsText
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const result = await createProduct({
      slug,
      category,
      emoji,
      priceRange,
      searchKeyword: searchKeyword || name,
      asin: asin || undefined,
      amazonUrl: amazonUrl || undefined,
      imageUrl: imageUrl || undefined,
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

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="text-sm font-medium text-neutral-700">Amazon ASIN or product link</label>
        <div className="mt-2 flex gap-2">
          <input
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="B0XXXXXXX or https://www.amazon.com/dp/B0XXXXXXX"
            className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm"
          />
          <button
            onClick={handleFetchPreview}
            disabled={fetching || !rawInput.trim()}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {fetching ? "Fetching…" : "Fetch preview"}
          </button>
        </div>
        {fetchNote && <p className="mt-2 text-sm text-neutral-500">{fetchNote}</p>}
      </div>

      {revealed && (
        <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-medium text-orange-600">
            Review and edit every field — nothing is saved until you click &quot;Save product&quot; below.
          </p>

          <Field label="Product name">
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Slug (URL path)">
            <input
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugTouched(true);
              }}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm font-mono"
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

          <Field label="Lifestyle image (AI-generated — never a real Amazon photo)">
            <div className="flex items-start gap-4">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className="h-24 w-24 rounded-lg object-cover" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-neutral-100 text-3xl">
                  {emoji}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleGenerateImage}
                  disabled={generatingImage || !name || !summary}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50"
                >
                  {generatingImage ? "Generating…" : imageUrl ? "Regenerate image" : "Generate lifestyle image"}
                </button>
                <p className="text-xs text-neutral-400">Needs a name and summary filled in first.</p>
                {imageError && <p className="text-xs text-red-600">{imageError}</p>}
              </div>
            </div>
          </Field>

          <Field label="Brand">
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Price range (e.g. $15 – $25)">
            <input
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Summary (one sentence)">
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

          <Field label="Amazon search keyword (used to build the outbound link)">
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
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

          <button
            onClick={handleSave}
            disabled={saving || !slug || !name || !summary}
            className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save product"}
          </button>
        </div>
      )}
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
