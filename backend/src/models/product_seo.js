const mongoose = require("mongoose");

const productSeoSchema = new mongoose.Schema(
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

    metaTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },

    metaKeywords: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

productSeoSchema.index(
  { productVariantId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  },
);

const productSeo = mongoose.model("product_seo", productSeoSchema);
module.exports = productSeo;
