const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      lowercase: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },

    slug: {
      type: String,
      required: [true, "Slug is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const categories = mongoose.model("categories", categorySchema);
module.exports = categories;
