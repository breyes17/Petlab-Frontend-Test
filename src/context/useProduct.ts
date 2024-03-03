import { create } from "zustand";
import { ProductInterface, ProductStoreInterface } from "./interface";
import { filterProducts } from "../api";
import { CONSTANT } from "../constant";

const CONSTANT_STORE = {
  ZERO: 0,
  PAGE: 1,
  LIMIT: 12,
};

export const useProductStore = create<ProductStoreInterface>((set) => ({
  products: [],
  tags: [],
  limit: CONSTANT_STORE.LIMIT,
  totalCount: CONSTANT_STORE.ZERO,
  paginationIndex: CONSTANT_STORE.ZERO,
  paginationPage: CONSTANT_STORE.PAGE,
  filterProducts: async (filter) => {
    let result: ProductInterface[] = [];
    result = await filterProducts(filter);
    if (
      filter[CONSTANT.TAGS_LIKE] !== "" ||
      filter[CONSTANT.LTE] !== "" ||
      filter[CONSTANT.SUBSCRIPTION] !== "" ||
      filter[CONSTANT.TITLE_LIKE] !== ""
    ) {
      console.log("alsdkfjaslkdfjalskdj");
      set((state) => ({
        ...state,
        products: result,
        limit: 12,
        paginationPage: 1,
        totalCount: result.length,
      }));
    } else {
      set((state) => ({
        ...state,
        products: result,
        totalCount:
          filter[CONSTANT.PAGE] === "1" && filter[CONSTANT.LIMIT] === "12"
            ? CONSTANT_STORE.LIMIT
            : state.totalCount,
      }));
    }
  },
  setLimit: async (limit) => {
    set((state) => ({
      ...state,
      limit,
    }));
  },
  setPaginationIndex: (index) =>
    set((state) => ({ ...state, paginationIndex: index })),
  setPaginationNumber: (page) =>
    set((state) => ({ ...state, paginationPage: page })),
}));
