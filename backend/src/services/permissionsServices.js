const permissionsRepo = require("../repositories/permissionsRepository");

const getAllPermissionsService = async () => {
  const allPermissionsData = await permissionsRepo.getAllPermissionsRepo();
  return allPermissionsData;
};

const getOnePermissionService = async (permissionId) => {
  const onePermissionData =
    await permissionsRepo.getOnePermissionRepo(permissionId);

  if (!onePermissionData) {
    return {
      success: false,
      errorMessage: "Permission not found!",
    };
  }
  return onePermissionData;
};

const addPermissionService = async (permissionData) => {
  const savedPermissionData =
    await permissionsRepo.addPermissionRepo(permissionData);

  return savedPermissionData;
};

const updatePermissionService = async (permissionId, permissionData) => {
  const updatedPermissionData = await permissionsRepo.updatePermissionRepo(
    permissionId,
    permissionData,
  );

  if (!updatedPermissionData) {
    return {
      success: false,
      errorMessage: "Permission not found!",
    };
  }
  return updatedPermissionData;
};

const deletePermissionService = async (permissionId) => {
  const deletedPermissionData =
    await permissionsRepo.deletePermissionRepo(permissionId);

  if (!deletedPermissionData) {
    return {
      success: false,
      errorMessage: "Permission not found!",
    };
  }
  return deletedPermissionData;
};

module.exports = {
  getAllPermissionsService,
  getOnePermissionService,
  addPermissionService,
  updatePermissionService,
  deletePermissionService,
};
