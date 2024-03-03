import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { useProductStore } from "../../context/useProduct";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../../constant";

const Pagination = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const setLimit = useProductStore((state) => state.setLimit);
  const setPage = useProductStore((state) => state.setPaginationNumber);
  const page = useProductStore((state) => state.paginationPage);
  const count = useProductStore((state) => state.totalCount);
  const limit = useProductStore((state) => state.limit);
  const numberOfPages = Math.ceil(count / limit);
  const itemsPerPage = [3, 9, 12]; // default

  const tagValue = searchParams.get(CONSTANT.TAGS_LIKE) ?? "";
  const priceValue = searchParams.get(CONSTANT.LTE) ?? "";
  const subscriptionValue = searchParams.get(CONSTANT.SUBSCRIPTION) ?? "";
  const titleValue = searchParams.get(CONSTANT.TITLE_LIKE) ?? "";
  const isDisableLimit =
    [tagValue, priceValue, subscriptionValue, titleValue].filter(
      (param) => param
    ).length > 0;

  const onNavigatePage = (value: number) => {
    setPage(value);
    setSearchParams((prev) => {
      prev.set(CONSTANT.PAGE, value.toString());
      return prev;
    });
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex space-x-2 items-center">
        <h3 className="text-sm">Items per page:</h3>
        <Select
          value={limit.toString()}
          disabled={isDisableLimit}
          onValueChange={(value) => {
            setLimit(parseInt(value));
            setPage(1);
            setSearchParams((prev) => {
              prev.set(CONSTANT.PAGE, "1");
              prev.set(CONSTANT.LIMIT, value);
              return prev;
            });
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="12" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {itemsPerPage.map((item) => (
                <SelectItem value={item.toString()} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onNavigatePage(page - 1);
          }}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onNavigatePage(page + 1);
          }}
          disabled={numberOfPages === page}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
