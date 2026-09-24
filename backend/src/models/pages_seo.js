const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required!"],
      trim: true,
      lowercase: true,
    },

    pageName: {
      type: String,
      required: [true, "Page name is required!"],
      trim: true,
    },

    metaTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
      trim: true,
    },

    metaKeywords: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

seoSchema.index(
  { slug: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  },
);

module.exports = mongoose.model("pages_seo", seoSchema);
