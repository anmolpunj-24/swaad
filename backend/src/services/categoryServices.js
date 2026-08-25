const categoryModel = require("../models/categories");

const getAllCategoriesService = async () => {
  const allCategories = await categoryModel.find({ deletedAt: null });

  return allCategories;
};

const getOneCategoryService = async (id) => {
  const categoryData = await categoryModel.findById({
    _id: id,
    deletedAt: null,
  });

  return categoryData;
};

const addCategoryService = async (categoryData) => {
  const newCategory = new categoryModel(categoryData);

  const savedCategory = await newCategory.save();

  return savedCategory;
};

const updateCategoryService = async (id, categoryData) => {
  const updatedProduct = await categoryModel.findByIdAndUpdate(
    id,
    categoryData,
    { returnDocument: "after", runValidators: true },
  );

  return updatedProduct;
};

const deleteCategoryService = async (id) => {
  const deletedCategory = await categoryModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );

  return deletedCategory;
};

module.exports = {
  getAllCategoriesService,
  getOneCategoryService,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
