import CustomTable from "@/components/ui/table/customTable";
import { productApi } from "../../../api.service";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await productApi.getAll();

        if (res?.status === 200) {
          setProducts(res?.data?.products);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Failed to fetch products!",
        );
      }
    };

    fetchAllProducts();
  }, []);

  const productColumns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "categoryName",
      label: "Category",
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.isActive
              ? "bg-[#9B7A43]/15 text-[#806C52]"
              : "bg-[#963F32]/10 text-[#963F32]"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Products</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All products of SWAAD.</p>
      </div>

      <CustomTable
        columns={productColumns}
        data={products}
        title="Products"
        addButtonText="Add Product"
        onAdd="/products/add"
      />
    </>
  );
}
