const mongoose = require("mongoose");

const accessTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("access_tokens", accessTokenSchema);
