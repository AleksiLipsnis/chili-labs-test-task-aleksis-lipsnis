export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
