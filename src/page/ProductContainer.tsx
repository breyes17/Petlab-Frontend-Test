import Product from "./Product";
import Sidebar from "./Sidebar";

const ProductContainer = () => {
  return (
    <main className="flex min-h-dvh">
      <Sidebar />
      <Product />
    </main>
  );
};

export default ProductContainer;
