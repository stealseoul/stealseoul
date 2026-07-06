import Link from "next/link";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const products = await getProducts("en");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Products ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          + Add product
        </Link>
      </div>

      <div className="mt-6 divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/products/${p.slug}/edit`}
            className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <p className="font-medium text-neutral-900">{p.name}</p>
                <p className="text-xs text-neutral-500">
                  {p.category} · {p.priceRange}
                </p>
              </div>
            </div>
            <span className="text-sm text-orange-600">Edit →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
