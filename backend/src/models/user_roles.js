const mongoose = require("mongoose");

const userRolesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userRolesSchema.index(
  {
    userId: 1,
    roleId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("user_roles", userRolesSchema);
