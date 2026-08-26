const mongoose = require("mongoose");

const customerAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    addressLine_1: { type: String, required: true },

    addressLine_2: { type: String },

    country: { type: String, required: true },

    state: { type: String, required: true },

    postalCode: { type: String, required: true },

    city: { type: String, required: true },

    isDefault: { type: Boolean },

    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true },
);

const customerAddress = mongoose.model(
  "customer_address",
  customerAddressSchema,
);
module.exports = customerAddress;
