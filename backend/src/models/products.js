const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    hasVariants: {
      type: Boolean,
      default: false,
    },

    seo: {
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
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const products = mongoose.model("products", productSchema);
module.exports = products;
