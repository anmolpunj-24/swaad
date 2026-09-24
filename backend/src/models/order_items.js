const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      im: true,
    },

    productId: {
      type: String,
      required: true,
      trim: true,
    },

    productVariantId: {
      type: String,
      required: true,
      trim: true,
    },

    productVariantName: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("order_items", orderItemSchema);
