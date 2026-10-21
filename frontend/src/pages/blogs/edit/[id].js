import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import BlogForm from "@/components/ui/forms/blogForm";
import { blogApi, categoryApi, tagApi } from "../../../../api.service";

export default function EditBlog() {
  const router = useRouter();
  const { isReady, query } = router;

  const blogId = Array.isArray(query.id) ? query.id[0] : query.id;

  const [blog, setBlog] = useState(null);
  const [fetchingBlog, setFetchingBlog] = useState(true);
  const [updatingBlog, setUpdatingBlog] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!isReady || !blogId) return;

    let cancelled = false;

    const fetchBlog = async () => {
      setFetchingBlog(true);

      try {
        const response = await blogApi.getOne(blogId);

        const blogData = response.data?.blog;

        if (!blogData || !blogData._id) {
          throw new Error("Blog not found.");
        }

        const category = blogData.categoryId;

        if (category && typeof category === "object") {
          setCategories([
            {
              _id: category._id,
              name: category.name,
            },
          ]);
        }

        if (!cancelled) {
          setBlog(blogData);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Unable to fetch blog.",
          );
        }
      } finally {
        if (!cancelled) {
          setFetchingBlog(false);
        }
      }
    };

    fetchBlog();

    return () => {
      cancelled = true;
    };
  }, [isReady, blogId]);

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
      const errors = error.response?.data?.error;
      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.response?.data?.message ?? "An error occurred");
      }
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
      const errors = error.response?.data?.error;
      if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(error.response?.data?.message ?? "An error occurred");
      }
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

  const defaultValues = useMemo(() => {
    if (!blog) return undefined;

    return {
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featuredImage: blog.featuredImage || "",
      categoryId: blog.categoryId?._id || blog.categoryId || "",
      tagIds: (blog.tagIds || blog.tags || []).map((tag) => tag?._id || tag),
      status: blog.status || "draft",
      isFeatured: blog.isFeatured ?? false,
      isActive: blog.isActive ?? true,
      publishedAt: blog.publishedAt || "",
      seo: {
        metaTitle: blog.seo?.metaTitle || "",
        metaDescription: blog.seo?.metaDescription || "",
        metaKeywords: Array.isArray(blog.seo?.metaKeywords)
          ? blog.seo.metaKeywords
          : [],
      },
    };
  }, [blog]);

  const handleUpdateBlog = async (formData) => {
    setUpdatingBlog(true);

    try {
      const response = await blogApi.update(blogId, formData);

      if (response.status === 200) {
        toast.success(response.data?.message || "Blog updated successfully!");
        router.push("/blogs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update blog.",
      );
    } finally {
      setUpdatingBlog(false);
    }
  };

  if (fetchingBlog) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <LoaderCircle size={30} className="animate-spin text-[#B28B4C]" />
        <p className="text-sm text-[#88765E]">Loading blog details...</p>
      </div>
    );
  }

  if (!blog || !defaultValues) {
    return (
      <div className="rounded-2xl border border-[#E7DDCA] bg-white p-8 text-center">
        <h2 className="text-lg font-bold text-[#33281F]">Blog not found</h2>
        <p className="mt-2 text-sm text-[#88765E]">
          The blog could not be loaded. It may have been deleted or the
          requested URL may be incorrect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/blogs")}
          className="mt-5 rounded-xl bg-[#B28B4C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#98713A]"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

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
              Edit Blog
            </h1>
            <p className="mt-1 text-sm text-[#88765E]">
              Update your blog content, images, tags, and SEO settings.
            </p>
          </div>
        </div>
      </div>

      <BlogForm
        key={blog._id}
        defaultValues={defaultValues}
        onSubmit={handleUpdateBlog}
        buttonText="Update Blog"
        loadingButtonText="Updating Blog..."
        loading={updatingBlog}
        categories={categories}
        handleCategoryDropdownOpen={handleCategoryDropdownOpen}
        categoryLoading={categoryLoading}
        tags={tags}
        onCreateTag={handleCreateTag}
      />
    </>
  );
}
