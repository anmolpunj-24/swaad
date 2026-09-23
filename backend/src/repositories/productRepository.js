const productModel = require("../models/products");
const categoryModel = require("../models/categories");

const checkIfAnyProductIsAssociatedWithCategory = async (categoryId) => {
  return await productModel.exists({ categoryId });
};

const updateCategoryNameForProductsRepo = async (categoryId, categoryName) => {
  return await productModel.updateMany(
    {
      categoryId,
    },
    {
      $set: {
        categoryName,
      },
    },
  );
};

const checkIfCategoryExistInDbRepo = async (categoryId) => {
  return await categoryModel.findOne({
    _id: categoryId,
    deletedAt: null,
    isActive: true,
  });
};

const addProductRepo = async (categoryId, categoryName) => {
  const newProduct = new productModel({
    categoryId,
    categoryName,
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
};

const checkIfProductExistInDbRepo = async (productId) => {
  return await productModel
    .findOne({
      _id: productId,
      deletedAt: null,
      isActive: true,
    })
    .lean();
};

const updateProductRepo = async (productId, productData) => {
  return await productModel.findByIdAndUpdate(
    productId,
    productData,
    {
      returnDocument: "after",
      runValidators: true,
    },
    { new: true },
  );
};

const deleteProductRepo = async (productId, deletedAt) => {
  return await productModel.findOneAndUpdate(
    { _id: productId, deletedAt: null, isActive: true },
    { $set: { deletedAt, isActive: false } },
    { new: true },
  );
};

const allProductsInDbRepo = async () => {
  return await productModel
    .find({
      deletedAt: null,
      isActive: true,
    })
    .lean();
};

module.exports = {
  checkIfAnyProductIsAssociatedWithCategory,
  updateCategoryNameForProductsRepo,
  checkIfCategoryExistInDbRepo,
  addProductRepo,
  checkIfProductExistInDbRepo,
  updateProductRepo,
  deleteProductRepo,
  allProductsInDbRepo,
};
