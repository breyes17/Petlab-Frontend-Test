import { ProductInterface } from "./context/interface";
const products = `${process.env.REACT_APP_ENV}/products`;

// export const getProducts = async (
//   page: number,
//   limit: number
// ): Promise<ProductInterface[]> => {
//   const result = await fetch(`${products}?_page=${page}&_limit=${limit}`);
//   const data = await result.json();
//   return data;
// };

export const filterProducts = async (params: {
  [key: string]: string;
}): Promise<ProductInterface[]> => {
  console.log(params);
  const query = Object.keys(params)
    .filter((key) => params[key])
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  console.log({ query });
  const result = await fetch(`${products}?${query}`);
  const data = await result.json();
  return data;
};
