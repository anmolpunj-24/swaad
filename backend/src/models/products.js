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
      unique: true,
      trim: true,
    },

    shortDescription: {
      type: String,
    },

    description: {
      type: String,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    thumbnail: {
      url: String,
      alt: String,
    },

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
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
