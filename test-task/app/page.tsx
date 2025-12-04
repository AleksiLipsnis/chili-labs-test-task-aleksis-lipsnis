"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts } from "./lib/product-api";
import type { Product } from "./types/product-type";

const PAGE_SIZE = 12;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(debouncedQuery, page, PAGE_SIZE);
        if (!cancelled) {
          setProducts(data.products);
          setTotal(data.total);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500">
              Chili Labs
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Aleksis Lipsnis Frontend Test Task
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-10 pt-6 lg:px-6 lg:pt-10">
        <section className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 text-[17px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Online store
            </p>
          </div>

          <div className="w-full max-w-sm">
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
              Search
            </label>
            <div className="flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 shadow-sm focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900/10">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4 flex-shrink-0 text-neutral-400"
              >
                <path
                  d="m19 19-3.5-3.5M11 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or category"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>
        </section>

        <section className="mb-4 flex flex-col items-start justify-between gap-2 border-b border-neutral-200 pb-3 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>
            <span className="font-medium text-neutral-800">
              {isLoading ? "Loading products…" : `${total} items`}
            </span>
            {debouncedQuery && !isLoading && (
              <span className="ml-2 text-neutral-500">
                for &quot;{debouncedQuery}&quot;
              </span>
            )}
          </div>
        </section>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {!isLoading && products.length === 0 && !error && (
          <div className="mt-6 text-sm text-neutral-500">
            No products found. Try a different search.
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-700">
                  {product.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                <h2 className="line-clamp-2 text-sm font-medium tracking-tight text-neutral-900">
                  {product.title}
                </h2>

                <div className="mt-auto flex items-end justify-between pt-4">
                  <div className="text-base font-semibold text-neutral-900">
                    ${product.price}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                    View details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-3 text-xs">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-neutral-300 px-3 py-1 font-medium uppercase tracking-[0.16em] text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>

            <div className="flex items-center gap-1 text-[11px] text-neutral-600">
              <span className="font-medium">{page}</span>
              <span className="text-neutral-400">/</span>
              <span>{totalPages}</span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-full border border-neutral-300 px-3 py-1 font-medium uppercase tracking-[0.16em] text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}
