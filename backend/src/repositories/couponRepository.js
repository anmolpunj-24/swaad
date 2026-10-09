const couponModel = require("../models/coupons");

const addCouponRepo = async (couponData) => {
  const newCouponData = new couponModel(couponData);
  const savedCouponData = await newCouponData.save();
  return savedCouponData;
};

const getAllCouponsRepo = async () => {
  return await couponModel
    .find({
      deletedAt: null,
      isActive: true,
    })
    .select("-updatedAt")
    .sort("-createdAt")
    .lean();
};

const getOneCouponRepo = async (couponId) => {
  return await couponModel
    .findOne({
      _id: couponId,
      deletedAt: null,
      isActive: true,
    })
    .select("-updatedAt")
    .lean();
};

const updateCouponRepo = async (couponId, couponData) => {
  return await couponModel.findOneAndUpdate(
    {
      _id: couponId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: couponData,
    },
    { returnDocument: "after", runValidators: true },
  );
};

const deleteCouponRepo = async (couponId) => {
  return await couponModel.findOneAndUpdate(
    {
      _id: couponId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
      },
    },
    { returnDocument: "after" },
  );
};

module.exports = {
  addCouponRepo,
  getAllCouponsRepo,
  getOneCouponRepo,
  updateCouponRepo,
  deleteCouponRepo,
};
