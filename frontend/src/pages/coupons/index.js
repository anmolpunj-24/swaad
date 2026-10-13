import CustomTable from "@/components/ui/table/customTable";
import { couponApi } from "../../../api.service";
import { useEffect, useState } from "react";
import { dateHandler } from "@/utils/dateHandler";
import { toast } from "sonner";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchAllCoupons = async () => {
      try {
        const res = await couponApi.getAll();

        if (res?.status === 200) {
          const formattedCoupons = res?.data?.coupons.map((coupon) => ({
            ...coupon,
            startDate: dateHandler(coupon?.startDate),
            endDate: dateHandler(coupon?.endDate),
          }));
          setCoupons(formattedCoupons);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Failed to fetch coupons!",
        );
      }
    };

    fetchAllCoupons();
  }, []);

  const couponsColumns = [
    {
      key: "code",
      label: "Coupon Code",
    },
    {
      key: "discountType",
      label: "Type",
    },
    {
      key: "discountValue",
      label: "Value",
    },
    {
      key: "maxDiscountAmount",
      label: "Max Discount Amount",
    },
    {
      key: "startDate",
      label: "Start Date",
    },
    {
      key: "endDate",
      label: "End Date",
    },
    {
      key: "usedCount",
      label: "Used Count",
    },
    {
      key: "usageLimit",
      label: "Limit",
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.isActive
              ? "bg-[#9B7A43]/15 text-[#806C52]"
              : "bg-[#963F32]/10 text-[#963F32]"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Coupons</h1>

        <p className="mt-1 text-sm text-[#6f665d]">All coupons of SWAAD.</p>
      </div>

      <CustomTable
        columns={couponsColumns}
        data={coupons}
        title="Coupons"
        addButtonText="Add Coupon"
        onAdd="/coupons/add"
      />
    </>
  );
}
