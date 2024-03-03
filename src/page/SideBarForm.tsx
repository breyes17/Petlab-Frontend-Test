// import { useEffect } from "react";
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
// import { useProductStore } from "../context/useProduct";
import { useSearchParams } from "react-router-dom";
import { CONSTANT } from "../constant";

const formSchema = z.object({
  tags_like: z.string(),
  price_lte: z.string(),
  subscription: z.string(),
});

// const areAllValuesEmpty = (obj: { [key: string]: any }): boolean => {
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
//         return false;
//       }
//     }
//   }
//   return true;
// };

const SideBarForm = () => {
  // const tags = useProductStore((state) => state.tags);
  let [searchParams, setSearchParams] = useSearchParams();
  const tags = ["Chews", "Dog", "Formula", "Cat", "Shampoo"];
  const sortedTags = tags.sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  const tagValue = searchParams.get(CONSTANT.TAGS_LIKE) ?? "";
  const priceValue = searchParams.get(CONSTANT.LTE) ?? "";
  const subscriptionValue = searchParams.get(CONSTANT.SUBSCRIPTION) ?? "";

  // useEffect(() => {
  //   const obj = {
  //     tags_like: tagValue,
  //     price_lte: priceValue,
  //     subscription: subscriptionValue,
  //   };
  //   console.log({ obj });
  //   if (areAllValuesEmpty(obj)) {
  //     console.log("here");
  //     filter({});
  //   } else {
  //     console.log("falseeee");
  //     filter(obj);
  //   }
  // }, [tagValue, priceValue, subscriptionValue, areAllValuesEmpty]);

  // const filter = useProductStore((state) => state.filterProducts);
  const defaultValues = {
    tags_like: tagValue,
    price_lte: "",
    subscription: "",
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // filter(values);
  }

  const onReset = () => {
    form.reset(defaultValues);
    setSearchParams((prev) => {
      prev.delete(CONSTANT.TAGS_LIKE);
      prev.delete(CONSTANT.LTE);
      prev.delete(CONSTANT.SUBSCRIPTION);
      return prev;
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

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* TAG */}
          <FormField
            control={form.control}
            name="tags_like"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">Tags:</FormLabel>
                {/* <Select onValueChange={field.onChange} value={field.value}> */}
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
                    onChange={(e) =>
                      setSearchParams((prev) => {
                        prev.set("price_lte", e.target.value);
                        return prev;
                      })
                    }
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
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
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
