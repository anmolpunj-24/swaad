const tagModel = require("../models/tags");

const addTagRepo = async (tagData) => {
  const newTagData = new tagModel(tagData);
  const savedTagData = await newTagData.save();
  return savedTagData;
};

const getAllTagsRepo = async () => {
  return await tagModel
    .find({
      deletedAt: null,
      isActive: true,
    })
    .select("_id name slug isActive createdAt")
    .sort("-createdAt")
    .lean();
};

const getOneTagRepo = async (tagId) => {
  return await tagModel
    .findOne({
      _id: tagId,
      deletedAt: null,
      isActive: true,
    })
    .select("_id slug name isActive")
    .lean();
};

const updateTagRepo = async (tagId, tagData) => {
  return await tagModel.findOneAndUpdate(
    {
      _id: tagId,
      deletedAt: null,
      isActive: true,
    },
    {
      $set: tagData,
    },
    { returnDocument: "after", runValidators: true },
  );
};

const deleteTagRepo = async (tagId) => {
  return await tagModel.findOneAndUpdate(
    {
      _id: tagId,
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
  addTagRepo,
  getAllTagsRepo,
  getOneTagRepo,
  updateTagRepo,
  deleteTagRepo,
};
