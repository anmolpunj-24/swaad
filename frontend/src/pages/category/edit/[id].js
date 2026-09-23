import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { categoryApi } from "../../../../api.service";
import CategoryForm from "@/components/ui/forms/categoryForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditCategory() {
  const router = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const oneCategoryData = async () => {
      try {
        const res = await categoryApi.getOne(id);

        if (res?.status === 200) {
          const categoryData = res.data.category;

          setCategory(categoryData);

          if (categoryData.parentId) {
            setCategories([
              {
                _id: categoryData.parentId,
                name: categoryData.parentName,
              },
            ]);
          }
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch category!",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    oneCategoryData();
  }, [router.isReady, id]);

  const handleCategoryUpdate = async (data) => {
    const updateCategoryData = {
      name: data.name,
      parentId: data.parentId || null,
      parentName: data.parentName,
      slug: data.slug,
      isActive: data.isActive,
    };

    setUpdateLoading(true);

    try {
      const res = await categoryApi.update(id, updateCategoryData);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Category updated successfully!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update category!",
      );
    } finally {
      setUpdateLoading(false);
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

  const categoryDefaultValues = useMemo(
    () => ({
      name: category?.name ?? "",
      parentId: category?.parentId ? category?.parentId : null,
      parentName: category?.parentName ?? "",
      slug: category?.slug ?? "",
      isParent: !category?.parentId,
      isActive: category?.isActive ?? false,
    }),
    [
      category?.name,
      category?.parentId,
      category?.parentName,
      category?.slug,
      category?.isActive,
    ],
  );

  return (
    <>
      {fetchLoading && <GlobalLoader />}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:border-[#C9A96A] hover:bg-[#FBF7EE] hover:cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Edit Category
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Edit an existing category.
            </p>
          </div>
        </div>
      </div>

      <CategoryForm
        onSubmit={handleCategoryUpdate}
        buttonText="Update Category"
        loadingButtonText="Updating Category..."
        loading={updateLoading}
        defaultValues={categoryDefaultValues}
        categories={categories}
        handleCategoryDropdownOpen={handleCategoryDropdownOpen}
        currentCategoryId={category?._id}
      />
    </>
  );
}
