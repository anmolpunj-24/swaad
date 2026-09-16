const mongoose = require("mongoose");

const productReviewsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    rating: {
      type: Number,
      required: [true, "Rating is required!"],
      min: [1, "Rating must be at least 1!"],
      max: [5, "Rating cannot exceed 5!"],
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
  },
  { timestamps: true },
);

const productReviews = mongoose.model("product_reviews", productReviewsSchema);
module.exports = productReviews;
