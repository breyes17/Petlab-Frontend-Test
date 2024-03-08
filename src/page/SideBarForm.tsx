import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../constant";
import { useProductStore } from "../context/useProduct";

const formSchema = z.object({
  title_like: z.string(),
  tags_like: z.string(),
  price_lte: z.string(),
  subscription: z.string(),
});

const SideBarForm = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const filter = useProductStore((state) => state.filterProducts);
  const setLimit = useProductStore((state) => state.setLimit);
  const setPage = useProductStore((state) => state.setPaginationNumber);
  const tags = ["Chews", "Dog", "Formula", "Cat", "Shampoo"];
  const sortedTags = tags.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  const tagValue = searchParams.get(CONSTANT.TAGS_LIKE) ?? "";
  const priceValue = searchParams.get(CONSTANT.LTE) ?? "";
  const subscriptionValue = searchParams.get(CONSTANT.SUBSCRIPTION) ?? "";
  const titleValue = searchParams.get(CONSTANT.TITLE_LIKE) ?? "";

  const defaultValues = {
    tags_like: tagValue,
    price_lte: "",
    subscription: "",
    title_like: "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  const onReset = () => {
    form.reset(defaultValues);
    setSearchParams((prev) => {
      const deletion = Object.values(CONSTANT);
      deletion.forEach((del) => prev.delete(del));
      return prev;
    });
    setLimit(12);
    setPage(1);
    filter({
      [CONSTANT.PAGE]: "1",
      [CONSTANT.LIMIT]: "12",
    });
  };

  const renderTags = (tags: string[]) => {
    if (!tags.length) {
      return <SelectItem value="no-tag">No Tag available</SelectItem>;
    }

    return tags.map((tag) => (
      <SelectItem value={tag} key={tag}>
        {tag}
      </SelectItem>
    ));
  };

  const inputOnChange = (name: string, value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set(name, value);
      } else {
        prev.delete(name);
      }
      return prev;
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* TITLE */}
          <FormField
            control={form.control}
            name="title_like"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search title"
                    {...field}
                    value={titleValue}
                    onChange={(e) =>
                      inputOnChange("title_like", e.target.value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TAG */}
          <FormField
            control={form.control}
            name="tags_like"
            render={() => (
              <FormItem>
                <FormLabel className="flex">Tags:</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      prev.set("tags_like", value);
                      return prev;
                    });
                  }}
                  value={tagValue}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Tag" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{renderTags(sortedTags)}</SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price_lte"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0.00"
                    {...field}
                    type="number"
                    value={priceValue}
                    onChange={(e) => inputOnChange("price_lte", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBSCRIPTION */}
          <FormField
            control={form.control}
            name="subscription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Subscription:</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setSearchParams((prev) => {
                      prev.set("subscription", value);
                      return prev;
                    });
                  }}
                  value={subscriptionValue}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Is subscribed" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="flex space-x-2 justify-center">
            <Button variant="destructive" onClick={onReset}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SideBarForm;
