import useFetchProduct from "../context/useFetchProduct";
import SideBarForm from "./SideBarForm";

const Sidebar = () => {
  useFetchProduct(); // query happens here
  return (
    <aside className="w-1/5 bg-blue-100 flex flex-col justify-center px-6 space-y-4">
      <h1 className="font-bold text-slate-900 text-3xl">Filter Data</h1>
      <SideBarForm />
    </aside>
  );
};

export default Sidebar;
