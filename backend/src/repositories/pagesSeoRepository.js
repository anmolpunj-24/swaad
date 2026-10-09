const pageSeoModel = require("../models/pages_seo");

const addPageSeoRepo = async (pageSeoData) => {
  const newPageSeo = new pageSeoModel(pageSeoData);
  const savedPageSeoData = await newPageSeo.save();
  return savedPageSeoData;
};

const getAllPagesSeoRepo = async () => {
  return await pageSeoModel
    .find({
      deletedAt: null,
      isActive: true,
    })
    .select("_id slug pageName isActive createdAt")
    .sort("-createdAt")
    .lean();
};

const getOnePageSeoRepo = async (pageSeoSlug) => {
  return await pageSeoModel
    .findOne({
      slug: pageSeoSlug,
      deletedAt: null,
      isActive: true,
    })
    .select("_id slug pageName metaTitle metaDescription metaKeywords isActive")
    .lean();
};

const updatePageSeoRepo = async (pageSeoSlug, pageSeoData) => {
  return await pageSeoModel.findOneAndUpdate(
    {
      slug: pageSeoSlug,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: pageSeoData,
    },
    { returnDocument: "after", runValidators: true },
  );
};

const deletePageSeoRepo = async (pageSeoSlug) => {
  return await pageSeoModel.findOneAndUpdate(
    {
      slug: pageSeoSlug,
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

module.exports = {
  addPageSeoRepo,
  getAllPagesSeoRepo,
  getOnePageSeoRepo,
  updatePageSeoRepo,
  deletePageSeoRepo,
};
