import { Plus, Search } from "lucide-react";

export default function TableHeader({
  title = "",
  total = 0,
  searchValue = "",
  onSearch,
  onAdd,
  addButtonText = "Add", 
}) {
  return (
    <div className="bg-[#FFF8E7]">
      <div className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#806C52]">Total</span>

          <span className="rounded-full bg-[#9B7A43]/15 px-3 py-1 text-xs font-bold text-[#806C52]">
            {total}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#806C52]"
            />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full rounded-full bg-[#F3E8D0]/50 py-2.5 pl-10 pr-4 text-sm text-[#3E3021] outline-none transition-all duration-200 placeholder:text-[#806C52]/60 focus:bg-[#F3E8D0] sm:w-64"
            />
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center gap-2 rounded-full bg-[#463421] px-5 py-2.5 text-sm font-medium tracking-wide text-[#FFF8E7] transition-all duration-200 hover:bg-[#59432C] hover:cursor-pointer"
          >
            <Plus size={17} />
            {addButtonText}
          </button>
        </div>
      </div>

      <div className="px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-[#9B7A43]/40 to-transparent" />
      </div>
    </div>
  );
}
