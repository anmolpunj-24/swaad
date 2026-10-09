const couponService = require("../../services/couponServices");

const addCoupon = async (req, res) => {
  const body = req.body;

  const newCouponData = await couponService.addCouponService(body);

  return res
    .status(201)
    .json({ message: "Coupon created!", coupon: newCouponData });
};

const getAllCoupons = async (req, res) => {
  const allCoupons = await couponService.getAllCouponsService();

  return res
    .status(200)
    .json({ message: "All coupons fetched!", coupons: allCoupons });
};

const getOneCoupon = async (req, res) => {
  const couponId = req.params.id;

  const couponData = await couponService.getOneCouponService(couponId);

  if (couponData.success === false) {
    return res.status(400).json({ message: couponData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Coupon fetched!", coupon: couponData });
};

const updateCoupon = async (req, res) => {
  const couponId = req.params.id;
  const body = req.body;

  const updatedCouponData = await couponService.updateCouponService(
    couponId,
    body,
  );

  if (updatedCouponData.success === false) {
    return res.status(400).json({ message: updatedCouponData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Coupon updated!", coupon: updatedCouponData });
};

const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;

  const deletedCouponData = await couponService.deleteCouponService(couponId);

  if (deletedCouponData.success === false) {
    return res.status(400).json({ message: deletedCouponData.errorMessage });
  }

  return res.status(200).json({ message: "Coupon deleted!" });
};

module.exports = {
  addCoupon,
  getAllCoupons,
  getOneCoupon,
  updateCoupon,
  deleteCoupon,
};
