const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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

const products = mongoose.model("products", productSchema);
module.exports = products;
