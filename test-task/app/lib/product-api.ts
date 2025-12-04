import type { ProductsResponse, Product } from "../types/product-type";

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(
  query: string,
  page: number,
  pageSize: number
): Promise<ProductsResponse> {
  const skip = (page - 1) * pageSize;
  const isSearching = query.trim().length > 0;

  const url = isSearching
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(
        query
      )}&limit=${pageSize}&skip=${skip}`
    : `${BASE_URL}/products?limit=${pageSize}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}
