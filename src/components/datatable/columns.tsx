import { ColumnDef } from "@tanstack/react-table";
import { ProductInterface } from "../../context/interface";
import { Badge } from "../ui/badge";
import { Heart, HeartOff } from "lucide-react";

const TagsBadges = ({ tags }: { tags: string[] }) => (
  <div className="flex space-x-1">
    {tags.map((tag, index) => (
      <Badge key={index}>{tag}</Badge>
    ))}
  </div>
);

export const columns: ColumnDef<ProductInterface>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "tags",
    header: "Tags",

    cell: ({ getValue }) => {
      const tags = getValue() as string[];
      return <TagsBadges tags={tags} />;
    },
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ getValue }) => (
      <div className="flex justify-center">
        {getValue() ? <Heart /> : <HeartOff />}
      </div>
    ),
  },
  {
    accessorKey: "option_value",
    header: "Option",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${getValue()}`,
  },
  {
    accessorKey: "subscription",
    header: "Subscription",
    cell: ({ getValue }) => (
      <div className="flex justify-center">
        {getValue() ? <Heart /> : <HeartOff />}
      </div>
    ),
  },
];
