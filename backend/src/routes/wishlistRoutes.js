const express = require("express");
const routes = express.Router({ mergeParams: true });

const customerWishlistController = require("../controllers/customers/wishlistController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  customerWishlistController.getCustomerWishlist,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  customerWishlistController.addToCustomerWishlist,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  customerWishlistController.deleteCustomerWishlistItem,
);

routes.delete(
  "/clear",
  authenticateUserMiddleware,
  customerWishlistController.clearCustomerWishlist,
);

module.exports = routes;
