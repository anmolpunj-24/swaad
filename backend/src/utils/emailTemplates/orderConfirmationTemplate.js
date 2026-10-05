const OrderConfirmationTemplate = () => {
  return `
    <div style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;color:#2a2622;">
      <div style="max-width:680px;margin:40px auto;background:#ffffff;border:1px solid #e5ddcf;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(42,38,34,0.08);">

        <div style="padding:30px 34px;background:#2a2622;color:#fffdf8;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="vertical-align:middle;">
                <div style="font-size:30px;font-weight:700;letter-spacing:2px;">
                  SWAAD
                </div>

                <div style="margin-top:5px;color:#d8d0c4;font-size:13px;letter-spacing:0.5px;">
                  Taste of Punjab
                </div>
              </td>

              <td style="text-align:right;vertical-align:middle;">
                <div style="display:inline-block;padding:8px 13px;border:1px solid #806c52;border-radius:20px;color:#e5d2aa;font-size:11px;font-weight:600;letter-spacing:0.5px;">
                  ORDER RECEIPT
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div style="height:4px;background:#b3925a;"></div>

        <div style="padding:34px;">

          <div style="text-align:center;margin-bottom:32px;">
            <div style="margin:0 auto 14px;width:48px;height:48px;border-radius:50%;background:#f3ead8;text-align:center;line-height:48px;font-size:23px;">
              ✓
            </div>

            <h2 style="margin:0 0 8px;font-size:24px;color:#2a2622;">
              Order Confirmed
            </h2>

            <p style="margin:0;color:#766b5e;font-size:14px;line-height:1.7;">
              Thank you for your order! Your order has been successfully placed
              and we're preparing it for you.
            </p>
          </div>

          <div style="padding:20px;background:#f8f5ee;border:1px solid #ebe3d5;border-radius:14px;margin-bottom:30px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:5px 0;color:#766b5e;font-size:13px;">
                  Order ID
                </td>

                <td style="padding:5px 0;text-align:right;font-weight:700;font-size:13px;">
                  #SWAAD-10001
                </td>
              </tr>

              <tr>
                <td style="padding:5px 0;color:#766b5e;font-size:13px;">
                  Order Date
                </td>

                <td style="padding:5px 0;text-align:right;font-size:13px;">
                  29 September 2026
                </td>
              </tr>

              <tr>
                <td style="padding:5px 0;color:#766b5e;font-size:13px;">
                  Payment Status
                </td>

                <td style="padding:5px 0;text-align:right;">
                  <span style="display:inline-block;padding:5px 10px;border-radius:20px;background:#e9f3e7;color:#4d7547;font-size:11px;font-weight:700;">
                    PAID
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <h3 style="margin:0 0 14px;font-size:17px;color:#2a2622;">
            Customer Details
          </h3>

          <div style="padding:18px;border:1px solid #e7dfd1;border-radius:14px;margin-bottom:30px;">
            <p style="margin:0 0 7px;font-size:15px;font-weight:700;">
              Anmol Punj
            </p>

            <p style="margin:0 0 5px;color:#766b5e;font-size:13px;">
              anmol@example.com
            </p>

            <p style="margin:0;color:#766b5e;font-size:13px;">
              +91 98765 43210
            </p>
          </div>

          <h3 style="margin:0 0 14px;font-size:17px;color:#2a2622;">
            Order Items
          </h3>

          <div style="border:1px solid #e7dfd1;border-radius:14px;overflow:hidden;margin-bottom:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr style="background:#f8f5ee;border-bottom:1px solid #e7dfd1;">
                  <th style="padding:13px 12px;text-align:left;font-size:11px;color:#766b5e;letter-spacing:0.4px;">
                    PRODUCT
                  </th>

                  <th style="padding:13px 8px;text-align:center;font-size:11px;color:#766b5e;letter-spacing:0.4px;">
                    QTY
                  </th>

                  <th style="padding:13px 8px;text-align:right;font-size:11px;color:#766b5e;letter-spacing:0.4px;">
                    PRICE
                  </th>

                  <th style="padding:13px 12px;text-align:right;font-size:11px;color:#766b5e;letter-spacing:0.4px;">
                    TOTAL
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr style="border-bottom:1px solid #f0ebe2;">
                  <td style="padding:17px 12px;">
                    <div style="font-size:13px;font-weight:700;">
                      Premium Punjab Honey
                    </div>

                    <div style="margin-top:5px;color:#978b7c;font-size:11px;">
                      500g
                    </div>
                  </td>

                  <td style="padding:17px 8px;text-align:center;font-size:13px;">
                    2
                  </td>

                  <td style="padding:17px 8px;text-align:right;font-size:13px;">
                    ₹499.00
                  </td>

                  <td style="padding:17px 12px;text-align:right;font-size:13px;font-weight:700;">
                    ₹998.00
                  </td>
                </tr>

                <tr>
                  <td style="padding:17px 12px;">
                    <div style="font-size:13px;font-weight:700;">
                      Mustard Honey
                    </div>

                    <div style="margin-top:5px;color:#978b7c;font-size:11px;">
                      250g
                    </div>
                  </td>

                  <td style="padding:17px 8px;text-align:center;font-size:13px;">
                    1
                  </td>

                  <td style="padding:17px 8px;text-align:right;font-size:13px;">
                    ₹299.00
                  </td>

                  <td style="padding:17px 12px;text-align:right;font-size:13px;font-weight:700;">
                    ₹299.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="padding:20px;background:#fbfaf7;border:1px solid #eee7da;border-radius:14px;">
            <table style="width:100%;border-collapse:collapse;">

              <tr>
                <td style="padding:5px 0;color:#766b5e;font-size:13px;">
                  Subtotal
                </td>

                <td style="padding:5px 0;text-align:right;font-size:13px;">
                  ₹1,297.00
                </td>
              </tr>

              <tr>
                <td style="padding:5px 0;color:#766b5e;font-size:13px;">
                  Discount
                </td>

                <td style="padding:5px 0;text-align:right;color:#66805d;font-size:13px;">
                  − ₹100.00
                </td>
              </tr>

              <tr>
                <td style="padding:5px 0;color:#766b5e;font-size:13px;">
                  Shipping
                </td>

                <td style="padding:5px 0;text-align:right;font-size:13px;">
                  ₹50.00
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding-top:14px;">
                  <div style="height:1px;background:#e7dfd1;"></div>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 0 2px;font-size:18px;font-weight:700;">
                  Total
                </td>

                <td style="padding:16px 0 2px;text-align:right;font-size:20px;font-weight:700;color:#8a6b3f;">
                  ₹1,247.00
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding-top:4px;text-align:right;color:#978b7c;font-size:10px;">
                  Inclusive of applicable taxes
                </td>
              </tr>

            </table>
          </div>

          <div style="margin-top:30px;padding:20px;background:#f8f5ee;border:1px solid #ebe3d5;border-radius:14px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="vertical-align:top;width:28px;">
                  <div style="font-size:18px;">⌖</div>
                </td>

                <td>
                  <h3 style="margin:0 0 10px;font-size:15px;">
                    Delivery Address
                  </h3>

                  <p style="margin:0;color:#766b5e;font-size:13px;line-height:1.7;">
                    Anmol Punj<br>
                    123 Model Town<br>
                    Jalandhar, Punjab - 144001<br>
                    India<br>
                    +91 98765 43210
                  </p>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-top:34px;padding-top:28px;border-top:1px solid #eee7da;text-align:center;">
            <p style="margin:0 0 7px;font-size:15px;font-weight:700;">
              Thank you for choosing SWAAD!
            </p>

            <p style="margin:0;color:#978b7c;font-size:12px;line-height:1.6;">
              Taste of Punjab, delivered to your doorstep.
            </p>
          </div>

        </div>

        <div style="padding:22px 32px;background:#211e1b;text-align:center;">
          <p style="margin:0 0 5px;color:#d8d0c4;font-size:12px;">
            SWAAD · Taste of Punjab
          </p>

          <p style="margin:0;color:#81786e;font-size:10px;">
            This is an automated order confirmation. Please do not reply to this email.
          </p>
        </div>

      </div>
    </div>
  `;
};

module.exports = OrderConfirmationTemplate;
