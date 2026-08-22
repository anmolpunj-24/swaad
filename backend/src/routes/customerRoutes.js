const express = require("express");
const routes = express.Router();

const customerController = require("../controllers/customers/customersController");

routes.get("/getAll", customerController.getAllCustomers);

routes.get("/get/:id", customerController.getOneCustomer);

routes.put("/update/:id", customerController.updateCustomer);

routes.delete("/delete/:id", customerController.deleteCustomer);

module.exports = routes;
