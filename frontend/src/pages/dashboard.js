import { useEffect, useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
  Plus,
  FolderPlus,
  UserPlus,
  Clock3,
  CheckCircle2,
  XCircle,
  ScanSearch,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { dashboardApi } from "../../api.service";
import Link from "next/link";
import { toast } from "sonner";
import GenericSelect from "@/components/ui/genericSelect";

export default function Dashboard() {
  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    String(currentDate.getMonth() + 1),
  );
  const [selectedYear, setSelectedYear] = useState(
    String(currentDate.getFullYear()),
  );
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const years = Array.from(
    { length: 6 },
    (_, index) => currentDate.getFullYear() - index,
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const response = await dashboardApi(selectedMonth, selectedYear);
        setDashboardData(response.data.data);
      } catch (error) {
        toast.error("Unable to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedMonth, selectedYear]);
  const summary = dashboardData?.summary;
  const monthlyOrders = dashboardData?.monthlyOrders;

  const stats = [
    {
      title: "Total Customers",
      value: summary?.totalCustomers ?? 0,
      icon: Users,
    },
    {
      title: "Total Products",
      value: summary?.totalProducts ?? 0,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: summary?.totalOrders ?? 0,
      icon: ShoppingCart,
    },
    {
      title: "Delivered Orders",
      value: monthlyOrders?.delivered ?? 0,
      icon: IndianRupee,
    },
  ];

  const quickActions = [
    { title: "Add Product", icon: Plus, href: "/products/add" },
    { title: "Add Blog", icon: FolderPlus, href: "/blogs/add" },
    { title: "Add FAQ", icon: ScanSearch, href: "/page-faq/add" },
    { title: "Add User", icon: UserPlus, href: "/users/add" },
  ];

  const orderStats = [
    {
      title: "Completed",
      value: monthlyOrders?.delivered ?? 0,
      icon: CheckCircle2,
    },
    {
      title: "Processing",
      value: monthlyOrders?.processing ?? 0,
      icon: Clock3,
    },
    {
      title: "Pending",
      value: monthlyOrders?.pending ?? 0,
      icon: Clock3,
    },
    {
      title: "Shipped",
      value: monthlyOrders?.shipped ?? 0,
      icon: Truck,
    },
    {
      title: "Cancelled",
      value: monthlyOrders?.cancelled ?? 0,
      icon: XCircle,
    },
    {
      title: "Returned",
      value: monthlyOrders?.returned ?? 0,
      icon: RefreshCcw,
    },
  ];

  const salesOverview = dashboardData?.salesOverview ?? [];
  const maxOrders = Math.max(
    ...salesOverview.map((item) => item.totalOrders),
    1,
  );

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-[#4B3927]">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-[#806C52]">
          Welcome back! Here's what's happening with SWAAD today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#806C52]">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-wide text-[#4B3927]">
                    {loading ? "..." : stat.value.toLocaleString("en-IN")}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#806C52] transition-all duration-300 group-hover:bg-[#9B7A43]/20">
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold tracking-wide text-[#4B3927]">
            Quick Actions
          </h2>

          <div className="mt-2 h-px bg-gradient-to-r from-[#9B7A43]/40 via-[#9B7A43]/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7A43]/40 hover:bg-[#F3E8D0]/50 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#463421] text-[#FFF8E7] transition-all duration-300 group-hover:bg-[#59432C]">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-[#4B3927]">{action.title}</p>
                  <p className="mt-0.5 text-xs text-[#806C52]">Create new</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-wide text-[#4B3927]">
                Sales Overview
              </h2>

              <p className="mt-1 text-xs text-[#806C52]">
                Daily orders, excluding cancelled and returned orders
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:w-[280px]">
              <GenericSelect
                id="dashboard-month"
                variant="cream"
                label="Month"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </GenericSelect>

              <GenericSelect
                id="dashboard-year"
                variant="cream"
                label="Year"
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </GenericSelect>
            </div>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center text-sm text-[#806C52]">
              Loading sales overview...
            </div>
          ) : salesOverview.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-[#806C52]">
              No order data available for this month.
            </div>
          ) : (
            <>
              <div className="mt-7 flex h-64 items-end gap-2 overflow-x-auto border-b border-[#9B7A43]/20 px-2 pb-0">
                {salesOverview.map((item) => {
                  const height = Math.max(
                    (item.totalOrders / maxOrders) * 100,
                    3,
                  );

                  return (
                    <div
                      key={item.date}
                      className="group flex h-full min-w-5 flex-1 items-end"
                      title={`${item.date}: ${item.totalOrders} orders | ${item.shipped} shipped | ${item.delivered} delivered`}
                    >
                      <div
                        className="w-full rounded-t-lg bg-[#9B7A43]/60 transition-all duration-300 group-hover:bg-[#463421]"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto px-1 text-[10px] text-[#806C52]/70">
                {salesOverview.map((item) => (
                  <span key={item.date} className="min-w-5 flex-1 text-center">
                    {new Date(`${item.date}T12:00:00`).getDate()}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#806C52]">
                <span>
                  <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm bg-[#9B7A43]/60" />
                  Total orders
                </span>
                <span>Hover over a bar for order details</span>
              </div>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-bold tracking-wide text-[#4B3927]">
              Order Summary
            </h2>
            <p className="mt-1 text-xs text-[#806C52]">
              Orders for{" "}
              {months.find((month) => month.value === selectedMonth)?.label}{" "}
              {selectedYear}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {orderStats.map((order) => {
              const Icon = order.icon;

              return (
                <div
                  key={order.title}
                  className="flex items-center justify-between rounded-xl bg-[#F3E8D0]/40 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-[#806C52]" />

                    <span className="text-sm font-medium text-[#4B3927]">
                      {order.title}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-[#806C52]">
                    {loading ? "..." : order.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 border-t border-[#9B7A43]/20 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#806C52]">
                Total Orders for Selected Month
              </span>

              <span className="text-lg font-bold text-[#4B3927]">
                {loading ? "..." : (monthlyOrders?.total ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
