import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { tagApi } from "../../../../api.service";
import TagForm from "@/components/ui/forms/tagForm";
import GlobalLoader from "@/components/ui/globalLoader";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function EditTag() {
  const router = useRouter();
  const { id } = router.query;

  const [tag, setTag] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const oneTagData = async () => {
      try {
        const res = await tagApi.getOne(id);

        if (res?.status === 200) {
          const tagData = res.data.tag;

          setTag(tagData);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch tag!");
      } finally {
        setFetchLoading(false);
      }
    };

    oneTagData();
  }, [router.isReady, id]);

  const handleTagUpdate = async (data) => {
    setUpdateLoading(true);

    try {
      const res = await tagApi.update(id, data);

      if (res?.status === 200) {
        toast.success(res?.data?.message || "Tag updated successfully!");
        router.push("/tags");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update tag!");
    } finally {
      setUpdateLoading(false);
    }
  };

  const tagDefaultValues = useMemo(
    () => ({
      name: tag?.name ?? "",
      slug: tag?.slug ?? "",
      isActive: tag?.isActive ?? true,
    }),
    [tag],
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
              Edit Tag
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">Edit an existing tag.</p>
          </div>
        </div>
      </div>

      <TagForm
        onSubmit={handleTagUpdate}
        buttonText="Update Tag"
        loadingButtonText="Updating Tag..."
        loading={updateLoading}
        defaultValues={tagDefaultValues}
      />
    </>
  );
}
