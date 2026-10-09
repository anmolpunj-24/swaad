const permissionService = require("../../services/permissionsServices");

const getAllPermissions = async (req, res) => {
  const permissions = await permissionService.getAllPermissionsService();

  if (permissions.success === false) {
    return res.status(400).json({ message: permissions.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "All permissions fetched!", permissions: permissions });
};

const getOnePermission = async (req, res) => {
  const permissionId = req.params.id;

  const permission =
    await permissionService.getOnePermissionService(permissionId);

  if (permission.success === false) {
    return res.status(400).json({ message: permission.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Permission fetched!", permission: permission });
};

const addPermission = async (req, res) => {
  const body = req.body;

  const permission = await permissionService.addPermissionService(body);

  if (permission.success === false) {
    return res.status(400).json({ message: permission.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Permission added!", permission: permission });
};

const updatePermission = async (req, res) => {
  const permissionId = req.params.id;
  const body = req.body;

  const updatedPermission = await permissionService.updatePermissionService(
    permissionId,
    body,
  );

  if (updatedPermission.success === false) {
    return res.status(400).json({ message: updatedPermission.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Permission updated!", permission: updatedPermission });
};

const deletePermission = async (req, res) => {
  const permissionId = req.params.id;

  const deletedPermission =
    await permissionService.deletePermissionService(permissionId);

  if (deletedPermission.success === false) {
    return res.status(400).json({ message: deletedPermission.errorMessage });
  }

  return res.status(200).json({ message: "Permission deleted!" });
};

module.exports = {
  getAllPermissions,
  getOnePermission,
  addPermission,
  updatePermission,
  deletePermission,
};
