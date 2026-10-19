const blogModel = require("../models/blogs");
const categoryModel = require("../models/categories");
const tagModel = require("../models/tags");

const addBlogRepo = async (blogData) => {
  const newBlogData = new blogModel(blogData);
  return await newBlogData.save();
};

const getAllBlogsRepo = async () => {
  return await blogModel
    .find({ deletedAt: null, isActive: true })
    .populate("categoryId", "name slug")
    .populate("tagIds", "name slug")
    .select("-excerpt -content -seo")
    .sort("-createdAt")
    .lean();
};

const getOneBlogRepo = async (blogId) => {
  return await blogModel
    .findOne({
      _id: blogId,
      deletedAt: null,
      isActive: true,
    })
    .populate("categoryId", "name slug")
    .populate("tagIds", "name slug")
    .lean();
};

const updateBlogRepo = async (blogId, blogData) => {
  return await blogModel
    .findOneAndUpdate(
      {
        _id: blogId,
        deletedAt: null,
        isActive: true,
      },
      { $set: blogData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    )
    .populate("categoryId", "name slug")
    .populate("tagIds", "name slug")
    .lean();
};

const deleteBlogRepo = async (blogId) => {
  return await blogModel.findOneAndUpdate(
    {
      _id: blogId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
      },
    },
    { returnDocument: "after" },
  );
};

const checkIfCategoryExistInDbRepo = async (categoryId) => {
  return await categoryModel.findOne({
    _id: categoryId,
    isActive: true,
    deletedAt: null,
  });
};

const checkIfTagExistInDbRepo = async (tagIds) => {
  return await tagModel.find({
    _id: { $in: tagIds },
    isActive: true,
    deletedAt: null,
  });
};

module.exports = {
  addBlogRepo,
  getAllBlogsRepo,
  getOneBlogRepo,
  updateBlogRepo,
  deleteBlogRepo,
  checkIfCategoryExistInDbRepo,
  checkIfTagExistInDbRepo,
};
