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
  if (categoryData.parentId) {
    const parentCategoryExist = await categoryModel.findOne({
      _id: categoryData.parentId,
    });

    if (!parentCategoryExist) {
      return {
        success: false,
        errorMessage: "Parent category does not exist!",
      };
    }
  }

  const existingCategory = await categoryModel.findOne({
    name: categoryData.name,
    parentId: categoryData.parentId,
  });

  if (existingCategory) {
    return {
      success: false,
      errorMessage: "Category already exist!",
    };
  }

  const newCategory = new categoryModel(categoryData);

  const savedCategory = await newCategory.save();

  return savedCategory;
};

const updateCategoryService = async (id, categoryData) => {
  if (categoryData.parentId) {
    const parentCategoryExist = await categoryModel.findOne({
      _id: categoryData.parentId,
    });

    if (!parentCategoryExist) {
      return {
        success: false,
        errorMessage: "Parent category does not exist!",
      };
    }
  }

  const existingCategory = await categoryModel.findOne({
    name: categoryData.name,
    parentId: categoryData.parentId,
    _id: { $ne: id },
  });

  if (existingCategory) {
    return {
      success: false,
      errorMessage: "Category already exist!",
    };
  }

  if (categoryData.parentId?.toString() === id.toString()) {
    return {
      success: false,
      errorMessage: "A category cannot be its own parent!",
    };
  }

  // So when changing parentId, you should verify that the new parent is not somewhere inside the category's own descendant tree.

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
