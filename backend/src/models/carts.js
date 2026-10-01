const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema(
  {
    customerUuid: {
      type: String,
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    productVariantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product_variants",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    variantSize: {
      type: String,
      default: null,
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
  },
  {
    timestamps: true,
  },
);

cartsSchema.index(
  {
    customerUuid: 1,
    productId: 1,
    productVariantId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("carts", cartsSchema);
