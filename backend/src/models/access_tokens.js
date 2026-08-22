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
  },
  { timestamps: true },
);

const access_tokens = mongoose.model("access_tokens", accessTokenSchema);
module.exports = access_tokens;
