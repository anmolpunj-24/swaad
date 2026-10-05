const mongoose = require("mongoose");

const rolePermissionsSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },

    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "permissions",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

rolePermissionsSchema.index(
  {
    roleId: 1,
    permissionId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("role_permissions", rolePermissionsSchema);
