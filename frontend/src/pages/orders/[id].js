import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  RefreshCw,
  Truck,
  UserRound,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import GenericSelect from "@/components/ui/genericSelect";
import GenericInput from "@/components/ui/genericInput";
import { orderApi } from "../../../api.service";
import { dateHandler } from "@/utils/helperFunctions/dateHandler";
import GlobalLoader from "@/components/ui/globalLoader";
import { currencyHandler } from "@/utils/helperFunctions/currencyHandler";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import OrderReceiptPdf from "@/utils/orderRecipt/orderReciptPdf";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const formatLabel = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "-";

function DetailItem({ label, value, className = "" }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="mb-1 text-xs font-medium text-[#95846D]">{label}</p>
      <p className="break-words text-sm font-semibold text-[#463525]">
        {value || "-"}
      </p>
    </div>
  );
}

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);
  const [savingShipment, setSavingShipment] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const [shipmentForm, setShipmentForm] = useState({
    shippingProvider: "",
    shipmentTrackingId: "",
    shipmentTrackingUrl: "",
  });

  const fetchOrder = useCallback(async () => {
    if (!id || typeof id !== "string") return;

    try {
      setLoading(true);

      const response = await orderApi.getOne(id);
      const orderData = response?.data?.order;

      if (!orderData?._id) {
        throw new Error("Order details were not found.");
      }

      setOrder(orderData);
      setShipmentForm({
        shippingProvider: orderData.shippingProvider || "",
        shipmentTrackingId: orderData.shipmentTrackingId || "",
        shipmentTrackingUrl: orderData.shipmentTrackingUrl || "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch order details!",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (router.isReady) {
      fetchOrder();
    }
  }, [router.isReady, fetchOrder]);

  const updateOrderField = async (field, value) => {
    if (!order || order[field] === value) return;

    const isStatus = field === "status";

    if (isStatus) {
      setSavingStatus(true);
    } else {
      setSavingPayment(true);
    }

    try {
      const response = await orderApi.update(order.customerUuid, order._id, {
        [field]: value,
      });

      const updatedOrder = response.data?.order;

      setOrder((previous) => ({
        ...previous,
        ...(updatedOrder && typeof updatedOrder === "object"
          ? updatedOrder
          : {}),
        [field]: updatedOrder?.[field] ?? value,
      }));

      toast.success(
        isStatus
          ? "Order status updated successfully!"
          : "Payment status updated successfully!",
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          `Failed to update ${isStatus ? "order" : "payment"} status!`,
      );
    } finally {
      setSavingStatus(false);
      setSavingPayment(false);
    }
  };

  const handleShipmentChange = (event) => {
    const { name, value } = event.target;

    setShipmentForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveOrderChanges = async () => {
    if (!order) return;

    const payload = {
      shippingProvider: shipmentForm.shippingProvider.trim() || null,
      shipmentTrackingId: shipmentForm.shipmentTrackingId.trim() || null,
      shipmentTrackingUrl: shipmentForm.shipmentTrackingUrl.trim() || null,
    };

    if (
      payload.shippingProvider === (order.shippingProvider || null) &&
      payload.shipmentTrackingId === (order.shipmentTrackingId || null) &&
      payload.shipmentTrackingUrl === (order.shipmentTrackingUrl || null)
    ) {
      toast.info("No order changes to save!");
      return;
    }

    try {
      setSavingShipment(true);

      const response = await orderApi.update(
        order.customerUuid,
        order._id,
        payload,
      );
      const updatedOrder = response.data?.order;

      setOrder((previous) => ({
        ...previous,
        ...(updatedOrder && typeof updatedOrder === "object"
          ? updatedOrder
          : {}),
        shippingProvider:
          updatedOrder?.shippingProvider ?? payload.shippingProvider,
        shipmentTrackingId:
          updatedOrder?.shipmentTrackingId ?? payload.shipmentTrackingId,
        shipmentTrackingUrl:
          updatedOrder?.shipmentTrackingUrl ?? payload.shipmentTrackingUrl,
      }));

      toast.success("Order changes saved successfully!");

      router.push("/orders");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save order changes!",
      );
    } finally {
      setSavingShipment(false);
    }
  };

  if (loading) {
    return <GlobalLoader />;
  }

  if (!order) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <Package size={40} className="text-[#B28B4C]" />

        <h2 className="text-lg font-bold text-[#463525]">Order not found</h2>

        <p className="text-sm text-[#95846D]">
          The order could not be loaded. Please try again.
        </p>

        <button
          type="button"
          onClick={fetchOrder}
          className="rounded-xl bg-[#463421] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#59432C]"
        >
          Try Again
        </button>
      </div>
    );
  }

  const address = order.shippingAddress || {};
  const orderItems = Array.isArray(order.orderItems) ? order.orderItems : [];

  const fullAddress = [
    address.addressLine1,
    address.addressLine2,
    address.landmark ? `Landmark: ${address.landmark}` : null,
    [address.city, address.state].filter(Boolean).join(", "),
    [address.pincode, address.country].filter(Boolean).join(" "),
  ].filter(Boolean);

  const getDisabledOrderStatuses = (currentStatus) => {
    const statusOrder = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
    ];
    const currentIndex = statusOrder.indexOf(currentStatus);

    if (currentIndex === -1) return [];

    return statusOrder.slice(0, currentIndex);
  };

  const handleSendStatusEmail = async () => {
    if (!order?.customerEmail) {
      toast.error("Customer email address not found!");
      return;
    }

    const emailConfig = {
      confirmed: {
        subject: "Order Confirmed",
        label: "Confirmation",
      },
      shipped: {
        subject: "Order Shipped",
        label: "Shipped",
      },
      delivered: {
        subject: "Order Delivered",
        label: "Delivered",
      },
    };

    const config = emailConfig[order.status];

    if (!config) {
      toast.error("Email is not available for this order status!");
      return;
    }

    try {
      setSendingEmail(true);

      await orderApi.sendEmail(order._id, {
        status: order.status,
      });

      toast.success(`${config.label} email sent successfully!`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email!");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-10">
      <div className="flex flex-col justify-between gap-5 border-b border-[#E6DDCD] pb-6 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-start gap-4">
          <Link
            href="/dashboard/orders"
            aria-label="Back to orders"
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl border border-[#E6DDCD] bg-white text-[#66533C] transition hover:bg-[#F3E8D0]"
          >
            <ArrowLeft size={19} />
          </Link>

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#95846D]">
                Order Management
              </span>
            </div>

            <h1 className="break-all text-2xl font-bold tracking-tight text-[#35291E] sm:text-3xl">
              Order #{String(order._id).toUpperCase()}
            </h1>

            <p className="mt-2 flex items-center gap-2 text-sm text-[#806C52]">
              <CalendarDays size={15} />
              Placed on {dateHandler(order.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <PDFDownloadLink
            document={<OrderReceiptPdf order={order} />}
            fileName={`SWAAD-Order-${order._id}-Receipt.pdf`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#463421] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#59432C] sm:w-auto"
          >
            {({ loading: pdfLoading, error }) => (
              <>
                {pdfLoading ? (
                  <RefreshCw size={17} className="animate-spin" />
                ) : (
                  <Download size={17} />
                )}

                {pdfLoading
                  ? "Preparing Receipt..."
                  : error
                    ? "Retry Download"
                    : "Download Order Receipt"}
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E6DDCD] bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[#806C52]">
              Order Status
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#8B6937]">
              <Package size={18} />
            </span>
          </div>
          <p className="text-xl font-bold capitalize text-[#35291E]">
            {formatLabel(order.status)}
          </p>
          <p className="mt-1 text-xs text-[#95846D]">
            Current fulfillment stage
          </p>
        </div>

        <div className="rounded-2xl border border-[#E6DDCD] bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[#806C52]">
              Payment Status
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#8B6937]">
              <CreditCard size={18} />
            </span>
          </div>
          <p className="text-xl font-bold capitalize text-[#35291E]">
            {formatLabel(order.paymentStatus)}
          </p>
          <p className="mt-1 text-xs text-[#95846D]">Payment progress</p>
        </div>

        <div className="rounded-2xl border border-[#D9C7A6] bg-[#F7F4EC] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-[#806C52]">
              Order Total
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#8B6937]">
              <CheckCircle2 size={18} />
            </span>
          </div>
          <p className="text-2xl font-extrabold tracking-tight text-[#6F5028]">
            {currencyHandler(order.totalAmount)}
          </p>
          <p className="mt-1 text-xs text-[#95846D]">
            Including shipping and discounts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="min-w-0 space-y-6 xl:col-span-2">
          <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white">
            <div className="flex items-center gap-3 border-b border-[#EEE6D9] px-5 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4EC] text-[#8B6937]">
                <Package size={19} />
              </div>
              <div>
                <h2 className="font-bold text-[#35291E]">Order Information</h2>
                <p className="mt-0.5 text-xs text-[#95846D]">
                  Reference and order timestamps
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div className="rounded-xl bg-[#FAF8F3] p-4 sm:col-span-2">
                <p className="mb-2 text-xs font-medium text-[#95846D]">
                  Order ID
                </p>
                <p className="break-all font-mono text-sm font-semibold text-[#463525]">
                  {order._id}
                </p>
              </div>
              <DetailItem
                label="Order Date"
                value={dateHandler(order.createdAt)}
              />
              <DetailItem
                label="Last Updated"
                value={dateHandler(order.updatedAt)}
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-[#EEE6D9] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4EC] text-[#8B6937]">
                  <Package size={19} />
                </div>
                <div>
                  <h2 className="font-bold text-[#35291E]">Order Items</h2>
                  <p className="mt-0.5 text-xs text-[#95846D]">
                    Products included in this order
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#F3E8D0] px-3 py-1.5 text-xs font-bold text-[#6F5028]">
                {orderItems.length} {orderItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {orderItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                <Package size={30} className="mb-3 text-[#B28B4C]" />
                <p className="text-sm font-semibold text-[#463525]">
                  No items found
                </p>
                <p className="mt-1 text-xs text-[#95846D]">
                  No order items are associated with this order.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#EEE6D9]">
                {orderItems.map((item, index) => (
                  <div
                    key={item._id || `${item.productVariantId}-${index}`}
                    className="p-5 transition-colors hover:bg-[#FCFBF8] sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E6DDCD] bg-[#F7F4EC] text-[#8B6937]">
                        <Package size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-[#463525]">
                              {item.productName || "Product unavailable"}
                            </h3>

                            <p className="mt-1 text-sm text-[#8B7355]">
                              Variant:{" "}
                              {item.productVariantName || "Variant unavailable"}
                            </p>

                            <p className="mt-1 break-all text-xs text-[#95846D]">
                              Product ID: {item.productId}
                            </p>

                            <p className="mt-1 break-all text-xs text-[#95846D]">
                              Variant ID: {item.productVariantId}
                            </p>
                          </div>

                          <p className="shrink-0 text-base font-extrabold text-[#8B6937]">
                            {currencyHandler(item.subtotal)}
                          </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#FAF8F3] p-3 sm:grid-cols-3">
                          <div>
                            <p className="text-xs text-[#95846D]">Unit Price</p>
                            <p className="mt-1 text-sm font-semibold text-[#463525]">
                              {currencyHandler(item.price)}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#95846D]">Quantity</p>
                            <p className="mt-1 text-sm font-semibold text-[#463525]">
                              {item.quantity ?? 0}
                            </p>
                          </div>

                          <div className="col-span-2 border-t border-[#E6DDCD] pt-3 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                            <p className="text-xs text-[#95846D]">
                              Item Subtotal
                            </p>
                            <p className="mt-1 text-sm font-bold text-[#6F5028]">
                              {currencyHandler(item.subtotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {orderItems.length > 0 && (
              <div className="border-t border-[#E6DDCD] bg-[#F7F4EC] px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#66533C]">
                    Items Subtotal
                  </span>
                  <span className="text-lg font-extrabold text-[#6F5028]">
                    {currencyHandler(
                      orderItems.reduce(
                        (total, item) => total + Number(item.subtotal || 0),
                        0,
                      ),
                    )}
                  </span>
                </div>
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white">
            <div className="flex items-center gap-3 border-b border-[#EEE6D9] px-5 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4EC] text-[#8B6937]">
                <UserRound size={19} />
              </div>
              <div>
                <h2 className="font-bold text-[#35291E]">Customer Details</h2>
                <p className="mt-0.5 text-xs text-[#95846D]">
                  Customer contact information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-3 sm:p-6">
              <DetailItem label="Customer Name" value={address.name} />
              <DetailItem label="Phone Number" value={address.phone} />
              <DetailItem label="Customer UUID" value={order.customerUuid} />
              <DetailItem label="Customer Email" value={order.customerEmail} />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white">
            <div className="flex items-center gap-3 border-b border-[#EEE6D9] px-5 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4EC] text-[#8B6937]">
                <MapPin size={19} />
              </div>
              <div>
                <h2 className="font-bold text-[#35291E]">Delivery Address</h2>
                <p className="mt-0.5 text-xs text-[#95846D]">
                  Shipping destination for this order
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <address className="rounded-xl bg-[#FAF8F3] p-4 text-sm not-italic leading-6 text-[#66533C] sm:p-5">
                <p className="mb-1 font-bold text-[#35291E]">
                  {address.name || "Customer"}
                </p>
                {fullAddress.map((line, index) => (
                  <p key={`${index}-${line}`}>{line}</p>
                ))}
                {address.phone && <p className="mt-2">{address.phone}</p>}
                {address.deliveryInstructions && (
                  <div className="mt-4 border-t border-[#E6DDCD] pt-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#95846D]">
                      Delivery Instructions
                    </p>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-[#66533C]">
                      {address.deliveryInstructions}
                    </p>
                  </div>
                )}
              </address>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#D9C7A6] bg-white">
            <div className="flex items-center gap-3 border-b border-[#EEE6D9] px-5 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E8D0] text-[#8B6937]">
                <Truck size={19} />
              </div>
              <div>
                <h2 className="font-bold text-[#35291E]">Shipment Details</h2>
                <p className="mt-0.5 text-xs text-[#95846D]">
                  Courier and tracking information
                </p>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#95846D]">
                  Courier Information
                </p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <GenericInput
                    id="shippingProvider"
                    name="shippingProvider"
                    label="Shipping Provider"
                    placeholder="e.g. Delhivery, Blue Dart"
                    value={shipmentForm.shippingProvider}
                    onChange={handleShipmentChange}
                    disabled={savingShipment}
                  />
                  <GenericInput
                    id="shipmentTrackingId"
                    name="shipmentTrackingId"
                    label="Tracking ID"
                    placeholder="Enter tracking number"
                    value={shipmentForm.shipmentTrackingId}
                    onChange={handleShipmentChange}
                    disabled={savingShipment}
                  />
                </div>
              </div>

              <div className="border-t border-dashed border-[#E6DDCD] pt-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#95846D]">
                  Customer Tracking Link
                </p>
                <GenericInput
                  id="shipmentTrackingUrl"
                  name="shipmentTrackingUrl"
                  label="Shipment Tracking URL"
                  placeholder="https://courier.com/track"
                  value={shipmentForm.shipmentTrackingUrl || ""}
                  onChange={handleShipmentChange}
                  disabled={savingShipment}
                />
                <p className="mt-2 text-xs leading-5 text-[#95846D]">
                  Add the courier tracking page that customers can open to
                  follow their shipment.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="min-w-0 space-y-6 xl:sticky xl:top-0">
          <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white">
            <div className="border-b border-[#EEE6D9] px-5 py-4">
              <h2 className="font-bold text-[#35291E]">Manage Order</h2>
              <p className="mt-1 text-xs text-[#95846D]">
                Update order and payment status
              </p>
            </div>

            <div className="space-y-5 p-5">
              <GenericSelect
                id="orderStatus"
                label="Order Status"
                value={order.status}
                disabled={savingStatus}
                loading={savingStatus}
                onChange={(event) =>
                  updateOrderField("status", event.target.value)
                }
              >
                {ORDER_STATUSES.map((status) => {
                  const disabledStatuses = getDisabledOrderStatuses(
                    order.status,
                  );

                  return (
                    <option
                      key={status}
                      value={status}
                      disabled={disabledStatuses.includes(status)}
                    >
                      {formatLabel(status)}
                    </option>
                  );
                })}
              </GenericSelect>
              {["confirmed", "shipped", "delivered"].includes(order.status) && (
                <button
                  type="button"
                  onClick={handleSendStatusEmail}
                  disabled={sendingEmail || !order.customerEmail}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9C7A6] bg-[#F7F4EC] px-4 py-3 text-sm font-semibold text-[#6F5028] transition hover:bg-[#F3E8D0] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
                >
                  {sendingEmail ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Mail size={16} />
                  )}

                  {sendingEmail
                    ? "Sending Email..."
                    : `Send ${formatLabel(order.status)} Email`}
                </button>
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#E6DDCD] bg-white">
            <div className="flex items-center gap-3 border-b border-[#EEE6D9] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4EC] text-[#8B6937]">
                <CreditCard size={19} />
              </div>
              <div>
                <h2 className="font-bold text-[#35291E]">Payment Summary</h2>
                <p className="mt-0.5 text-xs text-[#95846D]">
                  Breakdown of order total
                </p>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[#806C52]">Subtotal</span>
                <span className="font-semibold text-[#463525]">
                  {currencyHandler(order.subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[#806C52]">Discount</span>
                <span className="font-semibold text-[#47734D]">
                  -{currencyHandler(order.discount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[#806C52]">Shipping</span>
                <span className="font-semibold text-[#463525]">
                  {currencyHandler(order.shippingAmount)}
                </span>
              </div>

              <div className="border-t border-dashed border-[#DDD3C1] pt-4">
                <p className="text-xs font-medium text-[#806C52]">
                  Total Amount
                </p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#8B6937]">
                  {currencyHandler(order.totalAmount)}
                </p>
              </div>
            </div>
          </section>

          <div className="rounded-xl border border-[#E6DDCD] bg-[#F7F4EC] p-4">
            <div className="flex items-start gap-3">
              <Clock3 size={17} className="mt-0.5 shrink-0 text-[#8B6937]" />
              <div>
                <p className="text-sm font-semibold text-[#463525]">
                  Last order update
                </p>
                <p className="mt-1 text-xs leading-5 text-[#806C52]">
                  {dateHandler(order.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-4 border-t border-[#E6DDCD] pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs leading-5 text-[#95846D]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F0E5D1] text-[#9B783E]">
            <CheckCircle2 size={13} />
          </span>
          <span>Review the shipment details before saving your changes.</span>
        </div>

        <button
          type="button"
          onClick={handleSaveOrderChanges}
          disabled={savingShipment}
          className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-[#463421] px-7 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#59432C] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto hover:cursor-pointer"
        >
          {savingShipment && <RefreshCw size={16} className="animate-spin" />}
          {savingShipment ? "Saving Changes..." : "Save Order Changes"}
        </button>
      </div>
    </div>
  );
}
