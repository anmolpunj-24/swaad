import { useState } from "react";
import { toast } from "sonner";
import BlogForm from "@/components/ui/forms/blogForm";
import { blogApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddBlog() {
  const router = useRouter();
  const [addingBlog, setAddingBlog] = useState(false);

  const handleAddBlog = async (data) => {
    setAddingBlog(true);

    try {
      const res = await blogApi.add(data);
      if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    } finally {
      setAddingBlog(false);
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
              Add Blog
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Create and manage blog posts for SWAAD and keep your content organized and discoverable.
            </p>
          </div>
        </div>
      </div>

      <BlogForm
        onSubmit={handleAddBlog}
        buttonText="Add Blog"
        loadingButtonText="Adding Blog..."
        loading={addingBlog}
      />
    </>
  );
}
