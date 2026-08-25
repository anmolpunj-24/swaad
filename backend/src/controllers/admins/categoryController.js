const categoryService = require("../../services/categoryServices");

const addCategory = async (req, res) => {
  const newCategory = await categoryService.addCategoryService(req.body);

  return res
    .status(201)
    .json({ message: "Category created!", category: newCategory });
};

const getAllCategories = async (req, res) => {
  const allCategories = await categoryService.getAllCategoriesService();

  return res
    .status(200)
    .json({ message: "All categories fetched!", categories: allCategories });
};

const getOneCategory = async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return res.status(400).json({ message: "Category id not found!" });
  }

  const categoryData = await categoryService.getOneCategoryService(categoryId);

  return res
    .status(200)
    .json({ message: "Category fetched!", category: categoryData });
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const body = req.body;

  if (!categoryId) {
    return res.status(400).json({ message: "Category id not found!" });
  }

  const updatedCategory = await categoryService.updateCategoryService(
    categoryId,
    body,
  );

  return res
    .status(200)
    .json({ message: "Category updated!", category: updatedCategory });
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return res.status(400).json({ message: "Category id not found!" });
  }

  const deletedCategory =
    await categoryService.deleteCategoryService(categoryId);

  return res
    .status(200)
    .json({ message: "Category deleted!", category: deletedCategory });
};

module.exports = {
  addCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
