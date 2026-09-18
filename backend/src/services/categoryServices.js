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
  const normalizedCategoryData = {
    ...categoryData,
    parentId: categoryData.parentId || null,
  };

  if (normalizedCategoryData.parentId) {
    const parentCategoryExist = await categoryRepo.checkIfParentCategoryExist(
      normalizedCategoryData.parentId,
    );

    if (!parentCategoryExist) {
      return {
        success: false,
        errorMessage: "Parent category does not exist!",
      };
    }
  }

  const existingCategory = await categoryRepo.checkIfExistingCategory(
    normalizedCategoryData.name,
    normalizedCategoryData.parentId,
  );

  if (existingCategory) {
    return {
      success: false,
      errorMessage: "Category already exist!",
    };
  }

  const savedCategory = await categoryRepo.addCategoryRepo(
    normalizedCategoryData,
  );

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

  if (categoryData.isActive === false) {
    const associatedProduct =
      await categoryRepo.checkIfAnyProductIsAssociatedWithCategory(
        id,
      );

    if (associatedProduct) {
      return {
        success: false,
        errorMessage:
          "This category cannot be set to inactive because it is associated with one or more products!",
      };
    }
  }

  const updatedProduct = await categoryRepo.updateCategoryRepo(
    id,
    categoryData,
  );

  return updatedProduct;
};

const deleteCategoryService = async (id) => {
  const associatedProduct =
    await categoryRepo.checkIfAnyProductIsAssociatedWithCategory(
      id,
    );

  if (associatedProduct) {
    return {
      success: false,
      errorMessage:
        "This category cannot be deleted because it is associated with one or more products!",
    };
  }

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
