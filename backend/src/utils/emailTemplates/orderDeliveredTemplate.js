const dateHandler = require("../helperFuntions/dateHandler");
const htmlHandler = require("../helperFuntions/htmlHandler");

const OrderDeliveredTemplate = (order = {}) => {
  const shippingAddress = order.shippingAddress || {};

  const orderId = order.orderNumber || order.orderId || order._id || "N/A";
  const deliveredOn = dateHandler(
    order.deliveredAt || order.updatedAt || order.createdAt,
  );

  const customerName = shippingAddress.name || order.customerName || "Customer";

  const customerPhone = shippingAddress.phone || order.customerPhone || "";

  const addressLines = [
    customerName,
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

  const addressHtml = addressLines.length
    ? addressLines.map(htmlHandler).join("<br>")
    : "Delivery address not available.";

  return `
    <div style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;color:#2a2622;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5ddcf;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(42,38,34,0.08);">

        <div style="padding:30px 34px;background:#2a2622;color:#fffdf8;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="vertical-align:middle;">
                  <div style="font-size:30px;font-weight:700;letter-spacing:2px;">SWAAD</div>
                  <div style="margin-top:5px;color:#d8d0c4;font-size:13px;letter-spacing:0.5px;">Taste of Punjab</div>
                </td>
                <td style="text-align:right;vertical-align:middle;">
                  <div style="display:inline-block;padding:8px 13px;border:1px solid #806c52;border-radius:20px;color:#e5d2aa;font-size:11px;font-weight:600;letter-spacing:0.5px;">DELIVERY UPDATE</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="height:4px;background:#b3925a;"></div>

        <div style="padding:34px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="margin:0 auto 14px;width:58px;height:58px;border-radius:50%;background:#e9f3e7;color:#4d7547;text-align:center;line-height:58px;font-size:28px;font-weight:700;">✓</div>
            <h2 style="margin:0 0 8px;font-size:25px;color:#2a2622;">Your Order Has Arrived!</h2>
            <p style="margin:0;color:#766b5e;font-size:14px;line-height:1.7;">Your SWAAD order has been successfully delivered. We hope you enjoy every bite!</p>
          </div>

          <div style="padding:20px;background:#f8f5ee;border:1px solid #ebe3d5;border-radius:14px;margin-bottom:30px;">
            <table style="width:100%;border-collapse:collapse;">
              <tbody>
                <tr>
                  <td style="padding:5px 0;color:#766b5e;font-size:13px;">Order ID</td>
                  <td style="padding:5px 0;text-align:right;font-weight:700;font-size:13px;">#${htmlHandler(orderId)}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:#766b5e;font-size:13px;">Delivered On</td>
                  <td style="padding:5px 0;text-align:right;font-size:13px;">${htmlHandler(deliveredOn)}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:#766b5e;font-size:13px;">Status</td>
                  <td style="padding:5px 0;text-align:right;">
                    <span style="display:inline-block;padding:5px 10px;border-radius:20px;background:#e9f3e7;color:#4d7547;font-size:11px;font-weight:700;">${htmlHandler(String(order.status || "delivered").toUpperCase())}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="padding:24px;background:#fbfaf7;border:1px solid #eee7da;border-radius:14px;text-align:center;margin-bottom:30px;">
            <div style="font-size:30px;margin-bottom:12px;">🍯</div>
            <h3 style="margin:0 0 8px;font-size:17px;">We hope you love your order!</h3>
            <p style="margin:0;color:#766b5e;font-size:13px;line-height:1.7;">Thank you for bringing a little Taste of Punjab into your home.</p>
          </div>

          <h3 style="margin:0 0 14px;font-size:17px;color:#2a2622;">Delivered To</h3>

          <div style="padding:20px;background:#f8f5ee;border:1px solid #ebe3d5;border-radius:14px;">
            <p style="margin:0;color:#766b5e;font-size:13px;line-height:1.7;">${addressHtml}</p>
            ${
              shippingAddress.deliveryInstructions
                ? `<p style="margin:12px 0 0;color:#766b5e;font-size:12px;line-height:1.6;"><strong>Delivery Instructions:</strong> ${htmlHandler(shippingAddress.deliveryInstructions)}</p>`
                : ""
            }
          </div>

          <div style="margin-top:34px;padding-top:28px;border-top:1px solid #eee7da;text-align:center;">
            <p style="margin:0 0 7px;font-size:15px;font-weight:700;">Thank you for choosing SWAAD!</p>
            <p style="margin:0;color:#978b7c;font-size:12px;line-height:1.6;">We look forward to serving you again.</p>
          </div>
        </div>

        <div style="padding:22px 32px;background:#211e1b;text-align:center;">
          <p style="margin:0 0 5px;color:#d8d0c4;font-size:12px;">SWAAD · Taste of Punjab</p>
          <p style="margin:0;color:#81786e;font-size:10px;">This is an automated delivery update. Please do not reply to this email.</p>
        </div>
      </div>
    </div>
  `;
};

module.exports = OrderDeliveredTemplate;
