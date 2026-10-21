import { useState } from "react";
import { toast } from "sonner";
import TagForm from "@/components/ui/forms/tagForm";
import { tagApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddTag() {
  const router = useRouter();
  const [addingTag, setAddingTag] = useState(false);

  const handleAddTag = async (data) => {
    setAddingTag(true);

    try {
      const res = await tagApi.add(data);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
        router.push("/tags")
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingTag(false);
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
              Add Tag
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Create a tag to organize and categorize related content across
              SWAAD.
            </p>
          </div>
        </div>
      </div>

      <TagForm
        onSubmit={handleAddTag}
        buttonText="Add Tag"
        loadingButtonText="Adding Tag..."
        loading={addingTag}
      />
    </>
  );
}
