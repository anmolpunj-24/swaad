import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { categoryApi } from "../../../../api.service";
import CategoryForm from "@/components/ui/forms/categoryForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";

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
        console.log(res.data);

        if (res?.status === 200) {
          setCategory(res.data.category);
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
      parentId: data.parentId,
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

  const handleCategoryTypeChange = (isParent) => {
    if (!isParent) {
      getAllCategories();
    } else {
      setCategories([]);
    }
  };

  const categoryDefaultValues = useMemo(
    () => ({
      name: category?.name || "",
      parentId: category?.parentId ? category?.parentId : "",
      slug: category?.slug || "",
      isActive: category?.isActive ?? false,
    }),
    [category?.name, category?.parentId, category?.slug, category?.isActive],
  );

  return (
    <>
      {fetchLoading && <GlobalLoader />}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Edit Category</h1>

        <p className="mt-1 text-sm text-[#6f665d]">
          Edit an existing category.
        </p>
      </div>

      <div className="max-w-full rounded-2xl bg-[#F7F4EC] p-6 shadow-[0_8px_30px_rgba(42,38,34,0.08)]">
        <CategoryForm
          onSubmit={handleCategoryUpdate}
          buttonText="Update Category"
          loadingButtonText="Updating Category..."
          loading={updateLoading}
          defaultValues={categoryDefaultValues}
          categories={categories}
          onCategoryTypeChange={handleCategoryTypeChange}
        />
      </div>
    </>
  );
}
