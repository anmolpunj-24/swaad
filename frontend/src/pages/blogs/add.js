import { useState, useEffect } from "react";
import { toast } from "sonner";
import BlogForm from "@/components/ui/forms/blogForm";
import { blogApi, categoryApi, tagApi } from "../../../api.service";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function AddBlog() {
  const router = useRouter();
  const [addingBlog, setAddingBlog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [tags, setTags] = useState([]);

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

  const getAllTags = async () => {
    try {
      const res = await tagApi.getAll();
      if (res?.status === 200) {
        const tagData = res?.data?.tags?.map((tag) => ({
          _id: tag._id,
          name: tag.name,
        }));

        setTags(tagData);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "An error occurred");
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const handleCreateTag = async (tagData) => {
    const response = await tagApi.add(tagData);

    if (response.status !== 201) {
      throw new Error(response?.data?.message || "Unable to create tag.");
    }

    const createdTag = response.data.tag;

    if (!createdTag?._id) {
      throw new Error("The API response does not contain the created tag.");
    }

    setTags((previousTags) => {
      const alreadyExists = previousTags.some(
        (tag) => String(tag._id) === String(createdTag._id),
      );

      if (alreadyExists) {
        return previousTags;
      }

      return [...previousTags, createdTag];
    });

    toast.success(response.data.message || "Tag created successfully.");

    return createdTag;
  };

  const handleAddBlog = async (formData) => {
    setAddingBlog(true);

    try {
      const response = await blogApi.add(formData);

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/blogs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to create blog.",
      );
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
              Create and manage blog posts for SWAAD and keep your content
              organized and discoverable.
            </p>
          </div>
        </div>
      </div>

      <BlogForm
        onSubmit={handleAddBlog}
        buttonText="Add Blog"
        loadingButtonText="Adding Blog..."
        loading={addingBlog}
        categories={categories}
        handleCategoryDropdownOpen={handleCategoryDropdownOpen}
        categoryLoading={categoryLoading}
        tags={tags}
        onCreateTag={handleCreateTag}
      />
    </>
  );
}
