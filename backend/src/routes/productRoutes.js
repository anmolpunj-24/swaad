const express = require("express");
const routes = express.Router();

const productController = require("../controllers/admins/productController");

routes.get("/getAll", productController.getAllProducts);

routes.get("/get/:id", productController.getOneProduct);

routes.post("/add", productController.addProduct); 

routes.put("/update/:id", productController.updateProduct);

routes.delete("/delete/:id", productController.deleteProduct);

module.exports = routes;
