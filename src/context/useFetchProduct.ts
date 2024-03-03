import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../constant";
import { useProductStore } from "./useProduct";

const useFetchProduct = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const filter = useProductStore((state) => state.filterProducts);

  const tagValue = searchParams.get(CONSTANT.TAGS_LIKE) ?? "";
  const priceValue = searchParams.get(CONSTANT.LTE) ?? "";
  const subscriptionValue = searchParams.get(CONSTANT.SUBSCRIPTION) ?? "";
  const titleValue = searchParams.get(CONSTANT.TITLE_LIKE) ?? "";
  const pageValue = searchParams.get(CONSTANT.PAGE) ?? "1";
  const limitValue = searchParams.get(CONSTANT.LIMIT) ?? "12";

  useEffect(() => {
    const defaultPageLimit =
      tagValue !== "" ||
      priceValue !== "" ||
      subscriptionValue !== "" ||
      titleValue !== "";

    const obj = {
      tags_like: tagValue,
      price_lte: priceValue,
      subscription: subscriptionValue,
      title_like: titleValue,
      _page: defaultPageLimit ? "1" : pageValue,
      _limit: defaultPageLimit ? "12" : limitValue,
    };

    if (defaultPageLimit) {
      [CONSTANT.PAGE, CONSTANT.LIMIT].forEach((cons) => {
        setSearchParams((prev) => {
          prev.delete(cons);
          return prev;
        });
      });
    }

    filter(obj);
  }, [
    tagValue,
    priceValue,
    subscriptionValue,
    pageValue,
    limitValue,
    titleValue,
    filter,
    setSearchParams,
  ]);
};

export default useFetchProduct;
