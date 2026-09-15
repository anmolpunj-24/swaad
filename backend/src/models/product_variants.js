const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Name is required!"],
      lowercase: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
    },

    tagLine: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    featuredImage: {
      url: String,
      alt: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const productVariants = mongoose.model(
  "product_variants",
  productVariantSchema,
);
module.exports = productVariants;
