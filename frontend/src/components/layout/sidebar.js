import {
  LayoutDashboard,
  Users,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-[#2A2622] text-[#F7F4EC] min-w-[14rem] min-h-full p-4">
      <nav className="flex flex-col gap-1.5">

        <Link
          href="#"
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
          href="#"
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

        <div>
          <button
            className="group w-full flex items-center justify-between
            px-3 py-2.5 rounded-lg
            text-[#D8D0C4]
            border border-transparent
            transition-all duration-200
            hover:bg-[#37312C]
            hover:border-[#51483F]
            hover:text-[#FFFDF8]"
          >
            <div className="flex items-center gap-3">
              <Users
                size={19}
                
                className="transition-transform duration-200 group-hover:scale-105"
              />

              <span className="text-sm font-medium">
                Customers
              </span>
            </div>

            <ChevronDown
              size={17}
              className="text-[#AFA69A] transition-transform duration-200"
            />
          </button>

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

            <Link
              href="#"
              className="group flex items-center gap-3 px-3 py-2 rounded-md
              text-sm text-[#AFA69A]
              transition-all duration-200
              hover:bg-[#37312C]
              hover:text-[#FFFDF8]"
            >
              <MapPin
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />

              <span>Addresses</span>
            </Link>

          </div>
        </div>

      </nav>
    </aside>
  );
}