import { ChevronLeft, ChevronRight } from "lucide-react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CustomTable({
  columns = [],
  data = [],
  actions = [],
  onAction,
  addButtonText,
  title,
  onAdd,
}) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const paginatedData = data?.slice(startIndex, startIndex + rowsPerPage);

  // Dummy actions for now
  const dummyActions = [
    {
      type: "view",
      label: "View",
    },
    {
      type: "edit",
      label: "Edit",
    },
    {
      type: "delete",
      label: "Delete",
    },
    {
      type: "info",
      label: "Info",
    },
  ];

  const getPaginationPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const paginationPages = getPaginationPages();

  return (
    <>
      <div className="w-full overflow-hidden rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] shadow-sm">
        <TableHeader
          title={title}
          total={data.length}
          searchValue=""
          onSearch={(value) => console.log("Search:", value)}
          onAdd={() => router.push(onAdd)}
          addButtonText={addButtonText}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-[#9B7A43]/20 bg-[#F3E8D0]/60">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#4B3927]"
                  >
                    {column.label}
                  </th>
                ))}

                {dummyActions.length > 0 && (
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#4B3927]">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <TableBody
              columns={columns}
              data={paginatedData}
              actions={dummyActions}
              onAction={(action, row) => {}}
            />
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5DED2] px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#766B5F]">
          <span>Records per page</span>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-9 rounded-lg border border-[#E5DED2] bg-white px-3 text-sm font-medium text-[#665A4B] outline-none transition-colors focus:border-[#9B7A43] focus:ring-1 focus:ring-[#9B7A43]/20"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED2] text-[#766B5F] transition-colors hover:bg-[#F3E8D0] hover:text-[#665A4B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {paginationPages.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-1 text-[#A69A8B]">
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#9B7A43] text-white"
                    : "border border-transparent text-[#665A4B] hover:border-[#E5DED2] hover:bg-[#F7F4EC]"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5DED2] text-[#766B5F] transition-colors hover:bg-[#F3E8D0] hover:text-[#665A4B] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
