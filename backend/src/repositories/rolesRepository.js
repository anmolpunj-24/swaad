const rolesModel = require("../models/roles");

const getAllRolesRepo = async () => {
  return await rolesModel.find({
    isActive: true,
    deletedAt: null,
  });
};

const getOneRoleRepo = async (roleId) => {
  return await rolesModel.findOne({
    _id: roleId,
    isActive: true,
    deletedAt: null,
  });
};

const addRoleRepo = async (roleData) => {
  const newRoleData = new rolesModel(roleData);
  const savedRoleData = await newRoleData.save();

  return savedRoleData;
};

const updateRoleRepo = async (roleId, roleData) => {
  return await rolesModel.findOneAndUpdate(
    {
      _id: roleId,
      isActive: true,
      deletedAt: null,
    },
    { $set: roleData },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

const deleteRoleRepo = async (roleId) => {
  return await rolesModel.findOneAndUpdate(
    {
      _id: roleId,
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
  getAllRolesRepo,
  getOneRoleRepo,
  addRoleRepo,
  updateRoleRepo,
  deleteRoleRepo,
};
