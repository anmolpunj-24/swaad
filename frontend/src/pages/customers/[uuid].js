import {
  ArrowLeft,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  Package,
  Mail,
  Phone,
  CalendarDays,
  UserRound,
  ChevronRight,
  Clock3,
  CheckCircle2,
  Truck,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { customerApi } from "../../../api.service";
import { dateHandler } from "@/utils/dateHandler";
import { toast } from "sonner";
import InfoItem from "@/components/ui/customer/infoItem";
import EmptyState from "@/components/ui/customer/emptyState";
import SectionHeader from "@/components/ui/customer/sectionHeader";

export default function CustomerInfo() {
  const router = useRouter();

  const { uuid } = router.query;

  const [customer, setCustomer] = useState({});

  console.log(customer);

  useEffect(() => {
    if (!router.isReady || !uuid) return;

    const fetchOneCustomer = async () => {
      try {
        const res = await customerApi.getOne(uuid);

        if (res.status === 200) {
          const oneCustomerData = res?.data?.customer;

          setCustomer({
            ...oneCustomerData,
            dob: oneCustomerData?.dob ? dateHandler(oneCustomerData?.dob) : "-",
          });
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Failed to fetch customer!",
        );
      }
    };

    fetchOneCustomer();
  }, [router.isReady, uuid]);

  const cartTotal =
    customer?.cart &&
    customer?.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const getOrderStatus = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: CheckCircle2,
          className: "bg-[#E6F3EA] text-[#36734A]",
        };

      case "Processing":
        return {
          icon: Clock3,
          className: "bg-[#FFF1D6] text-[#9A6B20]",
        };

      case "Cancelled":
        return {
          icon: Package,
          className: "bg-[#F8E5E1] text-[#A34D3F]",
        };

      default:
        return {
          icon: Truck,
          className: "bg-[#EEEAE2] text-[#625A50]",
        };
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-3xl border border-[#E7DDCA] bg-white text-[#6B5841] transition hover:border-[#C9A96A] hover:bg-[#FBF7EE] hover:cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#33281F]">
              Customer detail
            </h1>

            <p className="mt-1 text-sm text-[#88765E]">
              Review customer details, saved addresses, cart activity, and
              complete order history.
            </p>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[22px] border border-[#E5DED1] bg-white">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#F3E8D0]/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-40 h-32 w-32 rounded-full bg-[#F7F4EC] blur-2xl" />

        <div className="relative p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[20px] bg-[#F3E8D0] text-[#8B6B38]">
                  <UserRound size={32} strokeWidth={1.7} />
                </div>

                <span
                  className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-[3px] border-white ${
                    customer?.isActive ? "bg-[#72A87D]" : "bg-[#A7A19A]"
                  }`}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-[26px] font-bold tracking-[-0.02em] text-[#2A2622]">
                    {customer?.name}
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      customer?.isActive
                        ? "bg-[#E6F3EA] text-[#36734A]"
                        : "bg-[#EEEAE8] text-[#746D66]"
                    }`}
                  >
                    {customer?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#81776D]">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} />
                    {customer?.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone size={14} />
                    {customer?.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E9E2D7] bg-[#FCFAF5] px-5 py-3.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#978C80]">
                Customer ID
              </p>

              <p className="mt-1 font-mono text-sm font-semibold tracking-wide text-[#63594F]">
                #{customer?.uuid}
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 border-t border-[#EEE8DE] pt-5 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem
              icon={UserRound}
              label="Gender"
              value={customer?.gender ?? "-"}
            />

            <InfoItem
              icon={CalendarDays}
              label="Date of Birth"
              value={customer?.dob ?? "-"}
            />

            <InfoItem
              icon={MapPin}
              label="Saved Addresses"
              value={`${customer?.addresses?.length || 0} ${
                customer?.addresses?.length === 1 ? "Address" : "Addresses"
              }`}
            />

            <InfoItem
              icon={CalendarDays}
              label="Customer Since"
              value={dateHandler(customer?.createdAt) ?? "-"}
            />
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className="overflow-hidden rounded-[20px] border border-[#E5DED1] bg-[#F7F4EC]">
          <SectionHeader
            icon={MapPin}
            title="Addresses"
            subtitle={`${customer?.addresses?.length || 0} saved ${
              customer?.addresses?.length === 1 ? "address" : "addresses"
            }`}
          />

          <div className="space-y-3 p-5">
            {customer?.addresses?.length > 0 ? (
              customer?.addresses.map((address, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E5DED1] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#8B6B38]">
                        <MapPin size={17} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-[#332E29]">
                            {address?.addressType}
                          </h3>

                          {address?.isDefault && (
                            <span className="rounded-full bg-[#F3E8D0] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#87652F]">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-1.5 text-sm leading-6 text-[#746B61]">
                          {address?.addressLine_1}
                          {address?.addressLine_2 &&
                            `, ${address?.addressLine_2}`}
                          <br />
                          {address?.city}, {address?.state} -{" "}
                          {address?.postalCode}
                          <br />
                          {address?.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={MapPin}
                title="No addresses"
                text="This customer has no saved addresses."
              />
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[20px] border border-[#E5DED1] bg-white">
          <SectionHeader
            icon={ShoppingCart}
            title="Cart"
            subtitle={`${customer?.cart?.length || 0} ${
              customer?.cart?.length === 1 ? "item" : "items"
            } currently saved`}
            light
          />

          <div className="px-5 pb-5">
            {customer?.cart?.length > 0 ? (
              <>
                <div className="divide-y divide-[#EEE8DE]">
                  {customer?.cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EC] text-[#9A7840]">
                          <ShoppingBag size={18} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#38312B]">
                            {item?.name}
                          </p>

                          <p className="mt-0.5 text-xs text-[#93887D]">
                            {item?.variant} · Qty {item?.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-[#3A332D]">
                        {formatPrice(item?.price * item?.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between rounded-2xl bg-[#F3E8D0] px-5 py-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#80643A]">
                    Cart Total
                  </span>

                  <span className="text-lg font-extrabold text-[#4C3B26]">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </>
            ) : (
              <EmptyState
                icon={ShoppingCart}
                title="Cart is empty"
                text="This customer has no items in their cart."
              />
            )}
          </div>
        </section>
      </div>

      <section className="mt-5 overflow-hidden rounded-[20px] border border-[#E5DED1] bg-white">
        <SectionHeader
          icon={Package}
          title="Order History"
          subtitle={`${customer?.orders?.length || 0} ${
            customer?.orders?.length === 1 ? "order" : "orders"
          } placed`}
          light
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-y border-[#EEE8DE] bg-[#FCFAF5]">
                <th className="px-6 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#91867B]">
                  Order
                </th>

                <th className="px-6 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#91867B]">
                  Date
                </th>

                <th className="px-6 py-3.5 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#91867B]">
                  Status
                </th>

                <th className="px-6 py-3.5 text-right text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#91867B]">
                  Amount
                </th>

                <th className="w-10 px-6 py-3.5" />
              </tr>
            </thead>

            <tbody>
              {customer?.orders?.length > 0 ? (
                customer?.orders.map((order) => {
                  const status = getOrderStatus(order?.status);
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#F0EBE3] transition hover:bg-[#FCFAF5]"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-bold tracking-wide text-[#4C443C]">
                          #{order?._id}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#766D64]">
                        {dateHandler(order?.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${status.className}`}
                        >
                          <StatusIcon size={13} />
                          {order?.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-extrabold text-[#38312B]">
                        {formatPrice(order?.totalAmount)}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A0968C] transition hover:bg-[#F3E8D0] hover:text-[#70562D]"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      icon={Package}
                      title="No orders"
                      text="This customer has not placed any orders yet."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {customer?.orders?.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EEE8DE] bg-[#FCFAF5] px-6 py-4">
            <div className="flex items-center gap-2 text-xs text-[#82786E]">
              <CreditCard size={14} />
              <span>Customer order history</span>
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-bold text-[#8B6B38] transition hover:text-[#60491F]"
            >
              View all orders
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
