const orderModel = require("../models/orders");
const orderItemModel = require("../models/order_items");
const productModel = require("../models/products");
const productVariantModel = require("../models/product_variants");

const addTestOrdersController = async (req, res) => {
  try {
    const { customerUuid, count = 4 } = req.body;

    if (!customerUuid) {
      return res.status(400).json({
        message: "customerUuid is required!",
      });
    }

    if (!Number.isInteger(count) || count < 1 || count > 100) {
      return res.status(400).json({
        message: "Count must be an integer between 1 and 100!",
      });
    }

    const customer = await require("../models/customers").findOne({
      uuid: customerUuid,
      isActive: true,
      deletedAt: null,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Active customer not found!",
      });
    }

    const products = await productModel
      .find({
        isActive: true,
        deletedAt: null,
      })
      .select("_id");

    if (!products.length) {
      return res.status(400).json({
        message: "No active products found!",
      });
    }

    const variants = await productVariantModel.find({
      isActive: true,
      deletedAt: null,
      productId: { $in: products.map((product) => product._id) },
    });

    if (!variants.length) {
      return res.status(400).json({
        message: "No active product variants found!",
      });
    }

    const statuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    const shippingProviders = [
      "Delhivery",
      "Blue Dart",
      "DTDC",
      "Ekart",
      "XpressBees",
    ];

    const names = [
      "Aman Sharma",
      "Rahul Singh",
      "Harpreet Singh",
      "Simran Kaur",
      "Arjun Kumar",
      "Manpreet Kaur",
      "Karan Singh",
      "Navjot Singh",
    ];

    const cities = [
      "Jalandhar",
      "Ludhiana",
      "Amritsar",
      "Chandigarh",
      "Patiala",
      "Mohali",
      "Delhi",
    ];

    const states = [
      "Punjab",
      "Punjab",
      "Punjab",
      "Punjab",
      "Punjab",
      "Punjab",
      "Delhi",
    ];

    const randomItem = (array) =>
      array[Math.floor(Math.random() * array.length)];

    const randomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const generateTrackingId = () =>
      `SWD${Date.now()}${randomNumber(1000, 9999)}`;

    const orders = Array.from({ length: count }, () => {
      const status = randomItem(statuses);

      const paymentStatus = [
        "confirmed",
        "processing",
        "shipped",
        "delivered",
      ].includes(status)
        ? "paid"
        : "failed";

      const cityIndex = randomNumber(0, cities.length - 1);

      return {
        customerUuid,
        status,
        paymentStatus,
        shippingProvider: ["shipped", "delivered"].includes(status)
          ? randomItem(shippingProviders)
          : null,
        shipmentTrackingId: ["shipped", "delivered"].includes(status)
          ? generateTrackingId()
          : null,
        subtotal: 0,
        discount: 0,
        shippingAmount: 0,
        totalAmount: 0,
        currency: "INR",
        shippingAddress: {
          name: randomItem(names),
          phone: `9${randomNumber(100000000, 999999999)}`,
          addressLine1: `${randomNumber(1, 250)}, ${randomItem([
            "Model Town",
            "Civil Lines",
            "GT Road",
            "Urban Estate",
            "Green Avenue",
            "Main Bazaar",
          ])}`,
          addressLine2: randomItem([
            "Near Market",
            "Near Bus Stand",
            "Opposite Park",
            "Sector 5",
            null,
          ]),
          city: cities[cityIndex],
          state: states[cityIndex],
          pincode: `${randomNumber(100000, 999999)}`,
          country: "India",
        },
      };
    });

    const createdOrders = await orderModel.insertMany(orders);

    const orderItems = [];
    const orderUpdates = [];

    for (const order of createdOrders) {
      const itemCount = randomNumber(1, Math.min(4, variants.length));
      const selectedVariants = [];
      const availableVariants = [...variants];

      for (let i = 0; i < itemCount; i++) {
        const index = randomNumber(0, availableVariants.length - 1);
        selectedVariants.push(availableVariants.splice(index, 1)[0]);
      }

      let subtotal = 0;

      for (const variant of selectedVariants) {
        const quantity = randomNumber(1, 3);
        const price = Number(variant.sellingPrice);

        if (!Number.isFinite(price) || price < 0) {
          throw new Error(`Invalid price for variant ${variant._id} = ${price}`);
        }

        const itemSubtotal = price * quantity;
        subtotal += itemSubtotal;

        orderItems.push({
          orderId: String(order._id),
          productId: String(variant.productId),
          productVariantId: String(variant._id),
          productVariantName: variant.name,
          price,
          quantity,
          subtotal: itemSubtotal,
        });
      }

      const discount = randomNumber(0, Math.min(1000, Math.floor(subtotal)));

      const shippingAmount =
        subtotal - discount >= 2000 ? 0 : randomNumber(50, 150);

      orderUpdates.push({
        updateOne: {
          filter: { _id: order._id },
          update: {
            $set: {
              subtotal,
              discount,
              shippingAmount,
              totalAmount: subtotal - discount + shippingAmount,
            },
          },
        },
      });
    }

    const createdItems = await orderItemModel.insertMany(orderItems);

    await orderModel.bulkWrite(orderUpdates);

    const finalOrders = await orderModel.find({
      _id: { $in: createdOrders.map((order) => order._id) },
    });

    return res.status(201).json({
      message: `${finalOrders.length} test orders and ${createdItems.length} order items created!`,
      orders: finalOrders,
      orderItems: createdItems,
    });
  } catch (error) {
    console.error("Error creating test orders:", error);

    return res.status(500).json({
      message: "Failed to create test orders!",
      error: error.message,
    });
  }
};

module.exports = {
  addTestOrdersController,
};
