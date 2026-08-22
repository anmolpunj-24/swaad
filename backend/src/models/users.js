const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");

const userSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => nanoid(7),
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: [true, "Name is required!"],
      lowercase: true,
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
    },

    profile: {
      type: String,
      default: "/assets/dummy-profile.jpg",
    },

    isActive: { type: Boolean, default: true },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    return error;
  }
});

const users = mongoose.model("users", userSchema);
module.exports = users;
