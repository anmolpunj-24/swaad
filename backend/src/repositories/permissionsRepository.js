const permissionsModel = require("../models/permissions");

const getAllPermissionsRepo = async () => {
  return await permissionsModel.find({
    isActive: true,
    deletedAt: null,
  });
};

const getOnePermissionRepo = async (permissionId) => {
  return await permissionsModel.findOne({
    _id: permissionId,
    isActive: true,
    deletedAt: null,
  });
};

const addPermissionRepo = async (permissionData) => {
  const newPermissionData = new permissionsModel(permissionData);
  const savedPermissionData = await newPermissionData.save();

  return savedPermissionData;
};

const updatePermissionRepo = async (permissionId, permissionData) => {
  return await permissionsModel.findOneAndUpdate(
    {
      _id: permissionId,
      isActive: true,
      deletedAt: null,
    },
    { $set: permissionData },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

const deletePermissionRepo = async (permissionId) => {
  return await permissionsModel.findOneAndUpdate(
    {
      _id: permissionId,
      isActive: true,
      deletedAt: null,
    },
    { $set: { isActive: false, deletedAt: new Date() } },
    {
      returnDocument: "after",
    },
  );
};

module.exports = {
  getAllPermissionsRepo,
  getOnePermissionRepo,
  addPermissionRepo,
  updatePermissionRepo,
  deletePermissionRepo,
};
