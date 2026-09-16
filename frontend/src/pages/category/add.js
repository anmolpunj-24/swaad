import { useState } from "react";
import { toast } from "sonner";
import CategoryForm from "@/components/ui/forms/categoryForm";
import { categoryApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";

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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:border-[#C9A96A] hover:bg-[#FBF7EE] hover:cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Add Category
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Create a new category.
            </p>
          </div>
        </div>
      </div>

      <CategoryForm
        onSubmit={handleAddCategory}
        buttonText="Add Category"
        loadingButtonText="Adding Category..."
        loading={addingCategory}
        categories={categories}
        handleCategoryDropdownOpen={handleCategoryDropdownOpen}
      />
    </>
  );
}
