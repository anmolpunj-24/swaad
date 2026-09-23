import { useState } from "react";
import { toast } from "sonner";
import PageSeoForm from "@/components/ui/forms/pageSeoForm";
import { pageSeoApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddPageSeo() {
  const router = useRouter();
  const [addingPageSeo, setAddingPageSeo] = useState(false);

  const handleAddPageSeo = async (data) => {
    const pageSeoData = {
      slug: data.slug,
      pageName: data.pageName,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: data.metaKeywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
      isActive: data.isActive,
    };

    setAddingPageSeo(true);

    try {
      const res = await pageSeoApi.add(pageSeoData);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingPageSeo(false);
    }
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
              Add Page SEO
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Add SEO metadata for a page, including its title, description, and
              keywords.
            </p>
          </div>
        </div>
      </div>

      <PageSeoForm
        onSubmit={handleAddPageSeo}
        buttonText="Add SEO"
        loadingButtonText="Adding SEO..."
        loading={addingPageSeo}
      />
    </>
  );
}
