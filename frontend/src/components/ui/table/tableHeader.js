import { Search } from "lucide-react";

export default function TableHeader({
  title = "",
  total = 0,
  searchValue = "",
  onSearch,
  onSearchSubmit,
  onAdd,
  addButtonText,
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
          <form
            className="w-full sm:w-auto"
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit?.();
            }}
          >
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearch?.(e.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`}
                className="w-full rounded-full border border-[#DDD3C1] bg-[#F3E8D0]/50 py-2.5 pl-4 pr-12 text-sm text-[#3E3021] outline-none transition-all duration-200 placeholder:text-[#806C52]/60 focus:border-[#B28B4C] focus:bg-[#F3E8D0] sm:w-64"
              />

              <button
                type="submit"
                aria-label={`Search ${title.toLowerCase()}`}
                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#463421] text-[#FFF8E7] transition-colors hover:bg-[#59432C] hover:cursor-pointer"
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {addButtonText && (
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center justify-center gap-2 rounded-full bg-[#463421] px-5 py-2.5 text-sm font-medium tracking-wide text-[#FFF8E7] transition-all duration-200 hover:cursor-pointer hover:bg-[#59432C]"
            >
              {addButtonText}
            </button>
          )}
        </div>
      </div>

      <div className="px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-[#9B7A43]/40 to-transparent" />
      </div>
    </div>
  );
}
