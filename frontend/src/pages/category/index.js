import CustomTable from "@/components/ui/table/customTable";
import { categoryApi } from "../../../api.service";
import { useEffect, useState } from "react";

export default function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await categoryApi.getAll();

        if (res?.status === 200) {
          setCategory(res?.data?.categories);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Failed to fetch categories!",
        );
      }
    };

    fetchAllCategories();
  }, []);

  const categoryColumn = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "parentName",
      label: "Parent Category",
    },
    {
      key: "slug",
      label: "Slug",
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
        <h1 className="text-2xl font-semibold text-[#2A2622]">Categories</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All categories of SWAAD.</p>
      </div>

      <CustomTable
        columns={categoryColumn}
        data={category}
        title="Categories"
        addButtonText="Add Category"
        onAdd="/category/add"
      />
    </>
  );
}
