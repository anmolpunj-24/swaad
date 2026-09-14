const express = require("express");
const routes = express.Router({ mergeParams: true });

const customerAddressController = require("../controllers/customers/customersAddressController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addCustomerAddressRules = require("../validations/addCustomerAddressValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  customerAddressController.getAllCustomerAddresses,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  customerAddressController.getOneCustomerAddress,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addCustomerAddressRules,
  validationMiddleware,
  customerAddressController.addCustomerAddress,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  customerAddressController.updateCustomerAddress,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  customerAddressController.deleteCustomerAddress,
);

module.exports = routes;
