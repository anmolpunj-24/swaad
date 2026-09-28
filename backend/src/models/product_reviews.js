const mongoose = require("mongoose");

const productReviewsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    customerUuid: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    description: {
      type: String,
    },

    customerName: { type: String },

    customerCity: { type: String },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

productReviewsSchema.index(
  { productId: 1, customerUuid: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  },
);

module.exports = mongoose.model("product_reviews", productReviewsSchema);
