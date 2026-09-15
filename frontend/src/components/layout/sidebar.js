import { LayoutDashboard, Users, MapPin, ChevronRight, Tags } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [customersOpen, setCustomersOpen] = useState(false);

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

        {/* <div>
          <button
            onClick={() => setCustomersOpen((prev) => !prev)}
            aria-expanded={customersOpen}
            className="group w-full flex items-center justify-between
            px-3 py-2.5 rounded-lg
            text-[#D8D0C4]
            border border-transparent
            transition-all duration-200
            hover:bg-[#37312C]
            hover:border-[#51483F]
            hover:text-[#FFFDF8]
            hover:cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Users
                size={19}
                className="transition-transform duration-200 group-hover:scale-105"
              />

              <span className="text-sm font-medium">Customers</span>
            </div>

            <ChevronRight
              size={17}
              className={`text-[#AFA69A] transition-transform duration-200 ${
                customersOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {customersOpen && (
            <div className="ml-5 mt-1 pl-4 border-l border-[#51483F] flex flex-col gap-0.5">
              <Link
                href="#"
                className="group flex items-center gap-3 px-3 py-2 rounded-md
              text-sm text-[#AFA69A]
              transition-all duration-200
              hover:bg-[#37312C]
              hover:text-[#FFFDF8]"
              >
                <Users
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />

                <span>All Customers</span>
              </Link>
            </div>
          )}
        </div> */}
      </nav>
    </aside>
  );
}
