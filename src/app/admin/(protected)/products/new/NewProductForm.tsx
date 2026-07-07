"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAmazonPreview,
  createProduct,
  generateProductImage,
  extractFromPageText,
  extractFromImages,
} from "./actions";
import { slugify } from "@/lib/slugify";
import { Category, CategorySlug } from "@/lib/types";

export default function NewProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();

  const [rawInput, setRawInput] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchNote, setFetchNote] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const [pageText, setPageText] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractNote, setExtractNote] = useState<string | null>(null);

  const [infoImages, setInfoImages] = useState<File[]>([]);
  const [extractingImages, setExtractingImages] = useState(false);
  const [imageExtractNote, setImageExtractNote] = useState<string | null>(null);

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

  async function handleExtractFromText() {
    if (!pageText.trim()) return;
    setExtracting(true);
    setExtractNote(null);

    const result = await extractFromPageText(pageText);
    setExtracting(false);

    let found = 0;
    if (result.asin) {
      setAsin(result.asin);
      setAmazonUrl((prev) => prev || `https://www.amazon.com/dp/${result.asin}`);
      found++;
    }
    if (result.title) {
      handleNameChange(result.title);
      setSearchKeyword((prev) => prev || result.title || "");
      found++;
    }
    if (result.brand) {
      setBrand(result.brand);
      found++;
    }
    if (result.priceText) {
      setPriceRange(result.priceText);
      found++;
    }
    if (result.highlights.length > 0) {
      setHighlightsText(result.highlights.join("\n"));
      found++;
    }
    if (result.summary) {
      setSummary(result.summary);
      found++;
    }
    if (result.description) {
      setDescription(result.description);
      found++;
    }

    setExtractNote(
      found > 0
        ? `Extracted ${found} field(s) from the pasted text — review everything below before saving.`
        : "Couldn't find recognizable product info in that text — try pasting more of the page, or fill in fields manually.",
    );
    setRevealed(true);
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleExtractFromImages() {
    if (infoImages.length === 0) return;
    setExtractingImages(true);
    setImageExtractNote(null);

    const images = await Promise.all(
      infoImages.map(async (file) => ({
        data: await fileToBase64(file),
        mimeType: file.type || "image/jpeg",
      })),
    );

    const result = await extractFromImages(images);
    setExtractingImages(false);

    if (!result.ok || !result.text) {
      setImageExtractNote(result.error ?? "Couldn't read any product info from those images.");
      return;
    }

    setHighlightsText((prev) => (prev ? `${prev}\n${result.text}` : (result.text ?? "")));
    setImageExtractNote("Extracted text appended to Highlights below — review and trim before saving.");
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

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <label className="text-sm font-medium text-neutral-700">
          Or: paste the full product page text
        </label>
        <p className="mt-1 text-xs text-neutral-500">
          Open the product on Amazon like normal, select all (Ctrl/Cmd+A), copy, and paste the whole
          page below. Nothing is fetched from Amazon here — this only reads text you already copied
          yourself.
        </p>
        <textarea
          value={pageText}
          onChange={(e) => setPageText(e.target.value)}
          rows={4}
          placeholder="Paste the copied page text here…"
          className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
        <button
          onClick={handleExtractFromText}
          disabled={extracting || !pageText.trim()}
          className="mt-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {extracting ? "Extracting…" : "Extract from pasted text"}
        </button>
        {extractNote && <p className="mt-2 text-sm text-neutral-500">{extractNote}</p>}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm font-medium text-neutral-700">Or: upload infographic / spec images</p>
        <p className="mt-1 text-xs text-neutral-500">
          Save the nutrition facts, spec sheet, ingredient list, or size-chart images from
          the Amazon page to your device (right-click → save, or a screenshot), then upload
          them here. The images are only used to read the text off them — they&apos;re never
          stored or shown on the site.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-50">
            Choose images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setInfoImages(Array.from(e.target.files ?? []))}
              className="hidden"
            />
          </label>
          <span className="text-sm text-neutral-500">
            {infoImages.length > 0 ? `${infoImages.length} image(s) selected` : "No images selected"}
          </span>
        </div>
        <button
          onClick={handleExtractFromImages}
          disabled={extractingImages || infoImages.length === 0}
          className="mt-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {extractingImages ? "Reading images…" : "Extract info from images"}
        </button>
        {imageExtractNote && <p className="mt-2 text-sm text-neutral-500">{imageExtractNote}</p>}
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
