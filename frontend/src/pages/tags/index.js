import CustomTable from "@/components/ui/table/customTable";
import { tagApi } from "../../../api.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const res = await tagApi.getAll();

        if (res?.status === 200) {
          setTags(res?.data?.tags);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message ?? "Failed to fetch tags!");
      }
    };

    fetchAllTags();
  }, []);

  const tagsColumns = [
    {
      key: "name",
      label: "Tag Name",
    },
    {
      key: "slug",
      label: "Slug",
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
  ];

  const actionsData = (row) => [
    {
      type: "edit",
      label: "Edit",
      link: `/tags/edit/${row._id}`,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Tags</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All tags of SWAAD.</p>
      </div>

      <CustomTable
        columns={tagsColumns}
        data={tags}
        title="Tags"
        addButtonText="Add Tag"
        onAdd="/tags/add"
        actions={actionsData}
      />
    </>
  );
}
