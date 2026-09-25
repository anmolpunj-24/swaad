const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },

    customerUuid: {
      type: String,
      required: true,
      trim: true,
    },

    provider: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
      required: true,
    },

    providerOrderId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    providerPaymentId: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "INR",
    },

    paymentMethod: {
      type: String,
      enum: [
        "card",
        "netbanking",
        "wallet",
        "emi",
        "upi",
      ],
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

paymentSchema.index(
  { providerPaymentId: 1 },
  {
    unique: true,
    sparse: true,
  },
);

module.exports = mongoose.model("payments", paymentSchema);