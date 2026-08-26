const categoryRepo = require("../repositories/categoryRepository");

const getAllCategoriesService = async () => {
  const allCategories = await categoryRepo.getAllCategoriesRepo();

  return allCategories;
};

const getOneCategoryService = async (id) => {
  const categoryData = await categoryRepo.getOneCategoryRepo(id);

  return categoryData;
};

const addCategoryService = async (categoryData) => {
  if (categoryData.parentId) {
    const parentCategoryExist = await categoryRepo.checkIfParentCategoryExist(
      categoryData.parentId,
    );

    if (!parentCategoryExist) {
      return {
        success: false,
        errorMessage: "Parent category does not exist!",
      };
    }
  }

  const existingCategory = await categoryRepo.checkIfExistingCategory(
    categoryData.name,
    categoryData.parentId,
  );

  if (existingCategory) {
    return {
      success: false,
      errorMessage: "Category already exist!",
    };
  }

  const savedCategory = await categoryRepo.addCategoryRepo(categoryData);

  return savedCategory;
};

const updateCategoryService = async (id, categoryData) => {
  if (categoryData.parentId) {
    const parentCategoryExist = await categoryRepo.checkIfParentCategoryExist(
      categoryData.parentId,
    );

    if (!parentCategoryExist) {
      return {
        success: false,
        errorMessage: "Parent category does not exist!",
      };
    }
  }

  const existingCategoryOtherThanTheOneBeingUpdated =
    await categoryRepo.checkIfExistingCategoryForUpdate(
      categoryData.name,
      categoryData.parentId,
      id,
    );

  if (existingCategoryOtherThanTheOneBeingUpdated) {
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

  const updatedProduct = await categoryRepo.updateCategoryRepo(
    id,
    categoryData,
  );

  return updatedProduct;
};

const deleteCategoryService = async (id) => {
  const deletedCategory = await categoryRepo.deleteCategoryRepo(id);

  return deletedCategory;
};

module.exports = {
  getAllCategoriesService,
  getOneCategoryService,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
