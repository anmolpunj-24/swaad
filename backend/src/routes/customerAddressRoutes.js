const express = require("express");
const routes = express.Router();

const customerAddressController = require("../controllers/customers/customersAddressController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

const addCustomerAddressRules = require("../validations/addCustomerAddressValidations");

routes.get("/getAll", customerAddressController.getAllCustomersAddress);

routes.get("/get/:id", customerAddressController.getOneCustomerAddress);

routes.post(
  "/add",
  addCustomerAddressRules,
  validationMiddleware,
  customerAddressController.addCustomerAddress,
);

routes.put("/update/:id", customerAddressController.updateCustomerAddress);

routes.delete("/delete/:id", customerAddressController.deleteCustomerAddress);

module.exports = routes;
