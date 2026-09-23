import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { pageSeoApi } from "../../../../api.service";
import PageSeoForm from "@/components/ui/forms/pageSeoForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditPageSeo() {
  const router = useRouter();
  const { id } = router.query;

  const [pageSeo, setPageSeo] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const onePageSeoData = async () => {
      try {
        const res = await pageSeoApi.getOne(id);

        if (res?.status === 200) {
          const pageSeoData = res.data.seo;

          setPageSeo(pageSeoData);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch page seo!",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    onePageSeoData();
  }, [router.isReady, id]);

  const handlePageSeoUpdate = async (data) => {
    const updatePageSeoData = {
      slug: data.slug,
      pageName: data.pageName,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords,
      isActive: data.isActive,
    };

    setUpdateLoading(true);

    try {
      const res = await pageSeoApi.update(id, updatePageSeoData);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Page seo updated successfully!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update page Seo!",
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  const pageSeoDefaultValues = useMemo(
    () => ({
      slug: pageSeo?.slug ?? "",
      pageName: pageSeo?.pageName ?? "",
      metaTitle: pageSeo?.metaTitle ?? "",
      metaDescription: pageSeo?.metaDescription ?? "",
      metaKeywords: pageSeo?.metaKeywords.join(", ") ?? [],
      isActive: pageSeo?.isActive ?? false,
    }),
    [
      pageSeo?.slug,
      pageSeo?.pageName,
      pageSeo?.metaTitle,
      pageSeo?.metaDescription,
      pageSeo?.metaKeywords,
      pageSeo?.isActive,
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
              Edit Page SEO
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">Edit an existing SEO.</p>
          </div>
        </div>
      </div>

      <PageSeoForm
        onSubmit={handlePageSeoUpdate}
        buttonText="Update SEO"
        loadingButtonText="Updating SEO..."
        loading={updateLoading}
        defaultValues={pageSeoDefaultValues}
      />
    </>
  );
}
