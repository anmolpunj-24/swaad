import CustomTable from "@/components/ui/table/customTable";
import { categoryApi } from "../../../api.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = useCallback(async () => {
    try {
      const res = await categoryApi.getAll();

      if (res?.status === 200) {
        setCategories(res?.data?.categories);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to fetch categories!",
      );
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const handleDeleteCategory = async (id) => {
    try {
      const res = await categoryApi.delete(id);

      if (res?.status === 200) {
        toast.success(res?.data?.message ?? "Category deleted successfully!");
        await fetchAllCategories();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to delete category!",
      );
    }
  };

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

  const actionsData = (row) => [
    {
      type: "edit",
      label: "Edit",
      link: `/category/edit/${row._id}`,
    },
    {
      type: "delete",
      label: "Delete",
      onClick: () => handleDeleteCategory(row._id),
      confirmTitle: "Delete category?",
      confirmMessage: "Are you sure you want to delete this category?",
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
        data={categories}
        title="Categories"
        addButtonText="Add Category"
        onAdd="/category/add"
        actions={actionsData}
      />
    </>
  );
}
