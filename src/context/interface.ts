export interface ProductInterface {
  id: number;
  slug: string;
  title: string;
  vendor: string;
  tags: string[];
  published: boolean;
  url: string;
  image_src: string;
  option_value: string;
  sku: string;
  price: number;
  subscription_discount: number;
  subscription: boolean;
}

export interface ProductStoreInterface {
  products: ProductInterface[];
  limit: number;
  totalCount: number;
  getProducts: (page?: number, limit?: number) => Promise<void>;
  filterProducts: (filter: { [key: string]: string } | null) => Promise<void>;
  setLimit: (limit: number) => Promise<void>;
}
