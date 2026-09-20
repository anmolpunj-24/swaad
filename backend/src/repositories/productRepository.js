const productModel = require("../models/products");

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

module.exports = {
  checkIfAnyProductIsAssociatedWithCategory,
  updateCategoryNameForProductsRepo,
};
