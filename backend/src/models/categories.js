const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      default: null,
    },

    slug: {
      type: String,
      required: [true, "Slug is required!"],
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

categorySchema.index({ name: 1, parentId: 1 }, { unique: true });

const categories = mongoose.model("categories", categorySchema);
module.exports = categories;
