const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    pageSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    pageName: {
      type: String,
      required: true,
      trim: true,
    },

    questionSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      trim: true,
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

faqSchema.index(
  { pageSlug: 1, questionSlug: 1 },
  {
    unique: true,
    partialFilterExpression: {
      deletedAt: null,
    },
  },
);

module.exports = mongoose.model("pages_faq", faqSchema);
