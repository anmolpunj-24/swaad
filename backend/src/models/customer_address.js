const mongoose = require("mongoose");

const customerAddressSchema = new mongoose.Schema(
  {
    customerUuid: {
      type: String,
      required: true,
      index: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },

    addressLine_1: { type: String, required: true },

    addressLine_2: { type: String },

    country: { type: String, required: true },

    state: { type: String, required: true },

    postalCode: { type: String, required: true },

    city: { type: String, required: true },

    addressType: { type: String },

    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("customer_address", customerAddressSchema);
