import CustomTable from "@/components/ui/table/customTable";
import { pageFaqApi } from "../../../api.service";
import { useEffect, useState } from "react";

export default function PageFaq() {
  const [pageFaqs, setPageFaqs] = useState([]);

  useEffect(() => {
    const fetchAllFaqPages = async () => {
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
    };

    fetchAllFaqPages();
  }, []);

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
      />
    </>
  );
}
