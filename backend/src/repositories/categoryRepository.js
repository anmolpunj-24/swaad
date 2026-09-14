const categoryModel = require("../models/categories");

const getAllCategoriesRepo = async () => {
  return await categoryModel
    .find({ deletedAt: null })
    .select("name parentId parentName slug isActive createdAt")
    .sort({ createdAt: -1 })
    .lean();
};

const getOneCategoryRepo = async (id) => {
  return await categoryModel
    .findOne({
      _id: id,
      deletedAt: null,
    })
    .select("name parentId parentName slug isActive")
    .lean();
};

const checkIfParentCategoryExist = async (parentId) => {
  return await categoryModel
    .findOne({
      _id: parentId,
      deletedAt: null,
    })
    .select("_id")
    .lean();
};

const checkIfExistingCategory = async (name, parentId) => {
  return await categoryModel
    .findOne({
      name,
      parentId,
      deletedAt: null,
    })
    .select("_id")
    .lean();
};

const addCategoryRepo = async (categoryData) => {
  const newCategory = new categoryModel(categoryData);
  const savedCategory = await newCategory.save();
  return savedCategory;
};

const checkIfExistingCategoryForUpdate = async (name, parentId, id) => {
  return await categoryModel
    .findOne({
      name,
      parentId,
      _id: { $ne: id },
      deletedAt: null,
    })
    .select("_id")
    .lean();
};

const updateCategoryRepo = async (id, categoryData) => {
  return await categoryModel.findOneAndUpdate(
    {
      _id: id,
      deletedAt: null,
    },
    categoryData,
    {
      new: true,
      runValidators: true,
    },
  );
};

const deleteCategoryRepo = async (id) => {
  return await categoryModel.findOneAndUpdate(
    {
      _id: id,
      deletedAt: null,
    },
    {
      deletedAt: new Date(),
      isActive: false,
    },
    {
      new: true,
    },
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
