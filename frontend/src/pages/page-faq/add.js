import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import PageFaqForm from "@/components/ui/forms/pageFaqForm";
import { pageFaqApi } from "../../../api.service";

export default function AddPageFaq() {
  const router = useRouter();
  const [addingPageFaq, setAddingPageFaq] = useState(false);

  const handleAddPageFaq = async (data) => {
    setAddingPageFaq(true);

    try {
      const res = await pageFaqApi.add(data);

      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingPageFaq(false);
    }
  };

  return (
    <>
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
              Add Page FAQs
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Add a frequently asked question(s) and answer(s) for a website
              page.
            </p>
          </div>
        </div>
      </div>

      <PageFaqForm
        onSubmit={handleAddPageFaq}
        buttonText="Add FAQs"
        loadingButtonText="Adding FAQs..."
        loading={addingPageFaq}
      />
    </>
  );
}
