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
      key: "_id",
      label: "Order ID",
    },
    {
      key: "customerUuid",
      label: "Customer UUID",
    },
    {
      key: "shippingAddress",
      label: "Customer Name",
      render: (row) => row.shippingAddress?.name || "-",
    },
    {
      key: "shippingAddress",
      label: "Customer Phone",
      render: (row) => row.shippingAddress?.phone || "-",
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
      key: "subtotal",
      label: "Subtotal",
      render: (row) => `₹${row.subtotal?.toFixed(2) ?? "0.00"}`,
    },
    {
      key: "discount",
      label: "Discount",
      render: (row) => `₹${row.discount?.toFixed(2) ?? "0.00"}`,
    },
    {
      key: "shippingAmount",
      label: "Shipping Amount",
      render: (row) => `₹${row.shippingAmount?.toFixed(2) ?? "0.00"}`,
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      render: (row) => `₹${row.totalAmount?.toFixed(2) ?? "0.00"}`,
    },
    {
      key: "currency",
      label: "Currency",
    },
    {
      key: "shippingProvider",
      label: "Shipping Provider",
      render: (row) => row.shippingProvider || "-",
    },
    {
      key: "shipmentTrackingId",
      label: "Tracking ID",
      render: (row) => row.shipmentTrackingId || "-",
    },
    {
      key: "shippingAddress",
      label: "Shipping Address",
      render: (row) => {
        const address = row.shippingAddress;

        if (!address) return "-";

        return (
          <div className="min-w-[260px] max-w-[300px] max-h-[50px] overflow-y-auto pr-2 text-sm leading-6">
            <p>{address.addressLine1 || "-"}</p>

            <p>
              {address.addressLine2 && `${address.addressLine2}, `}
              {address.city || "-"}, {address.state || "-"} -{" "}
              {address.pincode || "-"}
            </p>

            <p>{address.country || "-"}</p>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
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
