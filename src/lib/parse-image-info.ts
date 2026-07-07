import { GoogleGenAI } from "@google/genai";

// Reads factual text (nutrition panels, spec sheets, ingredient lists, size
// charts, etc.) off infographic images the admin has already saved to their
// own device — e.g. via right-click-save or a screenshot while browsing the
// Amazon page normally. No Amazon fetch happens here, and the image bytes
// are only ever piped through to Gemini for OCR and then discarded — never
// stored or displayed on the site. Only the model's *text* output ever
// reaches the product form, exactly like the paste-page-text flow.

export const IMAGE_INFO_CONFIGURED = Boolean(process.env.GEMINI_API_KEY);

export interface ImageInput {
  data: string; // base64, no "data:" prefix
  mimeType: string;
}

export interface ExtractInfoFromImagesResult {
  ok: boolean;
  text?: string;
  error?: string;
}

const PROMPT = `You are helping an e-commerce admin transcribe factual product information from product-listing infographic images (nutrition labels, spec sheets, ingredient lists, size charts, usage diagrams, certifications, etc.) into plain text.

List every distinct factual claim, spec, ingredient, nutrition fact, dimension, certification, or usage instruction that is visibly printed in the image(s), one per line. Do not describe the visual design, colors, or layout — only transcribe the actual text/facts shown. Do not invent or infer anything not literally visible. If an image contains no readable product information, skip it.`;

export async function extractInfoFromImages(images: ImageInput[]): Promise<ExtractInfoFromImagesResult> {
  if (!IMAGE_INFO_CONFIGURED) {
    return { ok: false, error: "Gemini API isn't configured yet." };
  }
  if (images.length === 0) {
    return { ok: false, error: "No images provided." };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const interaction = await ai.interactions.create(
      {
        model: "gemini-3.5-flash",
        input: [
          { type: "text", text: PROMPT },
          ...images.map((img) => ({ type: "image" as const, data: img.data, mime_type: img.mimeType })),
        ],
      },
      { timeout: 25000 },
    );

    const text = interaction.output_text?.trim();
    if (!text) {
      return { ok: false, error: "Couldn't read any product info from those images." };
    }
    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Image extraction failed." };
  }
}
