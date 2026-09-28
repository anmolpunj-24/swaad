const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    size: {
      type: String,
      trim: true,
      required: true,
    },

    unit: {
      type: String,
      enum: ["L", "ml", "kg", "g"],
      default: "g",
    },

    tagLine: {
      type: String,
      trim: true,
    },

    mrp: {
      type: Number,
      required: true,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

productVariantSchema.index(
  { productId: 1, size: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  },
);

module.exports = mongoose.model("product_variants", productVariantSchema);
