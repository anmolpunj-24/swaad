import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const dateHandler = require("../helperFuntions/dateHandler");
const currencyHandler = require("../helperFuntions/currencyHandler");

const formatText = (value, fallback = "N/A") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
};

const formatStatus = (value) =>
  formatText(value, "Pending").replace(/_/g, " ").toUpperCase();

const OrderReceiptPDF = (order = {}) => {
  const shippingAddress = order.shippingAddress || {};
  const items = order.items || order.orderItems || [];

  const customerName = shippingAddress.name || order.customerName || "Customer";

  const customerEmail = order.customerEmail || "";
  const customerPhone = shippingAddress.phone || order.customerPhone || "";

  const orderId = order.orderNumber || order.orderId || order._id || "N/A";

  const orderDate = dateHandler(order.createdAt || order.orderDate);
  const paymentStatus = formatStatus(order.paymentStatus);

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
    order.total ?? order.totalAmount ?? subtotal - discount + shippingAmount,
  );

  const addressLines = [
    shippingAddress.addressLine1 || shippingAddress.address || "",
    shippingAddress.addressLine2 || "",
    shippingAddress.landmark || "",
    [
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.pincode || shippingAddress.postalCode,
    ]
      .filter(Boolean)
      .join(", "),
    shippingAddress.country || "",
    customerPhone,
  ].filter(Boolean);

  return (
    <Document
      title={`SWAAD Receipt - ${orderId}`}
      author="SWAAD - Taste of Punjab"
      subject="Order Receipt"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>SWAAD</Text>
            <Text style={styles.tagline}>Taste of Punjab</Text>
            <Text style={styles.tagline}>
              Authentic flavours. Honest goodness.
            </Text>
          </View>

          <View>
            <Text style={styles.receiptLabel}>ORDER RECEIPT</Text>
            <Text style={styles.receiptSubtitle}>
              Your purchase, beautifully documented.
            </Text>
            <Text style={styles.status}>{paymentStatus}</Text>
          </View>
        </View>

        <View style={styles.orderBanner}>
          <View style={styles.bannerItem}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>#{formatText(orderId)}</Text>
          </View>

          <View style={styles.bannerItem}>
            <Text style={styles.label}>Order Date</Text>
            <Text style={styles.value}>{formatText(orderDate)}</Text>
          </View>

          <View style={styles.bannerItem}>
            <Text style={styles.label}>Order Status</Text>
            <Text style={styles.value}>{formatStatus(order.status)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>

          <View style={styles.customerGrid}>
            <View style={styles.customerColumn}>
              <Text style={styles.label}>Customer</Text>
              <Text style={styles.detail}>{customerName}</Text>

              {customerEmail ? (
                <Text style={styles.detail}>{customerEmail}</Text>
              ) : null}

              {customerPhone ? (
                <Text style={styles.detail}>{customerPhone}</Text>
              ) : null}

              {order.customerUuid ? (
                <Text style={styles.detail}>
                  Customer ID: {order.customerUuid}
                </Text>
              ) : null}
            </View>

            <View style={styles.customerColumn}>
              <Text style={styles.label}>Delivery Address</Text>

              {addressLines.length ? (
                addressLines.map((line, index) => (
                  <Text key={index} style={styles.detail}>
                    {line}
                  </Text>
                ))
              ) : (
                <Text style={styles.detail}>
                  Delivery address not available.
                </Text>
              )}

              {shippingAddress.deliveryInstructions ? (
                <Text style={styles.detail}>
                  Instructions: {shippingAddress.deliveryInstructions}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader} fixed>
              <Text style={[styles.tableHeaderText, styles.productColumn]}>
                PRODUCT
              </Text>
              <Text style={[styles.tableHeaderText, styles.qtyColumn]}>
                QTY
              </Text>
              <Text style={[styles.tableHeaderText, styles.priceColumn]}>
                PRICE
              </Text>
              <Text style={[styles.tableHeaderText, styles.totalColumn]}>
                TOTAL
              </Text>
            </View>

            {items.length ? (
              items.map((item, index) => {
                const quantity = Number(item.quantity || 0);
                const price = Number(item.price || 0);
                const lineTotal = price * quantity;

                const productName = item.productName || "Product";

              

                const variantLabel = item.productVariantName

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

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>
                − {currencyHandler(discount)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {currencyHandler(shippingAmount)}
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

          <Text style={styles.detail}>Payment Status: {paymentStatus}</Text>

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
            Taste of Punjab, delivered to your doorstep.
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

export default OrderReceiptPDF;
