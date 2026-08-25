const productModel = require("../models/products");

const getAllProductsService = async () => {
  const allProducts = await productModel.find({ deletedAt: null });

  return allProducts;
};

const getOneProductService = async (id) => {
  const productData = await productModel.findById({ _id: id, deletedAt: null });

  return productData;
};

const addProductService = async (productData) => {
  const newProduct = new productModel(productData);

  const savedProduct = await newProduct.save();

  return savedProduct;
};

const updateProductService = async (id, productData) => {
  const updatedProduct = await productModel.findByIdAndUpdate(id, productData, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedProduct;
};

const deleteProductService = async (id) => {
  const deletedProduct = await productModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );

  return deletedProduct;
};

module.exports = {
  getAllProductsService,
  getOneProductService,
  addProductService,
  updateProductService,
  deleteProductService,
};
