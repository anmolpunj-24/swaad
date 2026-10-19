import CustomTable from "@/components/ui/table/customTable";
import { blogApi } from "../../../api.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { dateHandler } from "@/utils/dateHandler";
import Image from "next/image";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchAllBlogs = useCallback(async () => {
    try {
      const res = await blogApi.getAll();

      if (res?.status === 200) {
        setBlogs(res?.data?.blogs);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to fetch blogs!");
    }
  }, []);

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  const handleDeleteBlog = async (id) => {
    try {
      const res = await blogApi.delete(id);

      if (res?.status === 200) {
        toast.success(res?.data?.message ?? "Blog deleted successfully!");
        await fetchAllBlogs();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to delete blog!");
    }
  };

  const blogsColumns = [
    {
      key: "featuredImage",
      label: "Featured Image",
      render: (row) =>
        row?.featuredImage ? (
          <div className="relative h-14 w-20 overflow-hidden rounded-lg border border-[#E6DDCD] bg-[#F7F4EC]">
            <Image
              src={row.featuredImage}
              alt={row.title || "Blog featured image"}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-dashed border-[#DCC9A5] bg-[#F7F4EC] text-xs text-[#95846D]">
            No image
          </div>
        ),
    },
    {
      key: "title",
      label: "Blog Title",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "categoryName",
      label: "Category",
      render: (row) => (
        <span className="text-sm font-medium text-[#4B3929]">
          {row.categoryId?.name || "-"}
        </span>
      ),
    },
    {
      key: "tagNames",
      label: "Tags",
      render: (row) =>
        row.tagIds?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {row.tagIds.map((tag, index) => (
              <span
                key={tag._id || `${tag.name}-${index}`}
                className="rounded-full border border-[#DCC9A5] bg-[#F3E6CC]/60 px-3 py-1 text-xs font-semibold text-[#806C52]"
              >
                {tag?.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-[#95846D]">-</span>
        ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.isActive
              ? "bg-[#9B7A43]/15 text-[#806C52]"
              : "bg-[#963F32]/10 text-[#963F32]"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "dates",
      label: "Dates",
      render: (row) => {
        return (
          <div className="space-y-1.5 text-xs">
            <p className="text-[#4B3929]">
              <span className="font-semibold text-[#806C52]">Published:</span>{" "}
              {dateHandler(row.publishedAt)}
            </p>

            <p className="text-[#6F665D]">
              <span className="font-semibold">Updated:</span>{" "}
              {dateHandler(row.updatedAt)}
            </p>

            <p className="text-[#6F665D]">
              <span className="font-semibold">Created:</span>{" "}
              {dateHandler(row.createdAt)}
            </p>
          </div>
        );
      },
    },
  ];

  const actionsData = (row) => [
    {
      type: "edit",
      label: "Edit",
      link: `/blogs/edit/${row._id}`,
    },
    {
      type: "delete",
      label: "Delete",
      onClick: () => handleDeleteBlog(row._id),
      confirmTitle: "Delete blog?",
      confirmMessage: "Are you sure you want to delete this blog?",
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Blogs</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All blogs of SWAAD.</p>
      </div>

      <CustomTable
        columns={blogsColumns}
        data={blogs}
        title="Blogs"
        addButtonText="Add Blog"
        onAdd="/blogs/add"
        actions={actionsData}
      />
    </>
  );
}
