const roleRepo = require("../repositories/rolesRepository");

const getAllRolesService = async () => {
  const allRolesData = await roleRepo.getAllRolesRepo();
  return allRolesData;
};

const getOneRoleService = async (roleId) => {
  const oneRoleData = await roleRepo.getOneRoleRepo(roleId);

  if (!oneRoleData) {
    return {
      success: false,
      errorMessage: "Role not found!",
    };
  }
  return oneRoleData;
};

const addRoleService = async (roleData) => {
  const savedRoleData = await roleRepo.addRoleRepo(roleData);

  return savedRoleData;
};

const updateRoleService = async (roleId, roleData) => {
  const updatedRoleData = await roleRepo.updateRoleRepo(roleId, roleData);

  if (!updatedRoleData) {
    return {
      success: false,
      errorMessage: "Role not found!",
    };
  }
  return updatedRoleData;
};

const deleteRoleService = async (roleId) => {
  const deletedRoleData = await roleRepo.deleteRoleRepo(roleId)

  if (!deletedRoleData) {
    return {
      success: false,
      errorMessage: "Role not found!",
    };
  }
  return deletedRoleData;
};

module.exports = {
  getAllRolesService,
  getOneRoleService,
  addRoleService,
  updateRoleService,
  deleteRoleService,
};
