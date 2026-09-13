import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
  Plus,
  FolderPlus,
  FileText,
  UserPlus,
  TrendingUp,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Customers",
      value: "1,248",
      change: "+12.4%",
      icon: Users,
    },
    {
      title: "Total Products",
      value: "86",
      change: "+5.2%",
      icon: Package,
    },
    {
      title: "Total Orders",
      value: "342",
      change: "+18.2%",
      icon: ShoppingCart,
    },
    {
      title: "Total Revenue",
      value: "₹1,84,500",
      change: "+21.5%",
      icon: IndianRupee,
    },
  ];

  const quickActions = [
    {
      title: "Add Product",
      icon: Plus,
    },
    {
      title: "Add Category",
      icon: FolderPlus,
    },
    {
      title: "Add Blog",
      icon: FileText,
    },
    {
      title: "Add Customer",
      icon: UserPlus,
    },
  ];

  const orderStats = [
    {
      title: "Completed",
      value: 246,
      icon: CheckCircle2,
    },
    {
      title: "Processing",
      value: 42,
      icon: Clock3,
    },
    {
      title: "Pending",
      value: 36,
      icon: Clock3,
    },
    {
      title: "Cancelled",
      value: 18,
      icon: XCircle,
    },
  ];

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
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#806C52] transition-all duration-300 group-hover:bg-[#9B7A43]/20">
                  <Icon size={21} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#806C52]">
                <TrendingUp size={14} />
                <span>{stat.change}</span>
                <span className="font-normal text-[#806C52]/60">
                  from last month
                </span>
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
              <button
                key={action.title}
                type="button"
                className="group flex items-center gap-4 rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9B7A43]/40 hover:bg-[#F3E8D0]/50 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#463421] text-[#FFF8E7] transition-all duration-300 group-hover:bg-[#59432C]">
                  <Icon size={20} />
                </div>

                <div>
                  <p className="font-semibold text-[#4B3927]">{action.title}</p>

                  <p className="mt-0.5 text-xs text-[#806C52]">Create new</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-wide text-[#4B3927]">
                Sales Overview
              </h2>

              <p className="mt-1 text-xs text-[#806C52]">
                Monthly sales performance
              </p>
            </div>

            <span className="rounded-full bg-[#9B7A43]/15 px-3 py-1 text-xs font-semibold text-[#806C52]">
              This Year
            </span>
          </div>

          <div className="mt-7 flex h-64 items-end gap-3 border-b border-[#9B7A43]/20 px-2 pb-0">
            {[45, 60, 52, 72, 64, 82, 68, 91, 76, 88, 79, 96].map(
              (height, index) => (
                <div key={index} className="group flex h-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-[#9B7A43]/60 transition-all duration-300 group-hover:bg-[#463421]"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ),
            )}
          </div>

          <div className="mt-3 flex justify-between px-1 text-[10px] text-[#806C52]/70">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#9B7A43]/20 bg-[#FFF8E7] p-5 shadow-sm">
          <div>
            <h2 className="text-lg font-bold tracking-wide text-[#4B3927]">
              Order Summary
            </h2>

            <p className="mt-1 text-xs text-[#806C52]">Current order status</p>
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
                    {order.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 border-t border-[#9B7A43]/20 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#806C52]">
                Total Orders
              </span>

              <span className="text-lg font-bold text-[#4B3927]">342</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
