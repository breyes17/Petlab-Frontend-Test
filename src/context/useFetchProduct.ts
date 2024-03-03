import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../constant";
import { useProductStore } from "./useProduct";

const useFetchProduct = () => {
  let [searchParams] = useSearchParams();
  const filter = useProductStore((state) => state.filterProducts);

  const tagValue = searchParams.get(CONSTANT.TAGS_LIKE) ?? "";
  const priceValue = searchParams.get(CONSTANT.LTE) ?? "";
  const subscriptionValue = searchParams.get(CONSTANT.SUBSCRIPTION) ?? "";
  const pageValue = searchParams.get(CONSTANT.PAGE) ?? "";
  const limitValue = searchParams.get(CONSTANT.LIMIT) ?? "";

  useEffect(() => {
    const obj = {
      tags_like: tagValue,
      price_lte: priceValue,
      subscription: subscriptionValue,
    };

    if (areAllValuesEmpty(obj)) {
      filter(null);
    } else {
      filter(obj);
    }
  }, [tagValue, priceValue, subscriptionValue, pageValue, limitValue, filter]);
};

export default useFetchProduct;

const areAllValuesEmpty = (obj: { [key: string]: any }): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
        return false;
      }
    }
  }
  return true;
};
