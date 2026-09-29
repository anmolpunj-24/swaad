import CustomTable from "@/components/ui/table/customTable";
import { pageSeoApi } from "../../../api.service";
import { useEffect, useState } from "react";

export default function PageSeo() {
  const [pageSeos, setPageSeos] = useState([]);

  useEffect(() => {
    const fetchAllSeoPages = async () => {
      try {
        const res = await pageSeoApi.getAll();

        if (res?.status === 200) {
          setPageSeos(res?.data?.seos);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Failed to fetch seo pages!",
        );
      }
    };

    fetchAllSeoPages();
  }, []);

  const seoPagesColumns = [
    {
      key: "pageName",
      label: "Page Name",
    },
    {
      key: "slug",
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
        <h1 className="text-2xl font-semibold text-[#2A2622]">SEO Pages</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All seo pages of SWAAD.</p>
      </div>

      <CustomTable
        columns={seoPagesColumns}
        data={pageSeos}
        title="SEO Pages"
        addButtonText="Add SEO Page"
        onAdd="/page-seo/add"
      />
    </>
  );
}
