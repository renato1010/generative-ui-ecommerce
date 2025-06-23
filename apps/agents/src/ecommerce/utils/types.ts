export type Product = {
  name: string;
  description: string;
  brand?: string;
  price: string;
  imageUrl: string;
  productId: string;
  distance?: number;
};

export type ProductList = Product[];
