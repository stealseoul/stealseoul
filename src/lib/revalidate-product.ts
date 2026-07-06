import { revalidatePath } from "next/cache";
import { locales } from "@/i18n/locales";

export function revalidateProductPaths(slug: string, category: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}/products/${slug}`);
    revalidatePath(`/${locale}/categories/${category}`);
    revalidatePath(`/${locale}`);
  }
}
