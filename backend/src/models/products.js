const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
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

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("products", productSchema);
