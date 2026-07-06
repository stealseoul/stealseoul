import { notFound } from "next/navigation";
import { getProduct, getCategories } from "@/lib/data";
import EditProductForm from "./EditProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct("en", slug);
  if (!product) notFound();

  const categories = getCategories("en");

  return (
    <div>
      <h1 className="text-xl font-bold">Edit {product.name}</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Changes save as an override and go live within a few seconds — no redeploy needed.
      </p>
      <div className="mt-6">
        <EditProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
