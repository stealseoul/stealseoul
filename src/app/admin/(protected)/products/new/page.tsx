import { getCategories } from "@/lib/data";
import NewProductForm from "./NewProductForm";

export default function NewProductPage() {
  const categories = getCategories("en");

  return (
    <div>
      <h1 className="text-xl font-bold">Add a product</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Paste an ASIN or Amazon product link. We&apos;ll try to auto-fill the fields below, but you
        always review and edit before it goes live.
      </p>
      <div className="mt-6">
        <NewProductForm categories={categories} />
      </div>
    </div>
  );
}
