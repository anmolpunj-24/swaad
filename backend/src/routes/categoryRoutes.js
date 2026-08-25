const express = require("express");
const routes = express.Router();

const categoryController = require("../controllers/admins/categoryController");

routes.get("/getAll", categoryController.getAllCategories);

routes.get("/get/:id", categoryController.getOneCategory);

routes.post("/add", categoryController.addCategory);

routes.put("/update/:id", categoryController.updateCategory);

routes.delete("/delete/:id", categoryController.deleteCategory);

module.exports = routes;
