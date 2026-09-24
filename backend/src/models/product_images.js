const mongoose = require("mongoose");

const productImagesSchema = new mongoose.Schema(
  {
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

    image: {
      type: String,
      default: null,
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },

    alt: {
      type: String,
      default: "Product image",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product_images", productImagesSchema);
