const roleService = require("../../services/roleServices");

const getAllRoles = async (req, res) => {
  const roles = await roleService.getAllRolesService();

  if (roles.success === false) {
    return res.status(400).json({ message: roles.errorMessage });
  }

  return res.status(200).json({ message: "All roles fetched!", roles: roles });
};

const getOneRole = async (req, res) => {
  const roleId = req.params.id;

  const role = await roleService.getOneRoleService(roleId);

  if (role.success === false) {
    return res.status(400).json({ message: role.errorMessage });
  }

  return res.status(200).json({ message: "Role fetched!", role: role });
};

const addRole = async (req, res) => {
  const body = req.body;

  const role = await roleService.addRoleService(body);

  if (role.success === false) {
    return res.status(400).json({ message: role.errorMessage });
  }

  return res.status(201).json({ message: "Role added!", role: role });
};

const updateRole = async (req, res) => {
  const roleId = req.params.id;
  const body = req.body;

  const updatedRole = await roleService.updateRoleService(roleId, body);

  if (updatedRole.success === false) {
    return res.status(400).json({ message: updatedRole.errorMessage });
  }

  return res.status(200).json({ message: "Role updated!", role: updatedRole });
};

const deleteRole = async (req, res) => {
  const roleId = req.params.id;

  const deletedRole = await roleService.deleteRoleService(roleId);

  if (deletedRole.success === false) {
    return res.status(400).json({ message: deletedRole.errorMessage });
  }

  return res.status(200).json({ message: "Role deleted!", role: deletedRole });
};

module.exports = {
  getAllRoles,
  getOneRole,
  addRole,
  updateRole,
  deleteRole,
};
