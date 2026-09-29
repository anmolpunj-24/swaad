import CustomTable from "@/components/ui/table/customTable";
import { orderApi } from "../../../api.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await orderApi.getAll();

        if (res?.status === 200) {
          setOrders(res?.data?.orders);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Failed to fetch orders!",
        );
      }
    };

    fetchAllOrders();
  }, []);

  const ordersColumns = [
    {
      key: "customerUuid",
      label: "Customer UUID",
    },
    {
      key: "status",
      label: "Order Status",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.status === "delivered"
              ? "bg-[#9B7A43]/15 text-[#806C52]"
              : row.status === "cancelled"
                ? "bg-[#963F32]/10 text-[#963F32]"
                : "bg-[#E7DFD1] text-[#665A4B]"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            row.paymentStatus === "paid"
              ? "bg-[#9B7A43]/15 text-[#806C52]"
              : row.paymentStatus === "failed"
                ? "bg-[#963F32]/10 text-[#963F32]"
                : "bg-[#E7DFD1] text-[#665A4B]"
          }`}
        >
          {row.paymentStatus}
        </span>
      ),
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      render: (row) => `₹${row.totalAmount?.toFixed(2) ?? "0.00"}`,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2A2622]">Orders</h1>

        <p className="mt-1 text-sm text-[#6f665d]">
          All orders placed on SWAAD.
        </p>
      </div>

      <CustomTable columns={ordersColumns} data={orders} title="Orders" />
    </>
  );
}
