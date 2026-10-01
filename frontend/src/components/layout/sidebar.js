import {
  LayoutDashboard,
  Users,
  Tags,
  Store,
  ScanSearch,
  CircleHelp,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Category",
    href: "/category",
    icon: Tags,
  },
  {
    label: "Products",
    href: "/products",
    icon: Store,
  },
  {
    label: "Pages Seo",
    href: "/page-seo",
    icon: ScanSearch,
  },
  {
    label: "Pages Faqs",
    href: "/page-faq",
    icon: CircleHelp,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="shrink-0 bg-[#2A2622] text-[#F7F4EC] min-w-[13rem] min-h-full p-4">
      <nav className="flex flex-col gap-1.5">
        {sidebarItems.map(({ label, href, icon: Icon }) => {
          const isActive = router.pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`${
                isActive
                  ? "bg-[#37312C] border-[#51483F] text-[#FFFDF8]"
                  : "text-[#D8D0C4] border-transparent"
              } group flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 hover:bg-[#37312C] hover:border-[#51483F] hover:text-[#FFFDF8]`}
            >
              <Icon
                size={19}
                className="transition-transform duration-200 group-hover:scale-105"
              />

              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}