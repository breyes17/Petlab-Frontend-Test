import DataTable from "../components/datatable";
import { columns } from "../components/datatable/columns";
import { useProductStore } from "../context/useProduct";

const Product = () => {
  const products = useProductStore((state) => state.products);
  return (
    <section className="grow bg-slate-50 flex items-center justify-center overflow-y-auto py-10">
      <div className="bg-white">
        <DataTable data={products} columns={columns} />
      </div>
    </section>
  );
};

export default Product;
