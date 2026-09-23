import { LayoutDashboard, Users, Tags, Store, ScanSearch } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="shrink-0 bg-[#2A2622] text-[#F7F4EC] min-w-[13rem] min-h-full p-4">
      <nav className="flex flex-col gap-1.5">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-[#D8D0C4]
          border border-transparent
          transition-all duration-200
          hover:bg-[#37312C]
          hover:border-[#51483F]
          hover:text-[#FFFDF8]"
        >
          <LayoutDashboard
            size={19}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link
          href="/users"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-[#D8D0C4]
          border border-transparent
          transition-all duration-200
          hover:bg-[#37312C]
          hover:border-[#51483F]
          hover:text-[#FFFDF8]"
        >
          <Users
            size={19}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-medium">Users</span>
        </Link>

        <Link
          href="/customers"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-[#D8D0C4]
          border border-transparent
          transition-all duration-200
          hover:bg-[#37312C]
          hover:border-[#51483F]
          hover:text-[#FFFDF8]"
        >
          <Users
            size={19}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-medium">Customers</span>
        </Link>

        <Link
          href="/category"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-[#D8D0C4]
          border border-transparent
          transition-all duration-200
          hover:bg-[#37312C]
          hover:border-[#51483F]
          hover:text-[#FFFDF8]"
        >
          <Tags
            size={19}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-medium">Category</span>
        </Link>

        <Link
          href="/products"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-[#D8D0C4]
          border border-transparent
          transition-all duration-200
          hover:bg-[#37312C]
          hover:border-[#51483F]
          hover:text-[#FFFDF8]"
        >
          <Store
            size={19}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-medium">Products</span>
        </Link>

        <Link
          href="/page-seo"
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-[#D8D0C4]
          border border-transparent
          transition-all duration-200
          hover:bg-[#37312C]
          hover:border-[#51483F]
          hover:text-[#FFFDF8]"
        >
          <ScanSearch
            size={19}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-medium">Pages Seo</span>
        </Link>
      </nav>
    </aside>
  );
}
