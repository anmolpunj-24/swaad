import CustomTable from "@/components/ui/table/customTable";
import { pageFaqApi } from "../../../api.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function PageFaq() {
  const [pageFaqs, setPageFaqs] = useState([]);

  const fetchAllFaqPages = useCallback(async () => {
    try {
      const res = await pageFaqApi.getAll();

      if (res?.status === 200) {
        setPageFaqs(res?.data?.faqs);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to fetch faq pages!",
      );
    }
  }, []);

  useEffect(() => {
    fetchAllFaqPages();
  }, [fetchAllFaqPages]);

  const handleDeletePageFaq = async (pageSlug) => {
    try {
      const res = await pageFaqApi.delete(pageSlug);

      if (res?.status === 200) {
        toast.success(res?.data?.message ?? "Page faqs deleted successfully!");
        await fetchAllFaqPages();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to delete page faqs!",
      );
    }
  };

  const faqPagesColumns = [
    {
      key: "pageName",
      label: "Page Name",
    },
    {
      key: "pageSlug",
      label: "Page Slug",
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
      link: `/page-faq/edit/${row.pageSlug}`,
    },
    {
      type: "delete",
      label: "Delete",
      onClick: () => handleDeletePageFaq(row.pageSlug),
      confirmTitle: "Delete page faqs?",
      confirmMessage: "Are you sure you want to delete this page faqs?",
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">FAQ Pages</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All faq pages of SWAAD.</p>
      </div>

      <CustomTable
        columns={faqPagesColumns}
        data={pageFaqs}
        title="FAQ Pages"
        addButtonText="Add FAQ Page"
        onAdd="/page-faq/add"
        actions={actionsData}
      />
    </>
  );
}
