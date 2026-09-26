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
    .select(
      "_id slug pageName metaTitle metaDescription metaKeywords isActive createdAt",
    )
    .sort("-createdAt")
    .lean();
};

const getOnePageSeoRepo = async (pageSeoId) => {
  return await pageSeoModel
    .findOne({
      _id: pageSeoId,
      deletedAt: null,
      isActive: true,
    })
    .select("_id slug pageName metaTitle metaDescription metaKeywords isActive")
    .lean();
};

const updatePageSeoRepo = async (pageSeoId, pageSeoData) => {
  return await pageSeoModel.findOneAndUpdate(
    {
      _id: pageSeoId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: pageSeoData,
    },
    { new: true },
  );
};

const deletePageSeoRepo = async (pageSeoId) => {
  return await pageSeoModel.findOneAndUpdate(
    {
      _id: pageSeoId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
      },
    },
  );
};

module.exports = {
  addPageSeoRepo,
  getAllPagesSeoRepo,
  getOnePageSeoRepo,
  updatePageSeoRepo,
  deletePageSeoRepo,
};
