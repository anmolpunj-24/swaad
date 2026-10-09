const tagsRepo = require("../repositories/tagRepository.js");

const addTagService = async (tagData) => {
  const savedTagsData = await tagsRepo.addTagRepo(tagData);
  return savedTagsData;
};

const getAllTagsService = async () => {
  const allTagsData = await tagsRepo.getAllTagsRepo();
  return allTagsData;
};

const getOneTagService = async (tagId) => {
  const oneTagData = await tagsRepo.getOneTagRepo(tagId);

  if (!oneTagData) {
    return {
      success: false,
      errorMessage: "No tag found!",
    };
  }

  return oneTagData;
};

const updateTagService = async (tagId, tagData) => {
  const updatedTagData = await tagsRepo.updateTagRepo(tagId, tagData);

  if (!updatedTagData) {
    return {
      success: false,
      errorMessage: "Tag not found!",
    };
  }

  return updatedTagData;
};

const deleteTagService = async (tagId) => {
  const deletedTagData = await tagsRepo.deleteTagRepo(tagId);

  if (!deletedTagData) {
    return {
      success: false,
      errorMessage: "Tag not found!",
    };
  }

  return deletedTagData;
};

module.exports = {
  addTagService,
  getAllTagsService,
  getOneTagService,
  updateTagService,
  deleteTagService,
};
