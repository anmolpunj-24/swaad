const orderModel = require("../models/orders");

const addTestOrdersController = async (req, res) => {
  try {
    const { customerUuid, count = 100 } = req.body;

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

    const randomItem = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    const randomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateTrackingId = () => {
      return `SWD${Date.now()}${randomNumber(1000, 9999)}`;
    };

    const orders = Array.from({ length: count }, () => {
      const status = randomItem(statuses);

      let paymentStatus = "pending";

      if (
        status === "confirmed" ||
        status === "processing" ||
        status === "shipped" ||
        status === "delivered"
      ) {
        paymentStatus = "paid";
      }

      if (status === "cancelled") {
        paymentStatus = randomItem(["failed", "pending"]);
      }

      const subtotal = randomNumber(500, 10000);

      const discount = randomNumber(0, Math.min(1000, subtotal));

      const shippingAmount =
        subtotal - discount >= 2000 ? 0 : randomNumber(50, 150);

      const totalAmount = subtotal - discount + shippingAmount;

      const cityIndex = randomNumber(0, cities.length - 1);

      const shippingAddress = {
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
      };

      return {
        customerUuid,
        status,
        paymentStatus,
        shippingProvider:
          status === "shipped" || status === "delivered"
            ? randomItem(shippingProviders)
            : null,
        shipmentTrackingId:
          status === "shipped" || status === "delivered"
            ? generateTrackingId()
            : null,
        subtotal,
        discount,
        shippingAmount,
        totalAmount,
        currency: "INR",
        shippingAddress,
      };
    });

    const createdOrders = await orderModel.insertMany(orders);

    return res.status(201).json({
      message: `${createdOrders.length} test orders created!`,
      orders: createdOrders,
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
