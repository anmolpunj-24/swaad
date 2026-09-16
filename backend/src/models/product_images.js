const mongoose = require("mongoose");

const productImagesSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    isPrimary: {
      type: String,
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

const productImages = mongoose.model("product_images", productImagesSchema);
module.exports = productImages;
