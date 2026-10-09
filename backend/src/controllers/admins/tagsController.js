const tagService = require("../../services/tagsServices");

const addTag = async (req, res) => {
  const body = req.body;

  const newTagData = await tagService.addTagService(body);

  return res.status(201).json({ message: "Tag created!", tag: newTagData });
};

const getAllTags = async (req, res) => {
  const allTags = await tagService.getAllTagsService();

  return res.status(200).json({ message: "All tags fetched!", tags: allTags });
};

const getOneTag = async (req, res) => {
  const tagId = req.params.id;

  const tagData = await tagService.getOneTagService(tagId);

  if (tagData.success === false) {
    return res.status(400).json({ message: tagData.errorMessage });
  }

  return res.status(200).json({ message: "Tag fetched!", tag: tagData });
};

const updateTag = async (req, res) => {
  const tagId = req.params.id;
  const body = req.body;

  const updatedTagData = await tagService.updateTagService(tagId, body);

  if (updatedTagData.success === false) {
    return res.status(400).json({ message: updatedTagData.errorMessage });
  }

  return res.status(200).json({ message: "Tag updated!", tag: updatedTagData });
};

const deleteTag = async (req, res) => {
  const tagId = req.params.id;

  const deletedTagData = await tagService.deleteTagService(tagId);

  if (deletedTagData.success === false) {
    return res.status(400).json({ message: deletedTagData.errorMessage });
  }

  return res.status(200).json({ message: "Tag deleted!" });
};

module.exports = {
  addTag,
  getAllTags,
  getOneTag,
  updateTag,
  deleteTag,
};
