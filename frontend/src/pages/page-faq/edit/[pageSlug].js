import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { pageFaqApi } from "../../../../api.service";
import PageFaqForm from "@/components/ui/forms/pageFaqForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditPageFaq() {
  const router = useRouter();
  const { pageSlug } = router.query;

  const [pageFaqs, setPageFaqs] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !pageSlug) return;

    const onePageFaqsData = async () => {
      try {
        const res = await pageFaqApi.getOne(pageSlug);

        if (res?.status === 200) {
          const pageFaqData = res.data.faq;

          setPageFaqs(pageFaqData);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to fetch page faqs!",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    onePageFaqsData();
  }, [router.isReady, pageSlug]);

  const handlePageFaqsUpdate = async (data) => {
    setUpdateLoading(true);

    try {
      const res = await pageFaqApi.update(pageSlug, data);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Page faqs updated successfully!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update page faqs!",
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  const pageFaqDefaultValues = useMemo(
    () => ({
      pageSlug: pageFaqs?.[0]?.pageSlug ?? "",
      pageName: pageFaqs?.[0]?.pageName ?? "",

      faqs:
        pageFaqs?.map((faq) => ({
          _id: faq?._id ?? "",
          questionSlug: faq?.questionSlug ?? "",
          question: faq?.question ?? "",
          answer: faq?.answer ?? "",
          isActive: faq?.isActive ?? false,
        })) ?? [],
    }),
    [pageFaqs],
  );

  return (
    <>
      {fetchLoading && <GlobalLoader />}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:cursor-pointer hover:border-[#C9A96A] hover:bg-[#FBF7EE]"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Edit Page FAQs
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Edit frequently asked question(s) and answer(s) for a website
              page.
            </p>
          </div>
        </div>
      </div>

      <PageFaqForm
        onSubmit={handlePageFaqsUpdate}
        buttonText="Update FAQs"
        loadingButtonText="Updating FAQs..."
        loading={updateLoading}
        defaultValues={pageFaqDefaultValues}
      />
    </>
  );
}
