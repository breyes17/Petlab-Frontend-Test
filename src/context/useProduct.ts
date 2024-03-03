import { create } from "zustand";
import { ProductInterface, ProductStoreInterface } from "./interface";
import { getProducts, filterProducts } from "../api";

const CONSTANT = {
  ZERO: 0,
  PAGE: 1,
  LIMIT: 12,
};

export const useProductStore = create<ProductStoreInterface>((set) => ({
  products: [],
  tags: [],
  limit: CONSTANT.LIMIT,
  totalCount: CONSTANT.ZERO,
  getProducts: async (page = CONSTANT.PAGE, limit = CONSTANT.LIMIT) => {
    const result = await getProducts(page, limit);

    set((state) => ({
      ...state,
      products: result,
      totalCount: result.length,
    }));
  },
  filterProducts: async (filter) => {
    let result: ProductInterface[] = [];

    if (filter) {
      const toArray = Object.values(filter);
      const countEmpty = checkIfEmpty(toArray);

      if (countEmpty === toArray.length) {
        result = await getProducts(CONSTANT.PAGE, CONSTANT.LIMIT);
      } else {
        result = await filterProducts(filter);
      }
    } else {
      result = await getProducts(CONSTANT.PAGE, CONSTANT.LIMIT);
    }

    set((state) => ({
      ...state,
      products: result,
      totalCount: result.length,
    }));
  },
  setLimit: async (limit) => {
    const result = await getProducts(CONSTANT.PAGE, limit);

    set((state) => ({
      ...state,
      products: result,
      limit,
    }));
  },
}));

// count the empty string
const checkIfEmpty = (value: string[]): number =>
  value.reduce((prev, curr) => (!curr ? prev + 1 : prev), 0);
