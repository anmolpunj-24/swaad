const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    excerpt: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
      trim: true,
      default: "",
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },

    tagIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published", "deleted"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    seo: {
      metaTitle: {
        type: String,
        trim: true,
        default: "",
        maxlength: 60,
      },

      metaDescription: {
        type: String,
        trim: true,
        default: "",
        maxlength: 160,
      },

      metaKeywords: {
        type: [String],
        default: [],
      },

      canonicalUrl: {
        type: String,
        trim: true,
        default: "",
      },

      ogTitle: {
        type: String,
        trim: true,
        default: "",
      },

      ogDescription: {
        type: String,
        trim: true,
        default: "",
      },

      ogImage: {
        type: String,
        trim: true,
        default: "",
      },

      robots: {
        type: String,
        enum: [
          "index,follow",
          "noindex,follow",
          "index,nofollow",
          "noindex,nofollow",
        ],
        default: "index,follow",
      },
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
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("blogs", blogSchema);
