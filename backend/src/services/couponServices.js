const couponsRepo = require("../repositories/couponRepository");

const addCouponService = async (couponData) => {
  const savedCouponsData = await couponsRepo.addCouponRepo(couponData);
  return savedCouponsData;
};

const getAllCouponsService = async () => {
  const allCouponsData = await couponsRepo.getAllCouponsRepo();
  return allCouponsData;
};

const getOneCouponService = async (couponId) => {
  const oneCouponData = await couponsRepo.getOneCouponRepo(couponId);

  if (!oneCouponData) {
    return {
      success: false,
      errorMessage: "No coupon found!",
    };
  }

  return oneCouponData;
};

const updateCouponService = async (couponId, couponData) => {
  const updatedCouponData = await couponsRepo.updateCouponRepo(
    couponId,
    couponData,
  );

  if (!updatedCouponData) {
    return {
      success: false,
      errorMessage: "Coupon not found!",
    };
  }

  return updatedCouponData;
};

const deleteCouponService = async (couponId) => {
  const deletedCouponData = await couponsRepo.deleteCouponRepo(couponId);

  if (!deletedCouponData) {
    return {
      success: false,
      errorMessage: "Coupon not found!",
    };
  }

  return deletedCouponData;
};

module.exports = {
  addCouponService,
  getAllCouponsService,
  getOneCouponService,
  updateCouponService,
  deleteCouponService,
};
