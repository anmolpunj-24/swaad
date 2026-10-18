const dashboardRepo = require("../repositories/dashboardRepository");

const getDashboardDataService = async (month, year) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const [
    totalCustomers,
    totalProducts,
    totalOrders,
    salesOverview,
    monthlyOrders,
  ] = await Promise.all([
    dashboardRepo.getTotalCustomersRepo(),
    dashboardRepo.getTotalProductsRepo(),
    dashboardRepo.getTotalOrdersRepo(),
    dashboardRepo.getSalesOverviewRepo(startDate, endDate),
    dashboardRepo.getMonthlyOrdersRepo(startDate, endDate),
  ]);

  return {
    summary: {
      totalCustomers,
      totalProducts,
      totalOrders,
    },
    salesOverview,
    monthlyOrders,
  };
};

module.exports = {
  getDashboardDataService,
};
