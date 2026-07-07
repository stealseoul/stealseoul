-- AI-generated lifestyle image (never a real Amazon product photo — those
-- require PA-API-sourced content per the Associates Operating Agreement).
-- Stored as a permanent Vercel Blob URL, generated fresh by Gemini per
-- product rather than copied from any Amazon page.
alter table admin_products add column if not exists image_url text;
