import { useState } from "react";
import { toast } from "sonner";
import ProductForm from "@/components/ui/forms/productForm";
import { productApi, categoryApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddProduct() {
  const router = useRouter();
  const [addingProduct, setAddingProduct] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const handleAddProduct = async (data) => {
    setAddingProduct(true);

    try {
      const res = await productApi.add(data);

      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingProduct(false);
    }
  };

  const getAllCategories = async () => {
    setCategoryLoading(true);

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
    } finally {
      setCategoryLoading(false);
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
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:border-[#C9A96A] hover:bg-[#FBF7EE] hover:cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Create a product with its details, variants, images, and SEO
              settings.
            </p>
          </div>
        </div>
      </div>

      <ProductForm
        onSubmit={handleAddProduct}
        buttonText="Add Product"
        loadingButtonText="Adding Product..."
        loading={addingProduct}
        categories={categories}
        handleCategoryDropdownOpen={handleCategoryDropdownOpen}
        categoryLoading={categoryLoading}
      />
    </>
  );
}
