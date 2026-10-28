const dateHandler = require("../helperFuntions/dateHandler");
const htmlHandler = require("../helperFuntions/htmlHandler");

const OrderShippedTemplate = (order) => {
  const shippingAddress = order?.shippingAddress || {};

  const orderId = order._id || "N/A";
  const shippingProvider = order.shippingProvider || "Not specified";
  const trackingId = order.shipmentTrackingId || "";
  const shippedOn = dateHandler(order.updatedAt || order.createdAt);

  const customerName = shippingAddress.name || "Customer";

  const customerPhone = shippingAddress.phone || "";

  const addressLines = [
    customerName,
    shippingAddress?.addressLine1 || "",
    shippingAddress?.addressLine2 || "",
    shippingAddress?.landmark || "",
    [shippingAddress?.city, shippingAddress?.state, shippingAddress?.pincode]
      .filter(Boolean)
      .join(", "),
    shippingAddress?.country || "",
    customerPhone,
  ].filter(Boolean);

  const addressHtml = addressLines.length
    ? addressLines.map(htmlHandler).join("<br>")
    : "Delivery address not available.";

  const progressSteps = [
    {
      title: "Order Confirmed",
      description: "Your order has been successfully confirmed.",
      completed: true,
    },
    {
      title: "Order Packed",
      description: "Your order has been prepared for dispatch.",
      completed: true,
    },
    {
      title: "Shipped",
      description: "Your order is on its way to you.",
      completed: true,
    },
  ];

  const progressHtml = progressSteps
    .map(
      (step, index) => `
        <tr>
          <td style="width:38px;vertical-align:top;">
            <div style="width:28px;height:28px;border-radius:50%;background:${step.completed ? "#e9f3e7" : "#f3ead8"};color:${step.completed ? "#4d7547" : "#8a6b3f"};text-align:center;line-height:28px;font-size:14px;font-weight:700;">
              ${step.completed ? "✓" : index + 1}
            </div>
          </td>
          <td style="${index < progressSteps.length - 1 ? "padding-bottom:22px;" : ""}">
            <div style="font-size:13px;font-weight:700;">${htmlHandler(step.title)}</div>
            <div style="margin-top:4px;color:${index === 2 ? "#8a6b3f" : "#978b7c"};font-size:11px;">${htmlHandler(step.description)}</div>
          </td>
        </tr>
      `,
    )
    .join("");

  return `
   <div style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;color:#2a2622;">
      <div style="max-width:680px;margin:40px auto;background:#ffffff;border:1px solid #e5ddcf;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(42,38,34,0.08);">

        <div style="padding:30px 34px;background:#2a2622;color:#fffdf8;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="vertical-align:middle;">
                  <div style="font-size:30px;font-weight:700;letter-spacing:2px;">SWAAD</div>
                  <div style="margin-top:5px;color:#d8d0c4;font-size:13px;letter-spacing:0.5px;">Taste of Punjab</div>
                </td>
                <td style="text-align:right;vertical-align:middle;">
                  <div style="display:inline-block;padding:8px 13px;border:1px solid #806c52;border-radius:20px;color:#e5d2aa;font-size:11px;font-weight:600;letter-spacing:0.5px;">SHIPPING UPDATE</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="height:4px;background:#b3925a;"></div>

        <div style="padding:34px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="margin:0 auto 14px;width:52px;height:52px;border-radius:50%;background:#f3ead8;text-align:center;line-height:52px;font-size:24px;">🚚</div>
            <h2 style="margin:0 0 8px;font-size:24px;color:#2a2622;">Your Order Is On Its Way!</h2>
            <p style="margin:0;color:#766b5e;font-size:14px;line-height:1.7;">Great news! Your SWAAD order has been shipped and is now on its way to you.</p>
          </div>

          <div style="padding:20px;background:#f8f5ee;border:1px solid #ebe3d5;border-radius:14px;margin-bottom:30px;">
            <table style="width:100%;border-collapse:collapse;">
              <tbody>
                <tr>
                  <td style="padding:5px 0;color:#766b5e;font-size:13px;">Order ID</td>
                  <td style="padding:5px 0;text-align:right;font-weight:700;font-size:13px;">#${htmlHandler(orderId)}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:#766b5e;font-size:13px;">Shipping Provider</td>
                  <td style="padding:5px 0;text-align:right;font-size:13px;">${htmlHandler(shippingProvider)}</td>
                </tr>
                ${
                  trackingId
                    ? `<tr>
                        <td style="padding:5px 0;color:#766b5e;font-size:13px;">Tracking ID</td>
                        <td style="padding:5px 0;text-align:right;font-weight:700;font-size:13px;color:#8a6b3f;">${htmlHandler(trackingId)}</td>
                      </tr>`
                    : ""
                }
                <tr>
                  <td style="padding:5px 0;color:#766b5e;font-size:13px;">Shipped On</td>
                  <td style="padding:5px 0;text-align:right;font-size:13px;">${htmlHandler(shippedOn)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style="margin:0 0 14px;font-size:17px;color:#2a2622;">Shipping Progress</h3>

          <div style="padding:22px;border:1px solid #e7dfd1;border-radius:14px;margin-bottom:30px;">
            <table style="width:100%;border-collapse:collapse;">
              <tbody>
                ${progressHtml}
              </tbody>
            </table>
          </div>

          <div style="padding:20px;background:#f8f5ee;border:1px solid #ebe3d5;border-radius:14px;">
            <h3 style="margin:0 0 10px;font-size:15px;">Delivering To</h3>
            <p style="margin:0;color:#766b5e;font-size:13px;line-height:1.7;">${addressHtml}</p>
            ${
              shippingAddress.deliveryInstructions
                ? `<p style="margin:12px 0 0;color:#766b5e;font-size:12px;line-height:1.6;"><strong>Delivery Instructions:</strong> ${htmlHandler(shippingAddress.deliveryInstructions)}</p>`
                : ""
            }
          </div>

          <div style="margin-top:34px;padding-top:28px;border-top:1px solid #eee7da;text-align:center;">
            <p style="margin:0 0 7px;font-size:15px;font-weight:700;">Almost there!</p>
            <p style="margin:0;color:#978b7c;font-size:12px;line-height:1.6;">Your favourite Taste of Punjab is on its way to your doorstep.</p>
          </div>
        </div>

        <div style="padding:22px 32px;background:#211e1b;text-align:center;">
          <p style="margin:0 0 5px;color:#d8d0c4;font-size:12px;">SWAAD · Taste of Punjab</p>
          <p style="margin:0;color:#81786e;font-size:10px;">This is an automated shipping update. Please do not reply to this email.</p>
        </div>
      </div>
    </div>
  `;
};

module.exports = OrderShippedTemplate;
