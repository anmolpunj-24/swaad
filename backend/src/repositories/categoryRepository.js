const categoryModel = require("../models/categories");

const getAllCategoriesRepo = async () => {
  return await categoryModel.find({ deletedAt: null });
};

const getOneCategoryRepo = async (id) => {
  return await categoryModel.findById({
    _id: id,
    deletedAt: null,
  });
};

const checkIfParentCategoryExist = async (parentId) => {
  return await categoryModel.findOne({
    _id: parentId,
  });
};

const checkIfExistingCategory = async (name, parentId) => {
  return await categoryModel.findOne({
    name,
    parentId,
  });
};

const addCategoryRepo = async (categoryData) => {
  const newCategory = new categoryModel(categoryData);

  const savedCategory = await newCategory.save();

  return savedCategory;
};

const checkIfExistingCategoryForUpdate = async (name, parentId, id) => {
  return await categoryModel.findOne({
    name,
    parentId,
    _id: { $ne: id },
  });
};

const updateCategoryRepo = async (id, categoryData) => {
  return await categoryModel.findByIdAndUpdate(id, categoryData, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteCategoryRepo = async (id) => {
  return await categoryModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );
};

module.exports = {
  getAllCategoriesRepo,
  getOneCategoryRepo,
  checkIfParentCategoryExist,
  checkIfExistingCategory,
  addCategoryRepo,
  checkIfExistingCategoryForUpdate,
  updateCategoryRepo,
  deleteCategoryRepo,
};
