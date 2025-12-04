import { fetchProductById } from "../../lib/product-api";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6 lg:px-6 lg:pt-10">
        <div className="mb-6 flex items-center justify-between gap-4 text-xs text-neutral-500">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1 font-medium uppercase tracking-[0.16em] text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <span className="-ml-0.5 text-sm">←</span>
            <span>Back</span>
          </Link>

          <span className="hidden text-[11px] uppercase tracking-[0.18em] sm:inline">
            Product details
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,1.8fr]">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="relative flex h-[420px] w-full items-center justify-center bg-neutral-100 lg:h-[480px]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-[80%] w-auto object-contain"
              />
              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                {product.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-sm lg:px-7 lg:py-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Online store / Product
            </p>

            <h1 className="mb-3 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              {product.title}
            </h1>

            <div className="mb-5 flex items-center gap-3">
              <div className="text-2xl font-semibold text-neutral-900">
                ${product.price}
              </div>
            </div>

            <div className="mt-1 border-t border-neutral-200 pt-4">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-neutral-700">
                {product.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-4 text-[11px] text-neutral-500">
              <span className="rounded-full bg-neutral-100 px-3 py-1 uppercase tracking-[0.16em]">
                Category: {product.category}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
