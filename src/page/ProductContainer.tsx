// import { useEffect } from "react";
import Product from "./Product";
import Sidebar from "./Sidebar";
// import { useProductStore } from "../context/useProduct";

const ProductContainer = () => {
  // const getProducts = useProductStore((state) => state.getProducts);

  // useEffect(() => {
  //   getProducts();
  // }, []); // initial load

  return (
    <main className="flex min-h-dvh">
      <Sidebar />
      <Product />
    </main>
  );
};

export default ProductContainer;
