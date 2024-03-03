import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { Table } from "@tanstack/react-table";
import { useProductStore } from "../../context/useProduct";

interface PaginationInterface<TData> {
  table: Table<TData>;
}

const Pagination: React.FC<PaginationInterface<any>> = ({ table }) => {
  const [index, setIndex] = useState(0);
  const setLimit = useProductStore((state) => state.setLimit);
  // const filter = useProductStore((state) => state.filterProducts);
  const count = useProductStore((state) => state.totalCount);
  const limit = useProductStore((state) => state.limit);
  const numberOfPages = Math.ceil(count / limit);
  const itemsPerPage = [3, 9, 12]; // default

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex space-x-2 items-center">
        <h3 className="text-sm">
          current count {count} <br />
          number of pages : {numberOfPages} <br />
          Items per page: {limit} <br />
          current index: {index}
        </h3>
        <Select
          value={limit.toString()}
          onValueChange={(value) => setLimit(parseInt(value))}
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
          onClick={() => setIndex((i) => (i -= 1))}
          disabled={index <= 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIndex((i) => (i += 1));
            // filter({

            // })
          }}
          disabled={numberOfPages === index + 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
