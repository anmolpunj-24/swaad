import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { dateHandler } from "../helperFunctions/dateHandler";
import { currencyHandler } from "../helperFunctions/currencyHandler";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#332D25",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#B28B4C",
  },
  brand: {
    fontSize: 25,
    fontFamily: "Helvetica-Bold",
    color: "#332D25",
    letterSpacing: 1.5,
  },
  brandAccent: {
    color: "#B28B4C",
  },
  tagline: {
    marginTop: 5,
    fontSize: 8,
    color: "#82745F",
  },
  receiptLabel: {
    fontSize: 19,
    fontFamily: "Helvetica-Bold",
    color: "#332D25",
    textAlign: "right",
  },
  receiptSubtitle: {
    marginTop: 5,
    fontSize: 8,
    color: "#82745F",
    textAlign: "right",
  },
  status: {
    alignSelf: "flex-end",
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 4,
    backgroundColor: "#F3E8D0",
    color: "#775820",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  orderBanner: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#F7F4EC",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  bannerItem: {
    flex: 1,
  },
  label: {
    fontSize: 7,
    color: "#82745F",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 5,
  },
  value: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#332D25",
  },
  section: {
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#332D25",
    marginBottom: 10,
  },
  customerGrid: {
    flexDirection: "row",
    gap: 18,
  },
  customerColumn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FCFBF8",
    borderWidth: 1,
    borderColor: "#E6DDCD",
    borderRadius: 5,
  },
  detail: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#514638",
  },
  muted: {
    color: "#82745F",
  },
  table: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#E6DDCD",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#332D25",
    paddingVertical: 10,
    paddingHorizontal: 9,
    color: "#FFFFFF",
  },
  tableHeaderText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 11,
    paddingHorizontal: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE8DD",
    alignItems: "center",
  },
  productColumn: {
    flex: 3,
    paddingRight: 6,
  },
  qtyColumn: {
    width: 35,
    textAlign: "center",
  },
  priceColumn: {
    width: 70,
    textAlign: "right",
  },
  totalColumn: {
    width: 75,
    textAlign: "right",
  },
  productName: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#332D25",
  },
  productVariant: {
    marginTop: 4,
    fontSize: 7.5,
    color: "#82745F",
  },
  cellText: {
    fontSize: 8,
    color: "#514638",
  },
  emptyState: {
    padding: 18,
    textAlign: "center",
    color: "#82745F",
    fontSize: 9,
  },
  summaryWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  summary: {
    width: 235,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 8.5,
    color: "#82745F",
  },
  summaryValue: {
    fontSize: 8.5,
    color: "#332D25",
    textAlign: "right",
  },
  grandTotal: {
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 1.5,
    borderTopColor: "#B28B4C",
  },
  grandTotalLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#332D25",
  },
  grandTotalValue: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#9A7437",
  },
  paymentBox: {
    marginTop: 22,
    padding: 12,
    backgroundColor: "#F7F4EC",
    borderRadius: 5,
  },
  paymentTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 7,
  },
  footer: {
    marginTop: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E6DDCD",
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#9A7437",
  },
  footerText: {
    marginTop: 5,
    fontSize: 7.5,
    color: "#82745F",
    textAlign: "center",
    lineHeight: 1.5,
  },
  pageNumber: {
    position: "absolute",
    bottom: 16,
    right: 38,
    fontSize: 7,
    color: "#82745F",
  },
});

const formatText = (value, fallback = "N/A") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};

const formatStatus = (value) => formatText(value, "Pending").replace(/_/g, " ");

const orderReceiptPdf = ({ order = {} }) => {
  const shippingAddress = order.shippingAddress || {};
  const items = order.items || order.orderItems || [];

  const orderId = order.orderNumber || order.orderId || order._id || "N/A";

  const customerName = shippingAddress.name || order.customerName || "Customer";

  const customerPhone = shippingAddress.phone || order.customerPhone || "N/A";

  const addressLines = [
    shippingAddress.addressLine1 || shippingAddress.address,
    shippingAddress.addressLine2,
    shippingAddress.landmark,
    [
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.postalCode || shippingAddress.pincode,
    ]
      .filter(Boolean)
      .join(", "),
    shippingAddress.country,
  ].filter(Boolean);

  const subtotal = Number(
    order.subtotal ??
      items.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 0),
        0,
      ),
  );

  const discount = Number(order.discount || 0);
  const shippingAmount = Number(order.shippingAmount || 0);
  const total = Number(
    order.totalAmount ?? order.total ?? subtotal - discount + shippingAmount,
  );

  return (
    <Document
      title={`SWAAD Receipt - ${orderId}`}
      author="SWAAD - Taste of Punjab"
      subject="Order Receipt"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>
              SW<span style={styles.brandAccent}>AA</span>D
            </Text>
            <Text style={styles.tagline}>TASTE OF PUNJAB</Text>
            <Text style={styles.tagline}>
              Authentic flavours. Honest goodness.
            </Text>
          </View>

          <View>
            <Text style={styles.receiptLabel}>ORDER RECEIPT</Text>
            <Text style={styles.receiptSubtitle}>
              Your purchase, beautifully documented.
            </Text>
            <Text style={styles.status}>
              {formatStatus(order.paymentStatus)}
            </Text>
          </View>
        </View>

        <View style={styles.orderBanner}>
          <View style={styles.bannerItem}>
            <Text style={styles.label}>Order Number</Text>
            <Text style={styles.value}>{formatText(orderId)}</Text>
          </View>
          <View style={styles.bannerItem}>
            <Text style={styles.label}>Order Date</Text>
            <Text style={styles.value}>
              {dateHandler(order.createdAt || order.orderDate)}
            </Text>
          </View>
          <View style={styles.bannerItem}>
            <Text style={styles.label}>Order Status</Text>
            <Text style={styles.value}>{formatStatus(order.status)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer & Delivery</Text>
          <View style={styles.customerGrid}>
            <View style={styles.customerColumn}>
              <Text style={styles.label}>Customer Details</Text>
              <Text style={styles.detail}>{customerName}</Text>
              <Text style={styles.detail}>{customerPhone}</Text>
              {order.customerUuid ? (
                <Text style={styles.detail}>
                  Customer ID: {order.customerUuid}
                </Text>
              ) : null}
            </View>

            <View style={styles.customerColumn}>
              <Text style={styles.label}>Shipping Address</Text>
              {addressLines.length ? (
                addressLines.map((line, index) => (
                  <Text key={index} style={styles.detail}>
                    {line}
                  </Text>
                ))
              ) : (
                <Text style={styles.detail}>Address not available</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader} fixed>
              <Text style={[styles.tableHeaderText, styles.productColumn]}>
                Product
              </Text>
              <Text style={[styles.tableHeaderText, styles.qtyColumn]}>
                Qty
              </Text>
              <Text style={[styles.tableHeaderText, styles.priceColumn]}>
                Price
              </Text>
              <Text style={[styles.tableHeaderText, styles.totalColumn]}>
                Total
              </Text>
            </View>

            {items.length ? (
              items.map((item, index) => {
                const quantity = Number(item.quantity || 0);
                const price = Number(item.price || 0);
                const lineTotal = Number(item.subtotal ?? price * quantity);

                const productName = item.productName || "Product";

                const variantLabel =
                  item.productVariantName || "Product variant";

                return (
                  <View
                    key={item._id || `${productName}-${index}`}
                    style={styles.tableRow}
                    wrap={false}
                  >
                    <View style={styles.productColumn}>
                      <Text style={styles.productName}>{productName}</Text>
                      {variantLabel ? (
                        <Text style={styles.productVariant}>
                          {variantLabel}
                        </Text>
                      ) : null}
                    </View>

                    <Text style={[styles.cellText, styles.qtyColumn]}>
                      {quantity}
                    </Text>
                    <Text style={[styles.cellText, styles.priceColumn]}>
                      {currencyHandler(price)}
                    </Text>
                    <Text style={[styles.cellText, styles.totalColumn]}>
                      {currencyHandler(lineTotal)}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyState}>No order items available.</Text>
            )}
          </View>
        </View>

        <View style={styles.summaryWrapper} wrap={false}>
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {currencyHandler(subtotal)}
              </Text>
            </View>

            {discount > 0 ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={styles.summaryValue}>
                  - {currencyHandler(discount)}
                </Text>
              </View>
            ) : null}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {shippingAmount === 0
                  ? "FREE"
                  : currencyHandler(shippingAmount)}
              </Text>
            </View>

            <View style={[styles.summaryRow, styles.grandTotal]}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>
                {currencyHandler(total)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.paymentBox} wrap={false}>
          <Text style={styles.paymentTitle}>Payment Information</Text>
          <Text style={styles.detail}>
            Payment Status: {formatStatus(order.paymentStatus)}
          </Text>
          {order.paymentMethod ? (
            <Text style={styles.detail}>
              Payment Method: {formatText(order.paymentMethod)}
            </Text>
          ) : null}
          {order.paymentId || order.transactionId ? (
            <Text style={styles.detail}>
              Transaction Reference:{" "}
              {formatText(order.paymentId || order.transactionId)}
            </Text>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Thank you for choosing SWAAD!</Text>
          <Text style={styles.footerText}>
            We appreciate your order and hope you enjoy every bite.
            {"\n"}
            This is a computer-generated receipt.
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default orderReceiptPdf;
