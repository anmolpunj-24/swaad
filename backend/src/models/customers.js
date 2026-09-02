const mongoose = require("mongoose");
const nanoid = require("nanoid");

const customerSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => nanoid(7),
      unique: true,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    gender: { type: String },

    dob: { type: Date },

    phone: {
      type: String,
      required: [true, "Phone is required!"],
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const customers = mongoose.model("customers", customerSchema);
module.exports = customers;
