const express = require("express");
const routes = express.Router();

const couponsController = require("../controllers/admins/couponsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addCouponRules = require("../validations/addCouponValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  couponsController.getAllCoupons,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  couponsController.getOneCoupon,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addCouponRules,
  validationMiddleware,
  couponsController.addCoupon,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  couponsController.updateCoupon,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  couponsController.deleteCoupon,
);

module.exports = routes;
