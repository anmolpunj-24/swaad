import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { categoryApi, productApi } from "../../../../api.service";
import ProductForm from "@/components/ui/forms/productForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const oneProductData = async () => {
      try {
        const res = await productApi.getOne(id);
        if (res?.status === 200) {
          const productData = res?.data?.product;

          setCategories([
            {
              _id: productData.categoryId,
              name: productData.categoryName,
            },
          ]);

          setProduct(productData);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch product!",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    oneProductData();
  }, [router.isReady, id]);

  const handleProductUpdate = async (formData) => {
    setUpdateLoading(true);

    try {
      const res = await productApi.update(id, formData);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Product updated successfully!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update product!",
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

  const productDefaultValues = useMemo(
    () => ({
      _id: product?._id ?? "",
      categoryId: product?.categoryId ?? "",
      categoryName: product?.categoryName ?? "",
      isActive: product?.isActive ?? false,

      variants:
        product?.variants?.map((variant) => ({
          _id: variant?._id ?? "",
          name: variant?.name ?? "",
          slug: variant?.slug ?? "",
          tagLine: variant?.tagLine ?? "",
          description: variant?.description ?? "",
          price: variant?.price ?? 0,
          stock: variant?.stock ?? 0,
          isActive: variant?.isActive ?? false,

          images:
            variant?.images?.map((image) => ({
              _id: image?._id ?? "",
              image: image?.image ?? "",
              preview:
                `${process.env.BASE_URL}/uploads/products/${product?._id}/${variant?._id}/${image?.image}` ??
                null,
              isPrimary: image?.isPrimary ?? false,
              alt: image?.alt ?? "Product image",
              isActive: image?.isActive ?? true,
            })) ?? [],

          seo: {
            _id: variant?.seo?._id ?? "",
            metaTitle: variant?.seo?.metaTitle ?? "",
            metaDescription: variant?.seo?.metaDescription ?? "",
            metaKeywords: variant?.seo?.metaKeywords ?? [],
          },
        })) ?? [],
    }),
    [product],
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
              Edit Product
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Edit an existing product.
            </p>
          </div>
        </div>
      </div>

      <ProductForm
        onSubmit={handleProductUpdate}
        buttonText="Update Product"
        loadingButtonText="Updating Product..."
        loading={updateLoading}
        defaultValues={productDefaultValues}
        categories={categories}
        handleCategoryDropdownOpen={handleCategoryDropdownOpen}
      />
    </>
  );
}
