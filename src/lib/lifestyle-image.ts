import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";

// Generates a brand-new, original lifestyle image via Gemini — never a real
// Amazon product photo. Product Advertising Content (including images) is
// only usable when sourced through PA-API per the Associates Operating
// Agreement, so this deliberately never touches or derives from anything
// on an actual Amazon page.

export const GEMINI_CONFIGURED = Boolean(process.env.GEMINI_API_KEY);
export const IMAGE_STORAGE_CONFIGURED = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export interface GenerateLifestyleImageResult {
  ok: boolean;
  url?: string;
  error?: string;
}

export async function generateLifestyleImage(
  slug: string,
  productName: string,
  productSummary: string,
): Promise<GenerateLifestyleImageResult> {
  if (!GEMINI_CONFIGURED) {
    return { ok: false, error: "Gemini API isn't configured yet." };
  }
  if (!IMAGE_STORAGE_CONFIGURED) {
    return { ok: false, error: "Image storage isn't configured yet." };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `A realistic lifestyle photo of someone enjoying or using this product: "${productName}" — ${productSummary}. Natural everyday setting, soft natural lighting, photorealistic, no text, no logos, no watermarks.`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-image",
      input: prompt,
    });

    const generatedImage = interaction.output_image;
    if (!generatedImage?.data) {
      return { ok: false, error: "No image was returned." };
    }

    const buffer = Buffer.from(generatedImage.data, "base64");
    const blob = await put(`products/${slug}-${Date.now()}.png`, buffer, {
      access: "public",
      contentType: "image/png",
    });

    return { ok: true, url: blob.url };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Image generation failed." };
  }
}
