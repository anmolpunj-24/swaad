const dashboardService = require("../../services/dashboardServices");

const getDashboardData = async (req, res) => {
  const { month, year } = req.query;

  const dashboardData = await dashboardService.getDashboardDataService(
    Number(month),
    Number(year),
  );

  return res
    .status(200)
    .json({ message: "Dashboard Data Fetched!", data: dashboardData });
};

module.exports = {
  getDashboardData,
};
