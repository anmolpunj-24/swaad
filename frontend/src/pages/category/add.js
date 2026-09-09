import { useState } from "react";
import { toast } from "sonner";
import CategoryForm from "@/components/ui/forms/categoryForm";
import { categoryApi } from "../../../api.service";

export default function AddCategory() {
  const [addingCategory, setAddingCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleAddCategory = async (data) => {
    const categoryData = {
      name: data.name,
      parentId: data.parentId || null,
      parentName: data.parentName,
      slug: data.slug,
      isActive: data.isActive,
    };

    setAddingCategory(true);

    try {
      const res = await categoryApi.add(categoryData);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingCategory(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await categoryApi.getAll();
      if (res?.status === 200) {
        const categoriesData = res?.data?.categories?.map((category) => ({
          _id: category._id,
          name: category.name,
        }));

        setCategories(categoriesData);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    }
  };

  const handleCategoryDropdownOpen = () => {
    getAllCategories();
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Add Category</h1>

        <p className="mt-1 text-sm text-[#6f665d]">Create a new category.</p>
      </div>

      <div className="max-w-full rounded-2xl bg-[#F7F4EC] p-6 shadow-[0_8px_30px_rgba(42,38,34,0.08)]">
        <CategoryForm
          onSubmit={handleAddCategory}
          buttonText="Add Category"
          loadingButtonText="Adding Category..."
          loading={addingCategory}
          categories={categories}
          handleCategoryDropdownOpen={handleCategoryDropdownOpen}
        />
      </div>
    </>
  );
}
