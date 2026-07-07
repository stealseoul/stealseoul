import { getCategories } from "@/lib/data";
import NewProductForm from "./NewProductForm";

export default function NewProductPage() {
  const categories = getCategories("en");

  return (
    <div>
      <h1 className="text-xl font-bold">Add a product</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Paste an ASIN, a plain product link, or a full affiliate link with tracking params (SiteStripe
        links work fine — we only keep the ASIN and always use our own approved{" "}
        <span className="font-mono">tag=</span>, so extra params like{" "}
        <span className="font-mono">crid</span>/<span className="font-mono">qid</span>/
        <span className="font-mono">linkId</span> are dropped). We&apos;ll try to auto-fill the fields
        below, but you always review and edit before it goes live.
      </p>
      <div className="mt-6">
        <NewProductForm categories={categories} />
      </div>
    </div>
  );
}
